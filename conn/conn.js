const Mongoose = require("mongoose");

const conn = (url) => {
  Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Mondo DB conectado"))
    .catch((err) => console.error(`Mongo DB não conectado: ${err}`));
};

module.exports = conn;
