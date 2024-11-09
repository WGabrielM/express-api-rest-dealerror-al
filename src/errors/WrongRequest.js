import InternalServerError from "./InternalServerError.js";

class WrongRequest extends InternalServerError {
  constructor(message = "One or more data provided is incorrects") {
    super(message, 400);
  }
}

export default WrongRequest;
