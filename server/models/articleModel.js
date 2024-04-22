import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },

    summary: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
        default: "default_article-img.webp",
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    likes: {
        type: Array,
        required: true,
        default: [],
    },
    
    rating: {
        type: Array,
        required: true,
        default: [],
    }

}, {
    timestamps: true,
})

const Article = mongoose.model("Article", articleSchema)
export default Article