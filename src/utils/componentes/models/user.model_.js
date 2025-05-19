import { Schema, model  } from "mongoose";
import { roles} from "../collection.componentes_.js";

export default model("User", new Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isverfy:{type:Boolean,default:false},
    role:{type:String,enum:roles, default:'supperadmin'}
}));
