import express from "express"
import { register, getAllUsers, getOneUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.get("/all", getAllUsers)
userRouter.get("/:id", getOneUser)

export default userRouter