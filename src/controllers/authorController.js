import mongoose from "mongoose";
import { author } from "../models/index.js";
import NotFound from "../errors/NotFound.js";

class AuthorController {
  static listAuthors = async (req, res, next) => {
    try {
      const authorResult = await author.find();

      req.result = authorResult;
      next();
    } catch (erro) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  static listAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorResult = await autores.findById(id);

      if (authorResult !== null) {
        res.status(200).send(authorResult);
      } else {
        next(new NotFound("Author ID Not Found"));
      }
    } catch (error) {
      next(error);
    }
  };

  static addAuthor = async (req, res, next) => {
    try {
      let author = new author(req.body);

      const authorResult = await author.save();

      res.status(201).send(authorResult.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await author.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Author successfully updated" });
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;

      await author.findByIdAndDelete(id);

      res.status(200).send({ message: "Author Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorController;
