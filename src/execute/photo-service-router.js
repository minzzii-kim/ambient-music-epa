const ResponseBuilder = require("./response-builder");
const ServiceError = require("../errors/service-error");
const photoMocks = require("../mocks/photo-mocks");
const DeviceApis = require("../smartthings-apis/device-apis");
const axios = require("axios");
const express = require("express");
const router = express.Router();
const accessToken = "b87326ac-2e52-4b27-a41f-04334f4faee9";
const deviceApis = new DeviceApis(accessToken);
const deviceId = "0b4a112c-feb0-4457-afba-3c859b9f70ad";

const photoService = () => {
  const {
    imageUrl,
    components: {
      main: {
        colorControl: {
          saturation: { value: saturationValue },
          hue: { value: hueValue },
        },
        switchLevel: {
          level: { value: levelValue },
        },
        colorTemperature: {
          colorTemperature: { value: tempValue },
        },
      },
    },
  } = photoMocks;

  let commands = [
    { component: "main", capability: "switch", command: "on", arguments: [] },
    {
      component: "main",
      capability: "switchLevel",
      command: "setLevel",
      arguments: [levelValue],
    },
    {
      component: "main",
      capability: "colorTemperature",
      command: "setColorTemperature",
      arguments: [tempValue],
    },
    {
      component: "main",
      capability: "colorControl",
      command: "setColor",
      arguments: [{ saturation: saturationValue, hue: hueValue }],
    },
  ];

  return { imageUrl, commands };
};
router
  .get("/", (req, res) => {
    console.log("photo service routing ... ");
    res.send("Hello");
  })
  .put("/play", (req, res) => {
    // const url = req.params.url;
    // const color = req.params.color;
    const { imageUrl, commands } = photoService();

    res.write(`<img src=${imageUrl}>`);
    res.send();

    deviceApis.executeCommands(deviceId, commands);
  });

module.exports = router;
