import Comment from "../models/commentModel.js";

export const addNewComment = async (req, res) => {

    try {

        const { content } = req.body
        
        const { articleId } = req.params
        
        // Sécurité
        if(content.trim() === ""){

            return res.status(400).json({ message: "Veuillez remplir correctement le champ" })

        }
        
        const newComment = new Comment({
            content,
            articleId,
            userId: req.userId,
        })
        
        await newComment.save();
        
        res.status(201).json({ messsage: "Commentaire ajouté avec succès" })
        
    } 
    catch (e) {

        res.status(400).json({ message: "Impossible d'ajouter un nouveau commentaire" })

    }
}

export const getAllCommentsByArticle = async (req, res) => {

    try {

        const { articleId } = req.params
        
        const comments = await Comment.find({articleId}).populate("userId", "-password").populate("articleId", "-content")
        
        res.status(200).json(comments)

    } 
    catch (e) {

        res.status(400).json({ message: "Impossible de récupérer les commentaires de cet article" })

    }
}