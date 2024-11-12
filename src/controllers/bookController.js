import NotFound from "../errors/NotFound.js";
import { authors, book } from "../models/index.js";
import WrongRequest from "../errors/WrongRequest.js";

class BookController {
  static listBooks = async (req, res) => {
    try {
      let { limit = 5, page = 1 } = req.query;

      limit = parseInt(limit);
      page = parseInt(page);

      const listBooks = await book
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author")
        .exec();
      res.status(200).json(listBooks);
    } catch (error) {
      next(new WrongRequest());
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
    try {
      const search = await searchProcess(req.query);

      if (search !== null) {
        const booksByPublisher = await book.find(search).populate("author");
        res.status(200).json(booksByPublisher);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  }
}

async function searchProcess(params) {
  const { publisher, title, minPages, maxPages, authorName } = params;
  let search = {};

  const regex = new RegExp(title, "i");

  if (publisher) search.publisher = publisher;
  if (title) search.title = regex;

  if (minPages || maxPages) search.pages = {};

  // gte = Grater than or equal
  if (minPages) search.pages.$gte = minPages;
  // lte = Less than or equal
  if (maxPages) search.pages.$lte = maxPages;

  if (authorName) {
    const author = await authors.findOne({ name: authorName });
    const authorId = author._id;

    if (author !== null) {
      search.author = authorId;
    } else {
      search = null;
    }
  }

  return search;
}

export default BookController;
