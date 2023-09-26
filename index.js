import express from "express";
import studentmentorRouter from "./routes/student-mentor.js";
import conectdb from "./db-utils/connection.js";

const PORT=process.env.PORT||4444

const app = express()

await conectdb();
app.use(express.json());
app.use('/stdmend',studentmentorRouter);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log("run complete");
})