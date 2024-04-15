import express from "express"
import userRouter from "./userRouter.js"
import articleRouter from "./articleRouter.js"

const router = express.Router()

router.use("/users", userRouter)
router.use("/articles", articleRouter)

export default router