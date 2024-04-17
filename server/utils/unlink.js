import fs from "fs"

export function deleteImage(filePath) {


    fs.unlink(filePath, (error) => {

        if (error) {

            return console.error("Un problème est survenue durant la suppression de l'image")

        }
        
        console.log("Image supprimée avec succès");

    })
} 
