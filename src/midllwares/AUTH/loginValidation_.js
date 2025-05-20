import userModel_ from "../../utils/componentes/models/user.model_.js";
import AuthorizationError from "../../utils/errors/AuthorizationErrror_.js";
import CustomValidation from "../../utils/validations/CustomValidation_.js";
import bcrypt from "bcrypt"


export default async function loginValidation (req, res, next){
    try {
        if(!req.body) throw new AuthorizationError("Invalid body undefind !", 400)
        if(!req.body.email) throw new AuthorizationError("Invalid daata email not found !")    
        const {error} = CustomValidation.loginValidation(req.body)
        if(error) {
            throw new AuthorizationError(error.details[0].message,400)
        }
        const existsUser = await userModel_.findOne({email:req.body.email})
        if(!existsUser) throw new AuthorizationError("Invalid email user not found !")
        if(!existsUser.isverfy) throw new AuthorizationError("Not verifitcation user login not allowed !", 401)

        const dehashingPass = await bcrypt.compare(req.body.password, existsUser.password)
        if(!dehashingPass) throw new AuthorizationError("Invalid email or password ! ", 401)
        
        const agent = req.headers['user-agent']
        console.log(agent)

        req.user = {
            _id: existsUser._id,
            isverfy: existsUser.isverfy,
            role: existsUser.role,
            agent
        }
        next()    
    } catch (error) {
        next(error)
    }
}