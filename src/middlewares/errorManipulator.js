import mongoose from "mongoose";

import WrongRequest from "../errors/WrongRequest.js";
import ValidationError from "../errors/ValidationError.js";
import InternalServerError from "../errors/InternalServerError.js";

// eslint-disable-next-line no-unused-vars
export default function errorManipulator(erro, req, res, next) {
  console.log(erro);

  if (erro instanceof mongoose.Error.CastError) {
    new WrongRequest().sendResponse(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendResponse(res);
  } else if (erro instanceof InternalServerError) {
    erro.sendResponse(res);
  } else {
    new InternalServerError().sendResponse(res);
  }
}
