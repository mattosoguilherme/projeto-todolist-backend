if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yml")
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const cors = require("cors");
const conn = require("./conn/conn")
const TasksRouter = require("./routes/tasks.routes");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const db_url = process.env.MONGODB_URI;
conn(db_url);

app.use("/api/tasks", TasksRouter);

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`app rodando na porta: http://localhost:${port}/tasks`);
});
