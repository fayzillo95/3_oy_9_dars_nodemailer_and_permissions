import "dotenv/config"
import mongoDBConnect from "./config/Database.js"
import { email } from "./utils/componentes/emails/email_componentes.js"

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