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
const db_url = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
conn(db_url);


app.use("/tasks", TasksRouter);

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`app rodando na porta: http://localhost:${port}/api`);
});
