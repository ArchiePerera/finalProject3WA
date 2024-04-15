import express from "express"
import { createArticle, getAllArticles, getOneArticle, editArticle, deleteArticle } from "../controllers/articleController.js"

const articleRouter = express.Router()

articleRouter.post("/new", createArticle)
articleRouter.get("/", getAllArticles)
articleRouter.get("/:id", getOneArticle)
articleRouter.put("/edit/:id", editArticle)
articleRouter.delete("/delete/:id", deleteArticle)

export default articleRouter