
module.exports = class DeviceHealthEventHandler {
    constructor() {
        this.handlers = {
            ONLINE: [],
            OFFLINE: []
        };
    }

    /**
     * 
     * @param {*} eventType 'ONLINE', 'OFFLINE' for device health
     * @param {*} handler must has handle(deviceHealthEvent) function in the class
     */
    registerHandler(eventType, handler) {
        this.handlers[eventType].push(handler);
    }

    async handle(context, event) {
        const accessToken = context.accessToken;
        const locationId = context.locationId;
        const installedAppId = context.installedAppId;

        const handlerSet = this.handlers[event.lifecycle];

        for (const handler of handlerSet) {
            await handler.handleDeviceHealthEvent(
                Object.assign({
                    accessToken: accessToken,
                    locationId: locationId,
                    installedAppId: installedAppId
                }, event));
        }
    }
}