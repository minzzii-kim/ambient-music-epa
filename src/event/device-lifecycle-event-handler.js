
module.exports = class DeviceLifecycleEventHandler {
    constructor() {
        this.handlers = {
            CREATE: [],
            DELETE: []
        };
    }

    /**
     * 
     * @param {*} eventType 'CREATE' for device created in the location, 'DELETE' for device removal
     * @param {*} handler must has handle(deviceLifecycleEvent) function in the class
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
            await handler.handleDeviceLifecycleEvent(
                Object.assign({
                    accessToken: accessToken,
                    locationId: locationId,
                    installedAppId: installedAppId
                }, event));
        }
    }
}