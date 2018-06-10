
const config = require("../config"),
  { START, DRAIN, AOG, WATER_DENSITY } = require("./helpers/consts"),
  testData = config[process.env.NODE_ENV].testData;

const waterLevelMin = testData.waterLevel.min;
const waterLevelMax = testData.waterLevel.max;

const tempMin = testData.temperature.min;
const tempMax = testData.temperature.max;

const pumpWidth = testData.width;
const pumpLength = testData.length;

const frequency = testData.frequency;

const startProcess = (ws, timerId, height, action) => {
  height = parseInt(height);
  let temperature = 0;
  let volume = 0;
  let pressure = 0;

  timerId = setInterval(() => {
    let dataObj = {};

    switch (action) {
      case START: {
        height += generateRandomValue(waterLevelMin, waterLevelMax);
        break;
      }

      case DRAIN: {
        height -= generateRandomValue(waterLevelMin, waterLevelMax);
        break;
      }
      default: {
      }
    }

    temperature = generateRandomValue(tempMin, tempMax);
    pressure = Math.floor(WATER_DENSITY * AOG * height);
    volume = Math.floor(pumpWidth * pumpLength * height);

    dataObj.id = 0;
    dataObj.temperature = height > 0 ? temperature : 0;
    dataObj.pressure = height > 0 ? pressure : 0;
    dataObj.volume = height > 0 ? volume : 0;
    dataObj.height = height > 10 ? 10 : height < 0 ? 0 : height.toFixed(2);

    ws.send(JSON.stringify(dataObj));
  }, frequency);

  return timerId;
};


const generateRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = startProcess;
