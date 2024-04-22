import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    
    content: {
        type: String, 
        required: true
    },
        
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
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