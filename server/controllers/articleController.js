import Article from "../models/articleModel.js"
import fs from "fs"
import { deleteFile } from "../utils/unlink.js"

export const createArticle = async (req, res) => {

    try {

        const { title, summary, content } = req.body

        // Sécurité
        if (title.trim() === "" ||
        summary.trim() === "" ||
        content.trim() === ""
        ){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" })
        }

        const newArticle = new Article({
            title,
            summary,
            content,
            imageUrl: req.file && req.file.filename,
            userId: req.userId,
        })

        await newArticle.save()

        res.status(200).json({ message: "Article créé avec succès" })

    } catch (e) {

        res.status(400).json({ message: "impossible de créer un article" })

    }
}

export const getAllArticles = async (req, res) => {

    try {

        const articles = await Article.find({})

        res.status(200).json(articles)

    }

    catch (e) {

        res.status(400).json({ message: "Impossible de récupérer les articles" })

    }

}

export const getOneArticle = async (req, res) => {

    try {

        const { id } = req.params

        const article = await Article.findById(id)

        res.status(200).json(article)

    }

    catch (e) {

        res.status(400).json({ message: "Impossible de récupérer l'article" })

    }

}

export const editArticle = async (req, res) => {

    try {

        const { id } = req.params

        const { title, summary, content } = req.body

        const article = await Article.findById(id)

        const filePath = `public/img-articles/${article.imageUrl}`

        req.file && deleteFile(filePath)

        const editArticle = {
            title,
            summary,
            content,
            imageUrl: req.file && req.file.filename,
        }

        await Article.findByIdAndUpdate(id, editArticle)

        res.status(200).json({ message: "Article bien mis à jour" })

    }

    catch (e) {

        res.status(400).json({ message: "Impossible de mettre à jour l'article" })

    }

}

export const deleteArticle = async (req, res) => {

    try {

        const { id } = req.params

        const article = await Article.findById(id)

        const filePath = `public/img-articles/${article.imageUrl}`

        deleteFile(filePath)

         await Article.findByIdAndDelete(id)

        res.status(200).json({ message: "L'article a bien été supprimé" })

    }
    catch (e) {

        res.status(400).json({ message: "Impossible de supprimer l'article", e })

    }
}