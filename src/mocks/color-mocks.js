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
    sadness: [
      { text: "blue", hue: 68, saturation: 89 },
      { text: "white", hue: 96, saturation: 34 },
      { text: "pink", hue: 83, saturation: 88 },
    ],
    anger: [
      { text: "red", hue: 0, saturation: 99 },
      { text: "white", hue: 96, saturation: 34 },
      { text: "blue", hue: 68, saturation: 89 },
    ],
    surprise: [
      { text: "purple", hue: 73, saturation: 99 },
      { text: "yellow", hue: 15, saturation: 85 },
      { text: "pink", hue: 83, saturation: 88 },
    ],
    fear: [
      { text: "white", hue: 96, saturation: 34 },
      { text: "blue", hue: 68, saturation: 89 },
      { text: "pink", hue: 83, saturation: 88 },
    ],
    disgust: [
      { text: "white", hue: 96, saturation: 34 },
      { text: "red", hue: 0, saturation: 99 },
      { text: "pink", hue: 83, saturation: 88 },
    ],
    neutral: [
      { text: "pink", hue: 83, saturation: 88 },
      { text: "red", hue: 0, saturation: 99 },
      { text: "blue", hue: 68, saturation: 89 },
    ],
  },
};

// sadness : { text : 'blue', hue: 68, saturation: 89 },
// anger : { text: 'red', hue: 0, saturation: 99 },
// surprise : { text: 'purple' , hue: 73, saturation: 99 },
// fear : { text: 'white', hue: 96, saturation: 34 },
// disgust : {  text: 'white', hue: 96, saturation: 34 },
// neutral : { text: 'pink' ,hue: 83, saturation: 88 },
