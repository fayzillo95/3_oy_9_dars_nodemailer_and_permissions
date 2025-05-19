import mongoose from "mongoose";

export default async function mongoDBConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        return true
    } catch (error) {
        console.log(error.message)
        return false        
    }
}
