import sendVerifikatsiy from "../midllwares/nodemailer.js";
import categoryModel_ from "../utils/componentes/models/category.model._.js";
import ordersModel_ from "../utils/componentes/models/orders.model_.js";
import permissionModel_ from "../utils/componentes/models/permission.model_.js";
import productModel_ from "../utils/componentes/models/product.model_.js";
import userModel_ from "../utils/componentes/models/user.model_.js";
import bcrypt from "bcrypt"
import { getToken, getUrl } from "../utils/token/tokens.js";
import AuthorizationError from "../utils/errors/AuthorizationErrror_.js";
import CustomError from "../utils/errors/CustomError_.js";

const refreshUrl = `http://${process.env.HOST}:${process.env.PORT}/refreshtoken`

export default class UserService{
    constructor(){}

    static async readAll() {
        const data = await userModel_.find()
        return {success:true,message:"Read users successfull !",data}
    }

    static async createUser(req) {
        let {email, password, fullname} =  req.body
        password = await bcrypt.hash(password, 10)
        const newUser = await userModel_.create({email, password, fullname})
        const tokenData = {_id:newUser._id, isverfy:newUser.isverfy, role:newUser.role}

        await sendVerifikatsiy(email, getUrl(tokenData), refreshUrl)

        return {status:201,success:true,message:"User register successfull verfy link send to email !"}
    }

    static async checkLogin(body) {
        let {email, password} =  body
        
        let user  = await userModel_.findOne({email})
        if(!user) throw new CustomError("User not found !" , 404)
        
        let checkPasss = await bcrypt.compare(password, user.password)
        if(!checkPasss) throw new AuthorizationError("Invalid email or password ! ", 401)
        
        if(!user.isverfy) throw new AuthorizationError("User verification not done ! ", 401)
        const tokenData = {_id:user._id, isverfy:user.isverfy, role:user.role}
        return getToken(tokenData)        
    }
    
    static async verifyUser(user) {
        const oldUser = await userModel_.findById(user._id)

        if(!oldUser) throw new AuthorizationError("User not found !", 404)
        if(!oldUser.isverfy){
            oldUser.isverfy = true
            await oldUser.save()
            return {status:200,success:true,message:"User verfication succesfull !"}
        }
        return {status:200,success:true,message:"User verification already done"}
    }
    
    static async addPermission(body) {
        const oldUser = await userModel_.findById(body.user_id)
        if(!oldUser) throw new AuthorizationError("User not found !", 404)
        
        const permition = await permissionModel_.findOne({
            user_id:body.user_id, 
            model:body.model
        })
        
        if(permition) {
            body.actions = Array.isArray(body.actions) ? body.actions : [body.actions]
            let newactions = new Set([...permition.actions,...body.actions])
            
            permition.actions = [...newactions]
            await permition.save()
        }else{
            const newPemition = await permissionModel_.create(body)   
        }
        return {status:201,success:true,message:"Permition added successfull !"}
    }

    static async assignetRole(body) {
        const oldUser = await userModel_.findById(body.user_id)
        if(!oldUser) throw new AuthorizationError("User not found !", 404)
        oldUser.role = body.role
        await oldUser.save()
        return {status:201,message:"User role assignet !"}    
    }
}

// console.log(categoryModel_, ordersModel_, permissionModel_, productModel_.schema.obj, userModel_.schema.obj)