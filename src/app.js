import express from "express";

import routes from "./routes/index.js";
import handle404 from "./middlewares/handle404.js";
import connectDatabase from "./config/dbConnect.js";
import errorManipulator from "./middlewares/errorManipulator.js";

const connection = await connectDatabase();

connection.on("error", (erro) => {
  console.error("Connection error ", erro);
});

connection.once("open", () => {
  console.log("Connection with database made successfully");
});

const app = express();
app.use(express.json());
routes(app);

app.use(handle404)

app.use(errorManipulator);

export default app;
