import express from "express"
import { register, getAllUsers, getOneUser, deleteUser, modifyUser, login } from "../controllers/userController.js"
import { isLogged } from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/", isLogged, getAllUsers)
userRouter.get("/:id", isLogged, getOneUser)
userRouter.delete("/delete/:id", isLogged, deleteUser)
userRouter.put("/edit/:id", isLogged, modifyUser)

export default userRouter