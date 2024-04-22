import express from "express"
import userRouter from "./userRouter.js"
import articleRouter from "./articleRouter.js"
import commentRouter from "./commentRouter.js"

const router = express.Router()

router.use("/users", userRouter)
router.use("/articles", articleRouter)
router.use("/comments", commentRouter)

export default router