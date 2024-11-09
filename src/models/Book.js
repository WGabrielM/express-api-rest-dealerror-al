import mongoose from "mongoose";

import { authorSchema } from "./Author.js";

const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: [true, "Title of the book is required"] },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: [true, "Author is required"],
    },
    publisher: {
      type: String,
      required: [true, "Publisher's required"],
      enum: {
        values: ["Code House", "Alura"],
        message: "Publisher provider is not allowed"
      } 
    },
    pages: {
      type: Number,
      min: [10, "The number of pages must be between 10 and 5000"],
      max: [5000, "The number of pages must be between 10 and 5000"],
    },
  },
  { versionKey: false }
);

const book = mongoose.model("books", bookSchema);

export default book;