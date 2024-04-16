import express from "express"
import { createArticle, getAllArticles, getOneArticle, editArticle, deleteArticle } from "../controllers/articleController.js"
import { isLogged, isAuthorized } from "../middleware/auth.js"
import { upload_article } from "../middleware/multer.js"

const articleRouter = express.Router()

articleRouter.post("/new", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), upload_article.single("image"), createArticle)

articleRouter.get("/", getAllArticles)
articleRouter.get("/:id", getOneArticle)

articleRouter.put("/edit/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), upload_article.single("image"), editArticle)

articleRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]), deleteArticle)

export default articleRouter