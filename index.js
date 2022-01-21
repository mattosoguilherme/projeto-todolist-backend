if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require("express");
const cors = require("cors");
const conn = require("./conn/conn")
const TasksRouter = require("./routes/tasks.routes");
const app = express();
app.use(express.json());
app.use(cors());

const db_url = process.env.DB_URL;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_data = process.env.DB_DATA;

conn(db_url, db_user, db_pass, db_data);

app.use("/tasks", TasksRouter);

const port = 3005;
app.listen(process.env.PORT || port, () => {
  console.log(`app rodando na porta: http://localhost:${port}/tasks`);
});
