import categoryModel_ from "../utils/componentes/models/category.model._.js";
import CustomError from "../utils/errors/CustomError_.js";
import { isValidObjectId } from "mongoose";

function isId(id){
    return isValidObjectId(id)
}
export default class CategoryService {
    constructor(parameters) {
        
    }
    static async getAll(){
        console.log("getAll service")
        const data = await categoryModel_.find()
        return data
    }

    static async addCategory(body) {
        const existsCategory  = await categoryModel_.findOne(body)
        if(existsCategory) throw new CustomError(`${body.name} exists in categories !`, 400)
        const data = await categoryModel_.create(body)
        return data
    }

    static async updateItem(body) {
        if(!isId(body.id)) throw new CustomError("Invalid Id !", 400)
        let _id = body.id
        delete body.id
        const existsCategory  = await categoryModel_.findOne({_id})
        if(!existsCategory) throw new CustomError(`not exists in categories !`, 404)

        const data = await categoryModel_.updateOne({_id},{name:body.name},{new:true})
        return data
    }

    static async deleteItem(body) {
        if(!isId(body.id)) throw new CustomError("Invalid Id !", 400)
        
        const existsCategory  = await categoryModel_.findOne({_id:body.id})
        if(!existsCategory) throw new CustomError(`Category not found !`, 404)
        let _id = body.id
        await categoryModel_.deleteOne({_id})
        return {
            message:"Delted category successfull !"
        }
    }
    
}