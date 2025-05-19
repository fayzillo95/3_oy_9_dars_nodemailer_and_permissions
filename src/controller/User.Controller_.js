import UserService from "../service/User.Service_.js";

export default class UserController {
    constructor(parameters) {}
    
    static async getAllUsers (req, res, next) {
        try {
            req.user = await UserService.readAll()
            next()
        } catch (error) {
            next(error)
        }
    }
    static async registratriysa (req, res, next) {
        try {
            console.log(req.body)
            req.user = await UserService.createUser(req)
            res.status(req.user.status || 200).json(req.user)
        } catch (error) {
            next(error)
        }
    }
    static async verification (req, res, next) {
        try {
            req.user = await UserService.verifyUser(req.user)
            if(req.user.status){
                return res.status(req.user.status).json(req.user)
            }
            next()
        } catch (error) {
            next(error)
        }
    }
    static addPermissionUser(req, res, next) {
        try{
            req.user = UserService.addPermission(req.body)
            next()
        }catch(error){
            next(error)
        }
    }
    static async assignetRole (req, res, next) {
        try {
            req.user = await UserService.assignetRole(req.body)
            next()
        } catch (error) {
            next(error)
        }
    }
}