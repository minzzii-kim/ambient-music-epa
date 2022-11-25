const CapabilityEventHandlerInterface = require("./capability-event-handler-interface");
const SseService = require('../../services/sse-service');

module.exports = class SwitchEventHandler extends CapabilityEventHandlerInterface {
    constructor() {
        super();
    }

    async handleCapabilityEvent(event) {
        // send SSE
        const sseService = new SseService(event);
        await sseService.sendDeviceStatusChangedSSE(event.deviceId, event.value);
    }
}