const { Client } = require("@elastic/elasticsearch");
const axios = require("axios");
const ELASTICSEARCH_URL =
  require("../server-config/constants").ELASTICSEARCH_URL;
const ELASTICSEARCH_ID = require("../server-config/constants").ELASTICSEARCH_ID;
const ELASTICSEARCH_PWD =
  require("../server-config/constants").ELASTICSEARCH_PWD;

module.exports = class ESClient {
  constructor() {
    this.client = new Client({
      node: ELASTICSEARCH_URL,
      auth: {
        username: ELASTICSEARCH_ID,
        password: ELASTICSEARCH_PWD,
      },
    });
  }
  async search(_k, _v) {
    let queryString = {
      query: {
        match: {
          [_k]: _v,
        },
      },
    };
    console.log(JSON.stringify(queryString));
    try {
      const response = await axios({
        method: "post",
        url: `${ELASTICSEARCH_URL}/music_data/_search`,
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: ELASTICSEARCH_ID,
          password: ELASTICSEARCH_PWD,
        },
        data: queryString,
      });
      console.log("===================");
      console.log(response.data.hits.hits.map(({_source})=>_source));
      console.log("===================");
      if (response.status != 200) {
        console.error(
          "es-client",
          `Response status code of GET is not 200 OK. Status Code : ${response.status}`
        );
      }
      return response.data.hits.hits.map(({_source})=>_source);
    } catch (err) {
      console.log("GET Error : " + err);
    }
  }
};
