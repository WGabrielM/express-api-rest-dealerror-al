import InternalServerError from "./InternalServerError.js";

class NotFound extends InternalServerError {
  constructor(message = "Page not Found") {
    super(message, 404);
  }
}

export default NotFound;
