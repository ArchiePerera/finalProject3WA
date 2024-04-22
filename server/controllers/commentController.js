import Comment from "../models/commentModel.js";

export const addNewComment = async (req, res) => {

    try {
        const { content, rating } = req.body
        
        const { articleId } = req.params
        
        // Sécurité
        if(content.trim() === "" || rating <= 0 || rating > 5){

            return res.status(400).json({ message: "Veuillez remplir correctement les champs" })

        }
        
        const newComment = new Comment({
            content,
            rating,
            articleId,
            userId: req.userId,
        })
        
        await newComment.save();
        
        res.status(200).json({ messsage: "Commentaire ajouté avec succès" })
        
    } 
    catch (e) {

        res.status(400).json({ message: "Impossible d'ajouter un nouveau commentaire" })

    }
}

export const getAllCommentsByArticle = async (req, res) => {

    try {

        const { articleId } = req.params
        
        const comments = await Comment.find({articleId}).populate("userId", "-password").populate("articleId")
        
        res.status(200).json(comments)

    } 
    catch (e) {

        res.status(400).json({ message: "Impossible de récupérer les commentaires de cet article" })

    }
}