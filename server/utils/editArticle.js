import Article from "../models/articleModel.js"

export const modifyArticle = async (req, id) => {

    const { title, summary, content } = req.body

    const editArticle = {

        title,
        summary,
        content,
        imageUrl: req.file && req.file.filename,
        
    }

    await Article.findByIdAndUpdate( id, editArticle )

}