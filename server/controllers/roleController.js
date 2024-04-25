import User from "../models/userModel.js"

export const modifyRole = async (req, res) => {

    try {
        console.log("ici et la")
        const { id } = req.params
        console.log(id)
        
        const { role } = req.body
        console.log(role)

        console.log(req.userId)

        const currentUser = await User.findById(req.userId)
        console.log(currentUser)

        // seul l'admin peuvent modifier cette information

        if (currentUser.role !== "admin") {

            return res.status(403).json({ message: "Vous n'êtes pas administrateur" })
    
        }

        console.log("ici")
               
        const editRole = {

            role

        }

        console.log(editRole)

        await User.findByIdAndUpdate(id, editRole)
        
        res.status(200).json({ message: "Role mis à jour" })

        }


    catch (e) {

        res.status(400).json({ message: "Impossible de mettre à jour le role" })

    }
}