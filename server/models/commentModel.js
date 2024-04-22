import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    
    content: {
        type: String, 
        required: true
    },
    
    rating: {
        type: Number,
        required: true,
        max: 5
    },
    
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User", // Pour relier ma collection User avec Comment
        required: true
    },
    
    articleId: {
        type: mongoose.Types.ObjectId,
        ref: "Article",
        required: true
    }
    
    
},{
    timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema)
export default Comment