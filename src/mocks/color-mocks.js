module.exports = {
  capability: "colorControl",
  command: "setColor",
  component: "main",
  colors: {
    joy: [
      { text: "yellow", hue: 15, saturation: 85 },
      { text: "purple", hue: 73, saturation: 99 },
      { text: "pink", hue: 83, saturation: 88 },
    ],
    sadness: [],
    anger: [],
    surprise: [],
    fear: [],
    disgust: [],
    neutral: [],
  },
};

// sadness : { text : 'blue', hue: 68, saturation: 89 },
// anger : { text: 'red', hue: 0, saturation: 99 },
// surprise : { text: 'purple' , hue: 73, saturation: 99 },
// fear : { text: 'white', hue: 96, saturation: 34 },
// disgust : {  text: 'white', hue: 96, saturation: 34 },
// neutral : { text: 'pink' ,hue: 83, saturation: 88 },
