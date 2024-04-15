import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true,
        maxLength: 320,
    },
    imageProfile: {
        type: String,
        required: true,
        default: "default_profile.webp",
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 55,
    },
    status: {
        type: String,
        required: true,
        enum: ["user", "admin", "mentor", "student"],
        default: "user",
    }

}, {
    timestamps: true,
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