import { book } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

class BookController {
  static listBooks = async (req, res) => {
    try {
      const listBooks = await book.find().populate("author").exec();
      res.status(200).json(listBooks);
    } catch (error) {
      next(error);
    }
  };

  static listBookById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookFinded = await book
        .findById(id)
        .populate("author", "name")
        .exec();

      if (bookFinded !== null) {
        res.status(200).json(bookFinded);
      } else {
        next(new NotFound("Book id Not Found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static addBook = async (req, res, next) => {
    try {
      let newBook = new book(req.body);

      const bookFinded = await newBook.save();

      res.status(201).send(bookFinded.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      const bookResult = await book.findByIdAndUpdate(id, req.body);

      if (bookResult !== null) {
        res.status(200).json({ message: "Book Updated" });
      } else {
        next(new NotFound("Book id Not Found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookResult = await livros.findByIdAndDelete(id);

      if (bookResult !== null) {
        res.status(200).json({ message: "Book Deleted" });
      } else {
        next(new NotFound("Book id Not Found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static async listBookByFilter(req, res, next) {
    const { publisher, title } = req.query;

    const regex = new RegExp(title, "i");

    const search = {};

    if (publisher) search.publisher = publisher;
    if (title) search.title = regex;

    try {
      const booksByPublisher = await book.find({
        publisher: publisher,
        title: title,
      });
      res.status(200).json(booksByPublisher);
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
