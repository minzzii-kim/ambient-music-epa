module.exports = class CapabilityEventHandlerInterface {
    async handleCapabilityEvent(event) {
        throw new Error('Not Implemented. Override this method!');
    }
}