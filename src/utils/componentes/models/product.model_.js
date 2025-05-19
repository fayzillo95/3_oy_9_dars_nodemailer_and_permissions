import { Schema, model  } from "mongoose";

export default model("Product", new Schema({
    name:{type:String, required:true},
    category_id:{type:Schema.Types.ObjectId,ref:"Category", required:true},
    price:{type:Number, required:true},
    count:{type:Number,default:0}
}))