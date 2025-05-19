import { Schema, model  } from "mongoose";

export default model("Category", new Schema({
    name:{type:String, required:true}
}))
