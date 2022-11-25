const ServiceError = require('../errors/service-error');
const StClient = require('./smartthings-client');


module.exports = class DeviceApi {
    constructor(accessToken) {
        this.client = new StClient(accessToken);
    }

    async getStatus(deviceId, componentId, capabilityId) {
        if(deviceId && componentId && capabilityId) {
            return this.client.sendGet(`/devices/${deviceId}/components/${componentId}/capabilities/${capabilityId}/status`);
        } else if(deviceId && componentId) {
            return this.client.sendGet(`/devices/${deviceId}/components/${componentId}/status`);
        } else if(deviceId) {
            return this.client.sendGet(`/devices/${deviceId}/status`);
        } else {
            console.error('device-apis', 'parameter error on getting device status');
            throw new ServiceError(400, 'Bad Request');
        }
    }
    async getComponentStatus(deviceId, componentId) {
        if(deviceId && componentId) {
            return this.client.sendGet(`/devices/${deviceId}/components/${componentId}/status`);
        } else if(deviceId) {
            return this.client.sendGet(`/devices/${deviceId}/status`);
        } else {
            console.error('device-apis', 'parameter error on getting device status');
            throw new ServiceError(400, 'Bad Request');
        }
    }
    /**
     * 
     * @returns array of devices
     */
    async getAllDevices(options) {
        let devicesPath = '/devices';
        if(options?.byCapabilities) {
            devicesPath = `${devicesPath}?${options.byCapabilities.reduce((pValue, current) => `${pValue}&capability=${current}`)}`;    // add query
        }
        const devicesResponse = await this.client.sendGet(devicesPath);
        return devicesResponse.items;
    }

    /**
     * 
     * @param {*} deviceId 
     * @param {*} commands array of command refer to https://developer-preview.smartthings.com/docs/api/public/#operation/executeDeviceCommands
     * @returns 
     */
    async executeCommands(deviceId, commands) {
        (this.accessToken)
        await this.client.sendPost(
            `/devices/${deviceId}/commands?ordered=true`,
            {
                commands
            }
        );
    }

    /**
     * 
     * @param {*} deviceId 
     * @param {*} component 
     * @param {*} capability 
     * @param {*} command 
     * @param {*} args array of argument.
     * @returns 
     */
    async executeCommand(deviceId, component, capability, command, args) {
        await this.client.sendPost(
            `/devices/${deviceId}/commands`,
            {
                commands: [
                    {
                        component,
                        capability,
                        command,
                        arguments: args ? args : []
                    }
                ]
            }
        );
    }
}