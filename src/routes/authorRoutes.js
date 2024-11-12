import express from "express";
import AuthorController from "../controllers/authorController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router.get("/authors", AuthorController.listAuthors, paginate);
router.get("/authors/:id", AuthorController.listAuthorById);
router.post("/authors", AuthorController.addAuthor);
router.put("/authors/:id", AuthorController.updateAuthor);
router.delete("/authors/:id", AuthorController.deleteAuthor);

export default router;
