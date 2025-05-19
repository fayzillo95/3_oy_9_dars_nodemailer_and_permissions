import "dotenv/config"
import mongoDBConnect from "./config/Database.js"

const initApp = async () => {
    const statusdb = await mongoDBConnect()
    if(statusdb) {
        console.log("server running")
    }else{
        console.log("db ulanmadi ")
    }
}

console.log(email)
// initApp()