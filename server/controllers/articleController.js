import Article from "../models/articleModel.js"

export const createArticle = async (req, res) => {

    try {

        const { title, summary, content, imageUrl, userId, likes, rating } = req.body

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
            userId,
        })

        console.log(newArticle)

        await newArticle.save()

        res.status(200).json({ message: "Article créé avec succès" })

    } catch (e) {

        res.status(400).json({ message: "impossible de créer un article", e })

    }

}