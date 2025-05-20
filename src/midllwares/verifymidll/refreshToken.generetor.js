import userModel_ from "../../utils/componentes/models/user.model_.js";
import { getUrl, getrefUrl } from "../../utils/token/tokens.js";
import sendVerifikatsiy from "../RESPONSEMIDLL/nodemailer.js";

export default function refreshTokenGeneretor(req, res, next) {
    try {
        const user  = userModel_.findById({_id:req.user.id})
        sendVerifikatsiy(user.email, getUrl(req.user), getrefUrl(req.user))
        
        res.status(201).json({ 
            status: 201, 
            success: true, 
            message: "Send new verfy link to email !" 
        })
    } catch (error) {
        next(error)
    }
}