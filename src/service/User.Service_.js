import sendVerifikatsiy from "../midllwares/nodemailer.js";
import categoryModel_ from "../utils/componentes/models/category.model._.js";
import ordersModel_ from "../utils/componentes/models/orders.model_.js";
import permissionModel_ from "../utils/componentes/models/permission.model_.js";
import productModel_ from "../utils/componentes/models/product.model_.js";
import userModel_ from "../utils/componentes/models/user.model_.js";
import bcrypt from "bcrypt"
import { getUrl } from "../utils/token/tokens.js";
import AuthorizationError from "../utils/errors/AuthorizationErrror_.js";

const refreshUrl = `http://${process.env.HOST}:${process.env.HOST}/refreshtoken`

export default class UserService{
    constructor(){}

    static async createUser(req) {
        let {email, password, fullname} =  req.body
        password = await bcrypt.hash(password)
        const newUser = await userModel_.create({email, password, fullname})
        const tokenData = {_id:newUser._id, isverfy:newUser.isverfy, role:newUser.role}

        await sendVerifikatsiy(email, getUrl(tokenData), refreshUrl)

        return {status:201,success:true,messaga:"User register successfull verfy link send to email !"}
    }
    static async verifyUser(user) {
        const oldUser = await userModel_.findById(user._id)
        if(!oldUser) throw new AuthorizationError("User not found !", 404)
        if(!oldUser.isverfy){
            oldUser.isverfy = true
            await oldUser.save()
            return {status:200,success:true,messaga:"User verfication succesfull !"}
        }
        return {status:200,success:true,messaga:"User verfication old ready !"}
    }
    static async addPermission(body) {
        const oldUser = await userModel_.findById(user._id)
        if(!oldUser) throw new AuthorizationError("User not found !", 404)
        
        const permition = await permissionModel_.find({user_id:user._id})
        
        if(permition && permition.model === body.model) {
            let actions = new Set([...permition.actions,body.actions])
            permition.actions = [...actions]
            await permissionModel_.updateOne({user_id:user._id},permition)
        }else{
            const newPemition = await permissionModel_.create(body)   
        }
        return {status:201,success:true,messaga:"Permition created  !"}
    }
}

// console.log(categoryModel_, ordersModel_, permissionModel_, productModel_.schema.obj, userModel_.schema.obj)