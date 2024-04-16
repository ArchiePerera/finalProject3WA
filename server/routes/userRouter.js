import express from "express"
import { register, getAllUsers, getOneUser, deleteUser, modifyUser, login } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/", getAllUsers)
userRouter.get("/:id", getOneUser)
userRouter.delete("/delete/:id", deleteUser)
userRouter.put("/edit/:id", modifyUser)

export default userRouter