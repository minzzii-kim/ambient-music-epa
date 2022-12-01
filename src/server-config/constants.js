require("dotenv").config();

module.exports = {
  ST_API_HOST: "https://api.smartthings.com",
  ELASTICSEARCH_URL:
    "https://search-ambient-music-6fd7s5o5xm24ujfibapy5whiqe.ap-northeast-2.es.amazonaws.com", //'https://search-winter-gzatyujtosxlactz6va536h57q.ap-northeast-2.es.amazonaws.com',
  ELASTICSEARCH_ID: process.env.ELASTICSEARCH_ID,
  ELASTICSEARCH_PWD: process.env.ELASTICSEARCH_PW,
};
