module.exports = class ServiceError extends Error {
    constructor(code, data, ...params) {
        super(...params);
        this.code = code;
        this.data = data;
    }
}