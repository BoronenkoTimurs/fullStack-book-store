import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const app = express();
// Allow to send Postman requests
app.use(express.json());
// Route for main page
app.get("/", (req, res, next) => {
  res.send("Hey #2!");
});

app.use("/books", bookRoute);
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
