import Article from "../models/articleModel.js"
import { deleteFile } from "../utils/deleteFile.js"
import { modifyArticle } from "../utils/editArticle.js"
import { DEFAULT_IMAGE_ARTICLE } from "../config/defaultFiles.js"
import User from "../models/userModel.js"

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
        .populate({ path: "author", select: ["firstName", "lastName", "imageProfile"] }).exec()

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
        .populate({ path: "author", select: ["firstName", "lastName", "imageProfile"] }).exec()

        res.status(200).json(article)

    }

    catch (e) {

        res.status(400).json({ message: "Impossible de récupérer l'article" })

    }

}

export const editArticle = async (req, res) => {

    try {

        const { id } = req.params

        const article = await Article.findById(id).populate("author").exec()

        const filePath = `public/img-articles/${ article.imageUrl }`

        // req.file && deleteFile(filePath)



        const currentUser = await User.findById(req.userId)
        const searchUser = article.author._id

        // seuls le propriètaire de l'article et l'admin peuvent modifier ces informations

console.log(currentUser._id)
console.log(searchUser._id)  

        if (currentUser._id.toString() !== searchUser._id.toString() && currentUser.role !== "admin") {

            return res.status(403).json({ message: "Vous n'êtes pas l'auteur de l'article" })

        }

        if ( req.file && article.imageUrl === DEFAULT_IMAGE_ARTICLE ) {

            modifyArticle(req, id)

            // const editArticle = {
            //     title,
            //     summary,
            //     content,
            //     imageUrl: req.file && req.file.filename,
            // }
    
            // await Article.findByIdAndUpdate( id, editArticle )
    
            res.status(200).json({ message: "Article bien mis à jour" })

        }
        else {

            deleteFile(filePath)

            // const editArticle = {
            //     title,
            //     summary,
            //     content,
            //     imageUrl: req.file && req.file.filename,
            // }
    
            // await Article.findByIdAndUpdate( id, editArticle )

            modifyArticle(req, id)
    
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

console.log(currentUser._id)
console.log(searchUser._id)  

        if (currentUser._id.toString() !== searchUser._id.toString() && currentUser.role !== "admin") {

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