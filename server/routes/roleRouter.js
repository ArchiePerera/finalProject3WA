import express from "express"
import { modifyRole } from "../controllers/roleController.js"
import { isLogged, isAuthorized } from "../middleware/auth.js"

const roleRouter = express.Router()

roleRouter.post("/changerole/:id", isLogged, isAuthorized(["admin"]), modifyRole)

export default roleRouter