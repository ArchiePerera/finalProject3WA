import express from "express"
import { register, getAllUsers, getOneUser, deleteUser, modifyUser, login } from "../controllers/userController.js"
import { isLogged, isAuthorized } from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)

userRouter.get("/", isLogged, isAuthorized(["admin"]), getAllUsers)
userRouter.get("/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), getOneUser)

userRouter.put("/edit/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), modifyUser)
userRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]), deleteUser)

export default userRouter