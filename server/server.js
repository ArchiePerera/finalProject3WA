import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"   
import cors from "cors"

const app = express()

connectDB

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cors())




app.listen(process.env.PORT, () => {
    console.log("Server is running")
})