import multer from "multer";
import path from "path";

const maxSizeImg = 5242880 // environ 5 Mo
const maxSizePdf = 157286400 // environ 150 Mo

const storageEngine_article = multer.diskStorage({
    destination: "./public/img-articles",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`)
    }
})

export const upload_article = multer({
    storage: storageEngine_article,
    limits: {
        fileSize: maxSizeImg
    },
    fileFilter: (req, file, cb) => {
        checkFileTypeImg(file, cb)
    }
})

const storageEngine_profile = multer.diskStorage({
    destination: "./public/img-profiles",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`)
    }
})

export const upload_profile = multer({
    storage: storageEngine_profile,
    limits: {
        fileSize: maxSizeImg
    },
    fileFilter: (req, file, cb) => {
        checkFileTypeImg(file, cb)
    }
})

const storageEngine_pdf = multer.diskStorage({
    destination: "./public/pdf",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`)
    }
})

export const upload_pdf = multer({
    storage: storageEngine_profile,
    limits: {
        fileSize: maxSizePdf
    },
    fileFilter: (req, file, cb) => {
        checkFileTypePdf(file, cb)
    }
})

// Fonction qui retourne et qui va vérifier le type des fichiers autorisés
const checkFileTypeImg = (file, cb) => {
    
    // Autorisation des fichiers img
    const fileTypes = /png|jpg|jpeg|gif|svg|webp/
    
    
    // Vérification des extensions de fichiers
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    
    if(extName && mimeType){
        return cb(null, true)
    }else {
        cb("Format de fichier non supporté")
    }
}

// Fonction qui retourne et qui va vérifier le type des fichiers autorisés
const checkFileTypePdf = (file, cb) => {
    
    // Autorisation des fichiers pdf
    const fileTypes = /pdf/
        
    // Vérification des extensions de fichiers
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    
    if(extName && mimeType){
        return cb(null, true)
    }else {
        cb("Format de fichier non supporté")
    }
}
