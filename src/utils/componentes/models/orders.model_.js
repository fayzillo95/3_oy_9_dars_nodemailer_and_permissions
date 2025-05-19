import { Schema, model  } from "mongoose";

export default model("Order", new Schema({
    product_id:{type:Schema.Types.ObjectId,required:true,ref:"Product"},
    user_id:{type:Schema.Types.ObjectId,required:true,ref:"User"},
    count:{type:Number,reauired:true}
}))