import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isLogged = (req, res, next) => {
    
    const authToken = req.headers.authorization;
    
    
    // J'extrais le token du headers de la requête
    const token = authToken && authToken.split(" ")[1]
    
    if(!token){
        return res.status(401).json({message: "Vous n'êtes pas authentifié"})
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
            return res.status(403).json({message: "Token invalide"})
        }
        
        // Je créé un nouveau champ (clé) dans la REQ
        
        req.userId = decoded.id; // L'ID de la personne connectée
        next();
    }
    
    )
    
}