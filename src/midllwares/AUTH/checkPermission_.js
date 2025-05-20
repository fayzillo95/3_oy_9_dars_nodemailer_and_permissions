import userModel_ from "../../utils/componentes/models/user.model_.js";
import permissionModel_ from "../../utils/componentes/models/permission.model_.js";
import AuthorizationError from "../../utils/errors/AuthorizationErrror_.js";
import CustomError from "../../utils/errors/CustomError_.js";
import { models } from "../../utils/componentes/collection.componentes_.js";

export default async function checkPermision (req, res, next) {
    try {
        let model = req.url.split("/").at(-1)
        console.log(model)
        const user = await userModel_.findById({_id:req.user._id})
        if(!user) throw new CustomError("User not found ! ", 404)

        if(user.role === 'supperadmin') return next()
            

        let permitionUser = await permissionModel_.findOne({user_id:user._id,model})

        if(!permitionUser || !permitionUser.actions.includes(req.method)){
            throw new AuthorizationError(`In ${model} ${req.method} not allowed ! `, 406)
        }

        next()
    } catch (error) {
        next(error)
    }
}