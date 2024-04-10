import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"   
import cors from "cors"

// mise en place d'express
const app = express()

// connection de la BDD
connectDB

// prise en compte des variables d'environnement
dotenv.config()

// prise en compte du format JSON
app.use(express.json())

// prise en charge des informations de requêtes
app.use(express.urlencoded({extended: true}))

// mise à disposition du dossier public
app.use(express.static("public"))

// prise en compte des "Cors Policies"
app.use(cors())



// écoute des requêtes entrantes
app.listen(process.env.PORT, () => {
    console.log("Server is running")
})

