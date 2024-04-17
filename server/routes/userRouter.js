import express from "express"
import { register, getAllUsers, getOneUser, deleteUser, modifyUser, login } from "../controllers/userController.js"
import { isLogged, isAuthorized } from "../middleware/auth.js"
import { upload_profile } from "../middleware/multer.js"

const userRouter = express.Router()

userRouter.post("/register", upload_profile.single("imageProfile"), register)
userRouter.post("/login", login)

userRouter.get("/", isLogged, isAuthorized(["admin"]), getAllUsers)
userRouter.get("/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), upload_profile.single("image"), getOneUser)

userRouter.put("/edit/:id", isLogged, isAuthorized(["admin", "mentor", "student", "user"]), upload_profile.single("imageProfile"), modifyUser)
userRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]), deleteUser)

export default userRouter