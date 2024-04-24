import Article from "../models/articleModel.js"
import User from "../models/userModel.js"
import { deleteFile } from "../utils/deleteFile.js"
import { DEFAULT_IMAGE_ARTICLE } from "../config/defaultFiles.js"

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
            author: req.userId,
        })

        const article = await newArticle.save()

        await User.updateOne(
            { _id: req.userId },
            { $addToSet: { articles: article._id } }
        )

        res.status(200).json({ message: "Article créé avec succès" })

    } catch (e) {

        res.status(400).json({ message: "impossible de créer un article" })

    }
}

export const getAllArticles = async (req, res) => {

    try {

        const articles = await Article.find({})
        .populate({ path: "author", select: ["firstName", "lastName", "imageProfile"] })

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
        .populate({ path: "author", select: ["firstName", "lastName", "imageProfile"] })

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

        const article = await Article.findById(id).populate("author", "-password")

        const filePath = `public/img-articles/${ article.imageUrl }`

        const currentUser = await User.findById(req.userId)

        const searchUser = article.author

        // Sécurité
        if (title.trim() === "" ||
        summary.trim() === "" ||
        content.trim() === ""
        ){

            return res.status(400).json({ message: "Veuillez remplir tous les champs" })

        }

        const editArticle = {
    
            title,
            summary,
            content,
            imageUrl: req.file && req.file.filename,
            
        }

        // seuls le propriètaire de l'article et l'admin peuvent modifier ces informations

        if (currentUser.id !== searchUser.id && currentUser.role !== "admin") {

            return res.status(403).json({ message: "Vous n'êtes pas l'auteur de l'article" })
    
        }

        if ( req.file && article.imageUrl === DEFAULT_IMAGE_ARTICLE ) {

            await Article.findByIdAndUpdate( id, editArticle )
    
            res.status(200).json({ message: "Article bien mis à jour" })

        }
        else {

            deleteFile(filePath)

            await Article.findByIdAndUpdate( id, editArticle )
    
            res.status(200).json({ message: "Article bien mis à jour" })

        }
    }

    catch (e) {

        res.status(400).json({ message: "Impossible de mettre à jour l'article" })

    }
}

export const deleteArticle = async (req, res) => {

    try {

        const { id } = req.params

        const article = await Article.findById(id)

        const filePath = `public/img-articles/${ article.imageUrl }`

        const currentUser = await User.findById(req.userId)

        const searchUser = article.author._id

        // seuls le propriètaire de l'article et l'admin peuvent effacer ces informations

        if (currentUser.id !== searchUser.id && currentUser.role !== "admin") {

            return res.status(403).json({ message: "Vous n'êtes pas l'auteur de l'article" })
    
        }

        if (article.imageUrl === DEFAULT_IMAGE_ARTICLE) {

            await Article.findByIdAndDelete(id)

            res.status(200).json({ message: "L'article a bien été supprimé" })

        }
        else {

            deleteFile(filePath)

            await User.updateOne(
                { _id: req.userId },
                { $pull: { articles: article._id } }
            )
            
            await Article.findByIdAndDelete(id)

            res.status(200).json({ message: "L'article a bien été supprimé" })

        }

    }
    catch (e) {

        res.status(400).json({ message: "Impossible de supprimer l'article", e })

    }
}

export const addLike = async (req, res) => {

    try {

        const { id } = req.params

        await Article.updateOne(
            { _id: id },
            { $addToSet: { likes: req.userId } }
        )
    
        res.status(200).json({ message: "Like enregistré" })

    }
    catch (e) {

        res.status(400).json({ message: "Impossible d'ajouter un like" })

    }
}

export const deleteLike = async (req, res) => {

    try {

        const { id } = req.params

        await Article.updateOne(
            { _id: id },
            { pull: { likes: req.userId } }
        )

        res.status(400).json({ message: "le like a bien été supprimé" })

    }
    catch (e) {

        res.status(400).json({ message: "Impossible de supprimer le like" })

    }
}

export const getAllLikes = async (req, res) => {

    const { id } = req.params

    likes = await Article.findById(id).select("likes")

    res.status(200).json({ likes })

}

export const addFavorite = async (req, res) => {

    try {

        const { id } = req.params

        await Article.updateOne(
            { _id: id },
            { $addToSet: { favorites: req.userId } }
        )
    
        res.status(200).json({ message: "Favori enregistré" })

    }
    catch (e) {

        res.status(400).json({ message: "Impossible d'ajouter l'article en favori" })

    }
}

export const deleteFavorite = async (req, res) => {

    try {

        const { id } = req.params

        await Article.updateOne(
            { _id: id },
            { pull: { favorites: req.userId } }
        )

        res.status(400).json({ message: "le favori a bien été supprimé" })

    }
    catch (e) {

        res.status(400).json({ message: "Impossible de supprimer le favori" })

    }
}

export const getAllFavorites = async (req, res) => {

    try {

        const { id } = req.params

        const favorites = await Article.findById(id).select("favorites")

        res.status(200).json({ favorites })

    }
    catch (e) {

        res.status(400).json({ message: "Impossible de récupérer les favoris" })

    }
}