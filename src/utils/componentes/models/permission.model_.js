import { Schema, model  } from "mongoose";
import { actions, models } from "../collection.componentes_.js";

export default  model("Permission",new Schema({
    user_id:{type:Schema.Types.ObjectId, ref:"User", required:true},
    actions:{type:[String],enum:actions, required:true},
    model:{type:String,enum:models,required:true}
}))
