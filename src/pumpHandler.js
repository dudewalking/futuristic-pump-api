const config = require("../config"),
  testData = config[process.env.NODE_ENV].testData;

const waterLevelMin = testData.waterLevel.min;
const waterLevelMax = testData.waterLevel.max;

const tempMin = testData.temperature.min;
const tempMax = testData.temperature.max;

const pumpWidth = testData.width;
const pumpLength = testData.length;
const frequency = testData.frequency;

const density = 998;
const aog = 9.81;

const startProcess = (ws, timerId, height, action) => {
  height = parseInt(height);
  let temperature = 0;
  let volume = 0;
  let pressure = 0;

  timerId = setInterval(() => {
    let dataObj = {};

    switch (action) {
      case "start": {
        height += generateRandomValue(waterLevelMin, waterLevelMax);
        break;
      }
      case "drain": {
        height -= generateRandomValue(waterLevelMin, waterLevelMax);
        break;
      }
      default: {
      }
    }

    temperature = generateRandomValue(tempMin, tempMax);
    pressure = Math.floor(density * aog * height);
    volume = Math.floor(pumpWidth * pumpLength * height);

    dataObj.temperature = temperature;
    dataObj.pressure = pressure;
    dataObj.volume = volume;
    dataObj.height = height.toFixed(2);

    ws.send(JSON.stringify(dataObj));
  }, frequency);

  return timerId;
};

const generateRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = startProcess;
