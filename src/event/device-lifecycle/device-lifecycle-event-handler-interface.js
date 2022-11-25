module.exports = class DeviceLifecycleEventHandlerInterface {
    /**
     * 
     * @param {*} event {"accessToken":"TOKEN","locationId":"9ae7e03d-9740-4b96-9f1e-7605feacaaaa","installedAppId":"6bb66fc7-54af-48f0-a74e-3104f64eaaaa","lifecycle":"CREATE","eventId":"40e496f2-01be-11ed-902b-83467855321d","ownerId":"9ae7e03d-9740-4b96-9f1e-7605feacaaaa","ownerType":"LOCATION","deviceId":"95ec5bfc-2879-481a-92aa-5064151e3e7c","deviceName":"Virtual TV","principal":"","create":{"presentationId":"6e4ab078-2f27-321c-8ba0-acc24ac903eb","manufacturerName":"SmartThingsCommunity","categories":[]}}
     */
    async handleDeviceLifecycleEvent(event) {
        throw new Error('Not Implemented. Override this method!');
    }
}