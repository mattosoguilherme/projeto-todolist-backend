if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const YAML = require("yamljs");
const bodyParser = require("body-parser");
const swaggerDocument = YAML.load("./swagger.yml")
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const conn = require("./conn/conn")
const TasksRouter = require("./routes/tasks.routes");
const NodeHog = require("nodehog");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const serverStatus = () => {
  return {
    state: "up",
    dbState: mongoose.STATES[mongoose.connection.readyState],
  };
};

const db_url = process.env.MONGODB_URI;
conn(db_url);
mongoose.Promise = global.Promise;
app.get("/health", (res, req) => {
  let healthResult = serverStatus();
  if (mongoose.connection.readyState == 0) {
    req.statusCode = 500;
    req.send("down");
  } else {
    req.json(healthResult);
  }
});

app.get(
  "/stress/:elemento/tempostress/:tempoStress/tempofolga/:tempoFolga/ciclos/:ciclos",
  (req, res) => {
    const elemento = req.params.elemento;
    const tempoStress = req.params.tempoStress * 1000;
    const tempoFolga = req.params.tempoFolga * 1000;
    const ciclos = req.params.ciclos;
    new NodeHog(elemento, tempoStress, tempoFolga, ciclos).start();
    res.send("OK");
  }
);

app.use("/tasks", TasksRouter);

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`app rodando na porta: http://localhost:${port}/api`);
});
