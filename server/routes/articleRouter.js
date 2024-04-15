import express from "express"
import { createArticle, getAllArticles, getOneArticle } from "../controllers/articleController.js"

const articleRouter = express.Router()

articleRouter.post("/new", createArticle)
articleRouter.get("/", getAllArticles)
articleRouter.get("/:id", getOneArticle)

export default articleRouter