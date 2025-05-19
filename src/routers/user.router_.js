import { Router } from "express";
import UserController from "../controller/User.Controller_.js";
import jwtHandlers_ from "../midllwares/jwtHandlers_.js";
import { checkToken } from "../midllwares/checktoken.js";
import { verfyToken } from "../midllwares/verfyToken.js";


const userRouter  = Router()

userRouter.post("/register", UserController.registratriysa, jwtHandlers_)
          .get("/refreshtoken", UserController.verification, jwtHandlers_)  
          .get("/:token",verfyToken,UserController.verification,jwtHandlers_)
export default userRouter