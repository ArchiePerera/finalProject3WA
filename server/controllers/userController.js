import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const register = async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;

        // PWD: 1 Maj, 1M, 1caractère spé, 1 chiffre
        // source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/

        // EMAIL REGEX
        // source: https://regexr.com/3e48o
        const checkEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        console.log(req.body)

        // Sécurité

        if (firstName.trim() === "" ||
            lastName.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "") {
            return res.status(400).json({ message: "Veuillez remplir tous les champs" })
        }


        // Vérification du MDP respectant la regex
        if (!checkPwd.test(password)) {
            return res.status(401).json({ message: "Le mot de passe ne respecte pas les conditions" })
        }
        if (!checkEmail.test(email)) {
            return res.status(401).json({ message: "l'email n'est pas valide"})
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        })

        console.log(newUser)

        // IL VA EXECUTE LE HACHAGE DE MOT DE PASSE AVANT DE SAUVEGARDER EN BDD
        // LE HOOK PRE SERA EXECUTE
        await newUser.save()

        res.status(200).json({ message: "Compte créé avec succès" })

    }
    catch (e) {

        res.status(400).json({ message: "Impossible de créer un compte" })

    }
}

export const getAllUsers = async (req, res) => {

    try {
        
        // ON VA EXCLURE LE PASSWORD
        const users = await User.find({}).select("-password")

        res.status(200).json(users)

    }

    catch (e) {

        res.status(400).json({ message: "Impossible de récupérer les profils utilisateurs" })

    }
}

export const getOneUser = async (req, res) => {

    try {
        const { id } = req.params;
        
        // const currentUser = await User.findById(req.userId)
        // const searchUser = await User.findById(id) 
        
        // if (currentUser.role === "user" && currentUser.id !== searchUser.id) {
        //     return res.status(403).json({message: "Accès refusé"})
        // }
        
        const user = await User.findById(id)
        
        res.status(200).json(user)
        
    } catch (e) {

        res.status(400).json({message: "Impossible de récupérer le profil selectionné"})
        
    }
}

export const modifyUser = async (req, res) => {

        try {
        
            const { id } = req.params
            
            const { firstName, lastName, email } = req.body

            console.log(req.body)
            
            // Sécurité
            
            if (firstName && lastName && email) {
                if(firstName && firstName.trim() === "" ||
                lastName && lastName.trim() === "" ||
                email && email.trim() === ""
                ) {
                    return res.status(400).json({message: "Veuillez remplir tous les champs !"})
                }
            }

            
            const editUser = {
                firstName,
                lastName,
                email,
            }


            
            await User.findByIdAndUpdate(id, editUser)
            
            res.status(200).json({message: "Profil mis à jour"})
        }
        catch (e) {

            res.status(400).json({ message: "Impossible de mettre à jour le profil", e })

        }

}

export const deleteUser = async (req, res) => {

    try {

        const { id } = req.params

        await User.findByIdAndDelete(id)

        res.status(200).json({ message: "Utilisateur supprimé" })

    }
    catch (e) {

        res.status(400).json({ message: "Impossible de supprimer l'utilisateur" })

    }

}