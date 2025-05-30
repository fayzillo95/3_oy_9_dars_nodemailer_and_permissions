import sendVerifikatsiy from "../midllwares/RESPONSEMIDLL/nodemailer.js";
import categoryModel_ from "../utils/componentes/models/category.model._.js";
import ordersModel_ from "../utils/componentes/models/orders.model_.js";
import permissionModel_ from "../utils/componentes/models/permission.model_.js";
import productModel_ from "../utils/componentes/models/product.model_.js";
import userModel_ from "../utils/componentes/models/user.model_.js";
import bcrypt from "bcrypt"
import { getrefUrl, getToken, getUrl } from "../utils/token/tokens.js";
import AuthorizationError from "../utils/errors/AuthorizationErrror_.js";
import CustomError from "../utils/errors/CustomError_.js";


export default class UserService {
    constructor() { }

    static async readAll() {
        const data = await userModel_.find()
        return { success: true, message: "Read users successfull !", data }
    }

    static async createUser(req) {
        let { email, password, fullname } = req.body
        password = await bcrypt.hash(password, 10)
        const newUser = await userModel_.create({ email, password, fullname })
        const tokenData = {
            _id: newUser._id,
            isverfy: newUser.isverfy,
            role: newUser.role,
            agent: req.headers['user-agent']
        }
        await sendVerifikatsiy(email, getUrl(tokenData), getrefUrl(tokenData))
        return { status: 201, success: true, message: "User register successfull verfy link send to email !" }
    }


    static async verifyUser(user) {
        const oldUser = await userModel_.findById(user._id)

        if (!oldUser) throw new AuthorizationError("User not found !", 404)
        if (!oldUser.isverfy) {
            oldUser.isverfy = true
            await oldUser.save()
            return { _id: oldUser._id, isverfy: oldUser.isverfy, role: oldUser.role }
        }
        return { status: 200, success: true, message: "User verification already done login again" }
    }

    static async addPermission(body) {
        const oldUser = await userModel_.findById(body.user_id)
        if (!oldUser) throw new AuthorizationError("User not found !", 404)

        const permition = await permissionModel_.findOne({
            user_id: body.user_id,
            model: body.model
        })

        if (permition) {
            body.actions = Array.isArray(body.actions) ? body.actions : [body.actions]
            let newactions = new Set([...permition.actions, ...body.actions])

            permition.actions = [...newactions]
            await permition.save()

        } else {
            const newPemition = await permissionModel_.create(body)
        }
        return { status: 201, success: true, message: "Permition added successfull !" }
    }

    static async assignetRole(body) {
        const oldUser = await userModel_.findById(body.id)
        if (!oldUser) throw new AuthorizationError("User not found !", 404)
        oldUser.role = body.role
        await oldUser.save()
        return { status: 201, message: "User role assignet !",data:oldUser }
    }

    static async clearsU(){
        const result = await userModel_.deleteMany({role:'user'})
        return result
    }
}
