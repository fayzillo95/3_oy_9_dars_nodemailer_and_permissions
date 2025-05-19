import UserService from "../service/User.Service_.js";

class UserController {
    constructor(parameters) {}
    
    static async registratriysa (req, res, next) {
        try {
            req.user = await UserService.createUser(req)
            next()
        } catch (error) {
            next(error)
        }
    }
    static async verification (req, res, next) {
        try {
            req.user = await UserService.verifyUser(req.user)
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
    
}