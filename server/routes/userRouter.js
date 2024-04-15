import express from "express"
import { register, getAllUsers, getOneUser, deleteUser, modifyUser } from "../controllers/userController.js"
import { createArticle } from "../controllers/articleController.js"

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.get("/", getAllUsers)
userRouter.get("/:id", getOneUser)
userRouter.delete("/delete/:id", deleteUser)
userRouter.put("/edit/:id", modifyUser)

export default userRouter