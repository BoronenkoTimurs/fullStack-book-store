import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
// Allow to send Postman requests
app.use(express.json());

// Route for main page
app.get("/", (req, res, next) => {
  res.send("Hey #2!");
});

app.post("/books", async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: `Send all required fields: title, author, publishYear!`,
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get all books
app.get("/books", async (req, res, next) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Get one books
app.get("/books/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Rout for find one book and udpate it
app.put("/books/:id", async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear!",
      });
    }
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({
        message: `Book with id: ${id} not found! Please try another id.`,
      });
    }
    return res
      .status(200)
      .send({ message: `Book with id: ${id} udpated succesfully!` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.delete("/books/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: `Book with id: ${id} not found! Please try another id.`,
      });
    }
    return res
      .status(200)
      .send({ message: `Book with id: ${id} deleted succesfully!` });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
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
