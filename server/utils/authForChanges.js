

export const authForChange = (currentUser, searchUser) => {

    if (currentUser.id !== searchUser.id && currentUser.role !== "admin") {

        return res.status(403).json({ message: "Vous n'êtes pas l'auteur de l'article" })

    }
}