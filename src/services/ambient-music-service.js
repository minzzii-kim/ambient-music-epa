const ServiceError = require("../errors/service-error");
const DeviceApis = require("../smartthings-apis/device-apis");
const ColorMap = require("../utils/color-table");
const MusicDataBuilder = require("../utils/music-data-builder").Builder;
const ESApi = require("../apis/es-api");

const OnSetMocks = require("../mocks/onset-mocks");
const ColorMocks = require("../mocks/color-mocks");

const capability = "colorControl"; //'switchLevel';
const command = "setColor"; //'setLevel';
const component = "main";

const commandItem = {
  component: "main",
  capability: "",
  command: "",
  arguments: [],
};

module.exports = class AmbientMusicService {
  constructor() {
    this.deviceId = "0b4a112c-feb0-4457-afba-3c859b9f70ad";
    this.accessToken = "b87326ac-2e52-4b27-a41f-04334f4faee9";
    this.deviceApis = new DeviceApis(this.accessToken);
    this.esApi = new ESApi();
  }
  setInitialState() {
    let initCommands = [
      { component: "main", capability: "switch", command: "on", arguments: [] },
      {
        component: "main",
        capability: "switchLevel",
        command: "setLevel",
        arguments: [20],
      },
      {
        component: "main",
        capability: "colorControl",
        command: "setColor",
        arguments: [ColorMap.PURPLE],
      },
    ];
    this.deviceApis.executeCommands(this.deviceId, initCommands);
  }
  async getOnsets() {
    //return MusicData.Builder.getOnsets();
    return await OnSetMocks.times;
  }

  async getColors() {
    //return MusicData.Builder.getColors();
    return await ColorMocks.colors;
  }
  async start(id) {
    // if (id != MusicData.Builder.getId()) {
    //   console.log("invalid id");
    //   return id;
    // }
    this.setInitialState();
    const times = MusicDataBuilder.getOnsets();
    const colors = MusicDataBuilder.getColors();

    const colorlen = colors.length;
    for (let i = 0; i < times.length; ++i) {
      const s = times[i];

      const color = colors[i % colorlen];
      setTimeout(() => {
        console.log(
          `${s} sec  , command : ${command}, color : ${i % colorlen}`
        );
        this.deviceApis.executeCommand(
          this.deviceId,
          component,
          capability,
          command,
          [color]
        );
      }, s * 1000);
    }
    return id;
  }
  async getPlayList(id) {
    const response = await this.esApi.getPlaylist(id);
    return response;
  }
  async getAllPlaylists() {
    const response = await this.esApi.getAllPlaylists();
    let data = response.aggregations.playlist.buckets.map(({ key }) => key);
    const result = Object.assign(
      [],
      data.map((x) => ({
        playlist_id: x[0],
        playlist_name: x[1],
        playlist_img_hrl: x[2],
      }))
    );
    return result;
  }
  async getMusicInfo(id) {
    //let id = "5iis9J2sptrUy0VIpFVIg1";
    const response = await this.esApi.getMusicInfo(id);

    const onsets = await this.getOnsets();
    const colors = await this.getColors();

    const result = MusicDataBuilder.build(response[0])
      .setOnsets(onsets)
      .setColors(colors);

    return result;
    //return ["a", "b", "c"];
  }
  async getDeviceStatus() {
    const result = await this.deviceApis.getComponentStatus(
      this.deviceId,
      this.component
    );
    console.log(result);
  }
};
