const { Engine } = require("velocity");
require('dotenv').config();

const velocityDataPrivate = require("./velocity.private.data.json");
const velocityDataProd = require("./velocity.data.prod.json");
const velocityDataDev = require("./velocity.data.json");

let velocityData;
const EngineData =  process.env.NODE_ENV === 'production' ? "./statics/index.vm" : "./src/index.vm";

if (
  process.env.NODE_ENV === "production") {
  velocityData = velocityDataProd;
} else {
  velocityData = velocityDataDev;
}

const engine = new Engine({template : EngineData });

module.exports = data => {
  return engine.render({
    ...velocityData,
    ...velocityDataPrivate,
    ...data
  });
};
