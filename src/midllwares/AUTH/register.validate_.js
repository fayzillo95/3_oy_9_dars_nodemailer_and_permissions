import userModel_ from "../../utils/componentes/models/user.model_.js"
import AuthorizationError from "../../utils/errors/AuthorizationErrror_.js"
import CustomError from "../../utils/errors/CustomError_.js"
import CustomValidation from "../../utils/validations/CustomValidation_.js"

export const checkBodyRegister = async (req, res, next)=> {
    try {
        if(!req.body) {
            throw new AuthorizationError("Invalid data undefined not acceptly !", 400)
        }
        const existUser = await userModel_.findOne({email:req.body.email})
        if(existUser) throw new AuthorizationError("User already exists !",406)

        const {error} = CustomValidation.registerValidation(req.body)
        if(error) throw new AuthorizationError(error.details[0].message,400)
        
        next()
    } catch (error) {
        next(error)
    }
}

export const permissionValidation = (req, res, next) => {
    try {
        const {error} = CustomValidation.permissionValidation(req.body, {abortEarly:false})
        if(error) {
            let message = error.details.map(detal=>detal.message)
            throw new CustomError(message.join(" |  "),400)
        }
        next()
    } catch (error) {
        next(error)
    }
}