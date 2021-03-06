require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./config/db.config")();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

const db = require("./config/db.config");
db()
  .then(() => {
    app.listen(Number(process.env.PORT), () =>
      console.log(`Server up and running at port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));

const userRouter = require("./routes/user.routes");
app.use("/", userRouter);

const eventRouter = require("./routes/event.routes");
app.use("/", eventRouter);

const taskRouter = require("./routes/task.route");
app.use("/", taskRouter);

const inviteRouter = require("./routes/invite.route");
app.use("/", inviteRouter);

const timelineRouter = require("./routes/timeline.routes");
app.use("/", timelineRouter);
