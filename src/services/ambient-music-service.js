const ServiceError = require('../errors/service-error');
const DeviceApis = require('../smartthings-apis/device-apis');
//const Player = require('../am-player')

module.exports = class AmbientMusicService {
    constructor() {
        this.deviceId = '0b4a112c-feb0-4457-afba-3c859b9f70ad';
        this.component = 'main';
        this.accessToken = 'b87326ac-2e52-4b27-a41f-04334f4faee9';
        this.deviceApis = new DeviceApis(this.accessToken);
    }
    async start(){
        //1. get color, seconds, uri
        //2. DeviceApi.start(color, seconds)
        //3. player.start(uri)
        //const accessToken = 'b87326ac-2e52-4b27-a41f-04334f4faee9';
        //const deviceApis = new DeviceApis(accessToken);

        let seconds = [10,15,20,25,30,35];

        let capability = 'switchLevel';
        let command = 'setLevel';
        let colorMap = {
            PURPLE: { hue: 75, saturation: 100 },
            BLUE: { hue: 70, saturation: 100 },
            WHITE: { hue: 79, saturation: 7 },
            RED: { hue: 10, saturation: 100 }
        };
        let initCommands = [
            {"component":"main","capability":"switch","command":"on","arguments":[]},
            {"component":"main","capability":"switchLevel","command":"setLevel","arguments":[20]},
            {"component":"main","capability":"colorControl","command":"setColor","arguments":[colorMap.PURPLE]},
        ];
        //data structure
        let tempCommands = [
            {'color':{'hue':75, 'saturation':100}, 'sec' : 5},
            {'color':{'hue':70, 'saturation':100}, 'sec' : 10},
            {'color':{'hue':79, 'saturation':7}, 'sec' : 15},
            {'color':{'hue':10, 'saturation':100}, 'sec' : 20},
        ]
        this.deviceApis.executeCommands(this.deviceId, initCommands)
        let level = 20;
        for(const s of seconds){
        //for(var i=0; i<tempCommands.length; ++i){
            setTimeout(()=>{
                console.log(`${s} sec , command : ${command}, level : ${level}`)
                this.deviceApis.executeCommand(this.deviceId, this.component, capability, command, [level+=50])
            }, s*1000)
            // setTimeout(()=>{
            //     command = 
            //     this.deviceApis.executeCommand(this.deviceId, this.component, capability, command, [level+=20])
            // }, tempCommands[i].sec*1000)
        }
    }
    async getPlayList(){
        //return Player.getPlayList()
        return ['a', 'b', 'c'];
    }
    async getDeviceStatus(){
        const result = await this.deviceApis.getComponentStatus(this.deviceId, this.component);
        console.log(result)
    }
};

