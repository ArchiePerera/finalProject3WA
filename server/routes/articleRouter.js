import express from "express"
import { createArticle, getAllArticles, getOneArticle, editArticle, deleteArticle } from "../controllers/articleController.js"
import { isLogged } from "../middleware/auth.js"

const articleRouter = express.Router()

articleRouter.post("/new", isLogged, createArticle)
articleRouter.get("/", getAllArticles)
articleRouter.get("/:id", getOneArticle)
articleRouter.put("/edit/:id", isLogged, editArticle)
articleRouter.delete("/delete/:id", isLogged, deleteArticle)

export default articleRouter