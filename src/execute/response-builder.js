module.exports = class ResponseBuilder {
    constructor(code) {
        this.code = code ? code : 200;
    }

    code(code) {
        this.code = code;
        return this;
    }

    message(message) {
        this.message = message;
        return this;
    }

    build() {
        let response = {
            statusCode: this.code
        }
        
        if(this.message) response.message = this.message;
        return response;
    }
}