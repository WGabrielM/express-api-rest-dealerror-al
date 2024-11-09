import WrongRequest from "./WrongRequest.js";

class ValidationError extends WrongRequest {
  constructor(erro) {
    const errorMensage = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
    super(`These errors was find: ${errorMensage}`);
  }
}

export default ValidationError;
