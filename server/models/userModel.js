import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }

}, {
    timestamps: true
})

// Hook exécuté avant la création de l'utilisateur

userSchema.pre("save", async function (next) {

    // Si le mot de passe n'a pas été modifié
    if (!this.isModified("password")) {
        return next()
    }

    try {

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()

    } catch (e) {

        next(e)

    }
})

const User = mongoose.model("User", userSchema)
export default User