const ST_API_HOST = require('../server-config/constants').ST_API_HOST;
const axios = require('axios');

module.exports = class SmartThingsClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    async sendGet(path) {
        const response = await axios(
            {
                method: 'get',
                url: `${ST_API_HOST}/${path.startsWith('/') ? path.slice(1) : path}`,
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            }
        );

        if(response.status != 200) {
            console.error('smartthings-client', `Response status code of GET ${path} is not 200 OK. Status Code : ${response.status}`);
        }

        return response.data;
    }

    async sendPost(path, body, contentType) {
        const response = await axios(
            {
                method: 'post',
                url: `${ST_API_HOST}/${path.startsWith('/') ? path.slice(1) : path}`,
                data: body,
                headers: { 
                    'Content-Type': contentType ? contentType : 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            }
        );
        
        if(response.status != 200) {
            console.error('smartthings-client', `Response status code of POST ${path} is not 200 OK. Status Code : ${response.status}`);
            console.error('smartthings-client', JSON.stringify(response.data));
        }

        return response.data;
    }

    async sendDelete(path) {
        const response = await axios(
            {
                method: 'delete',
                url: `${ST_API_HOST}/${path.startsWith('/') ? path.slice(1) : path}`,
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            }
        );

        if(response.status != 200) {
            console.error('smartthings-client', `Response status code of DELETE ${path} is not 200 OK. Status Code : ${response.status}`);
        }

        return response.data;
    }
}