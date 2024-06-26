import express from "express"
import { createArticle, getAllArticles, getOneArticle, editArticle, deleteArticle, addLike, addFavorite, deleteLike, deleteFavorite } from "../controllers/articleController.js"
import { isLogged, isAuthorized } from "../middleware/auth.js"
import { upload_article } from "../middleware/multer.js"

const articleRouter = express.Router()

articleRouter.post("/new", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), upload_article.single("imageUrl"), createArticle)
articleRouter.post("/addlike/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), addLike)
articleRouter.post("/addfavorite/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), addFavorite)

articleRouter.get("/", getAllArticles)
articleRouter.get("/:id", getOneArticle)

articleRouter.put("/edit/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), upload_article.single("imageUrl"), editArticle)

articleRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]), deleteArticle)
articleRouter.delete("/deletelike/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), deleteLike)
articleRouter.delete("/deletefavorite/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), deleteFavorite)

export default articleRouter