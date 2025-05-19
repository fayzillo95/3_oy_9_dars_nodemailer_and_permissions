import "dotenv/config"
import mongoDBConnect from "./config/Database.js"
import express from "express";
import errorMidllwares_ from "./midllwares/errorMidllwares_.js";
import userRouter from "./routers/user.router_.js";

const app  = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const initApp = async () => {
    const statusdb = await mongoDBConnect()
    if(statusdb) {
        
        const PORT = process.env.PORT
        app.use("/api",userRouter)
        app.use(errorMidllwares_)
        
        app.listen(PORT,console.log(`server running     
            http://${process.env.HOST}:${process.env.PORT}`))
    }else{
        console.log("db ulanmadi ")
    }
}

initApp()