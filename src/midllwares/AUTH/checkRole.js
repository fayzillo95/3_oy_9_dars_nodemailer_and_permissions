import userModel_ from "../../utils/componentes/models/user.model_.js";
import permissionModel_ from "../../utils/componentes/models/permission.model_.js";
import AuthorizationError from "../../utils/errors/AuthorizationErrror_.js";
import CustomError from "../../utils/errors/CustomError_.js";

export default async function checkUserRole (req, res, next) {
    try {
        const user = await userModel_.findById({_id:req.user._id})
        if(!user) throw new CustomError("User not found ! ", 404)
        if(user.role === 'supperadmin') return next()
        throw new AuthorizationError("Add perrmission not alllowed !")    
    } catch (error) {
        next(error)
    }
}