import mongoose from "mongoose";

import InternalServerError from "../errors/InternalServerError.js";
import WrongRequest from "../errors/WrongRequest.js";
import ValidationError from "../errors/ValidationError.js";
import NotFound from "../errors/NotFound.js";

export default function errorManipulator(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new WrongRequest().sendResponse(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendResponse(res);
  } else if (erro instanceof NotFound) {
    erro.sendResponse(res);
  } else {
    new InternalServerError.sendResponse(res);
  }
}
