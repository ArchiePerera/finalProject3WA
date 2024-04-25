import User from "../models/userModel.js"

export const modifyRole = async (req, res) => {

    try {

        const { id } = req.params
        
        const { role } = req.body

        const currentUser = await User.findById(req.userId)

        // seul l'admin peuvent modifier cette information

        if (currentUser.role !== "admin") {

            return res.status(403).json({ message: "Vous n'êtes pas administrateur" })
    
        }
               
        const editRole = {

            role

        }

        await User.findByIdAndUpdate(id, editRole)
        
        res.status(200).json({ message: "Rôle mis à jour" })

        }


    catch (e) {

        res.status(400).json({ message: "Impossible de mettre à jour le rôle" })

    }
}