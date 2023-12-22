import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res, next) => {
  res.send("Hey #2!");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to database!`);
    app.listen(PORT, () => {
      console.log(`App connected to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
