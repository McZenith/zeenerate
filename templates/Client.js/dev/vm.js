const { Engine } = require("velocity");

const velocityDataPrivate = require("./velocity.private.data.json");
const VelocityDataProd = require("./velocity.data.prod.json");
const velocityDataDev = require("./velocity.data.json");

let velocityData;

if (process.env.NODE_ENV === "production") {
  velocityData = VelocityDataProd;
} else {
  velocityData = velocityDataDev;
}
const engine = new Engine({ template: "./src/index.vm" });

module.exports = (data) => {
  return engine.render({
    ...velocityData,
    ...velocityDataPrivate,
    ...data,
  });
};
