import express from "express"
import { createArticle } from "../controllers/articleController.js"

const articleRouter = express.Router()

articleRouter.post("/new", createArticle)

export default articleRouter