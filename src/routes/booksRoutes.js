import express from "express";

import paginate from "../middlewares/paginate.js";
import BookController from "../controllers/bookController.js";

const router = express.Router();

router.get("/books", BookController.listBooks, paginate);
router.get("/books/search", BookController.listBookByFilter, paginate);
router.get("/books/:id", BookController.listBookById);
router.post("/books", BookController.addBook);
router.put("/books/:id", BookController.updateBook);
router.delete("/books/:id", BookController.deleteBook);

export default router;
