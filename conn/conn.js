const Mongoose = require("mongoose");

const conn = (url, user, pass, data) => {
  Mongoose.connect(`${url}/${data}`, {
    user: user,
    pass: pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Mondo DB conectado"))
    .catch((err) => console.error(`Mongo DB não conectado: ${err}`));
};

module.exports = conn;
