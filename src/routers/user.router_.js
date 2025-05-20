import { Router } from "express";
import UserController from "../controller/User.Controller_.js";
import { checkToken } from "../midllwares/TOKENMIDLL/checktoken.js";
import { checkBodyRegister, permissionValidation } from "../midllwares/AUTH/register.validate_.js";
import jwtHandlers_ from "../midllwares/TOKENMIDLL/jwtHandlers_.js";
import { verfyToken } from "../midllwares/verifymidll/verfyToken.js";
import refreshTokenGeneretor from "../midllwares/verifymidll/refreshToken.generetor.js";
import responserHandlers_ from "../midllwares/RESPONSEMIDLL/responserHandlers_.js";
import loginValidation from "../midllwares/AUTH/loginValidation_.js";
import checkUserRole from "../midllwares/AUTH/checkRole.js";


const userRouter  = Router()

userRouter.get("/users/all",  UserController.getAllUsers, responserHandlers_)

userRouter.post("/users/register", checkBodyRegister,
                             UserController.registratriysa, 
                             responserHandlers_)

userRouter.get("/refresh/:token", verfyToken, refreshTokenGeneretor)  
          
userRouter.get("/verfy/:token", verfyToken, 
                          UserController.verification, 
                          jwtHandlers_)

userRouter.post("/add/permission",checkToken, checkUserRole,  permissionValidation, UserController.addPermissionUser, responserHandlers_  )

userRouter.patch("/update/role", checkToken, checkUserRole, UserController.assignetRole, responserHandlers_)

userRouter.post("/users/login", loginValidation, jwtHandlers_) 

userRouter.get("/users/clear", UserController.clearUsers, responserHandlers_)


export default userRouter
