
module.exports = class CapabilityEventHandler {
    constructor() {
        this.handlers = [];
    }

    registerHandler(capability, handlerObject) {
        this.handlers.push({
            capability: capability,
            handlerObject: handlerObject
        });
    }

    /**
     * forward specific capability handler with accessToken, locationId and insatlledAppId
     * @param {*} event {"eventId":"5705f8de-01b9-11ed-944a-d9df36dce29e","locationId":"9ae7e03d-9740-4b96-9f1e-7605feac88df","ownerId":"9ae7e03d-9740-4b96-9f1e-7605feac88df","ownerType":"LOCATION","deviceId":"939414ef-43f5-41e5-ae22-73905713aaaa","componentId":"main","capability":"switch","attribute":"switch","value":"on","valueType":"string","stateChange":true,"data":{},"subscriptionName":"switch-sub"}
     */
    async handle(context, event) {
        const accessToken = context.accessToken;
        const locationId = context.locationId;
        const installedAppId = context.installedAppId;

        for (const handler of this.handlers) {
            if (handler.capability == event.capability) {
                await handler.handlerObject.handleCapabilityEvent(
                    Object.assign({
                        accessToken: accessToken,
                        locationId: locationId,
                        installedAppId: installedAppId
                    }, event));
            }
        }
    }
}