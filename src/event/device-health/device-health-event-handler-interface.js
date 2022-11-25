module.exports = class DeviceHealthEventHandlerInterface {
    async handleDeviceHealthEvent(event) {
        throw new Error('Not Implemented. Override this method!');
    }
}