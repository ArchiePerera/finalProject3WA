import express from "express"
import { register, getAllUsers, getOneUser } from "../controllers/userController.js"
import { createArticle } from "../controllers/articleController.js"

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.get("/", getAllUsers)
userRouter.get("/:id", getOneUser)

userRouter.post("/new", createArticle)

export default userRouter