import express from "express";
import { addNewComment, getAllCommentsByArticle } from "../controllers/commentController.js"
import { isLogged, isAuthorized } from "../middleware/auth.js"

const commentRouter = express.Router();

commentRouter.post("/new/:articleId", isLogged, isAuthorized(["admin", "user", "student", "mentor"]), addNewComment)

commentRouter.get("/:articleId", isLogged, getAllCommentsByArticle)

export default commentRouter