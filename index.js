import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import cors from "cors";
import dotenv from 'dotenv';
import path from 'path';
const __dirname = path.resolve();

const app = express();
dotenv.config();


app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb",extended: true }));

app.use("/", router);

const PORT = 8000;
const URL = "mongodb+srv://aman:JPXvlwCTk8jPnbxg@cluster0.hqgfg.mongodb.net/SELECTER?retryWrites=true&w=majority";


mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("you are connected to mongodb cloud cluster");
    app.listen(PORT, () => {
      console.log(`server is running successfully on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error", error.message);
  });
