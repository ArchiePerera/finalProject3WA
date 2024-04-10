import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const register = async(req, res) => {

    try {

        const { username, password } = req.body;

        // PWD: 1 Maj, 1M, 1caractère spé, 1 chiffre
        // source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/

        // Sécurité

        if (username.trim() === "" ||
            password.trim() === "") {
            return res.status(400).json({ message: "Veuillez remplir tous les champs" })
        }


        // Vérification du MDP respectant la regex
        if (!checkPwd.test(password)) {
            return res.status(401).json({ message: "Le mot de passe ne respecte pas les conditions" })
        }

        const newUser = new User({
            username,
            password
        })

        // IL VA EXECUTE LE HACHAGE DE MOT DE PASSE AVANT DE SAUVEGARDER EN BDD
        // LE HOOK PRE SERA EXECUTE
        await newUser.save()

        res.status(200).json({ message: "Compte créé avec succès" })

    }
    catch (e) {
        res.status(400).json({ message: "Impossible de créer un compte" })
    }
}