import CategoryService from "../service/Category.Service_.js";

export default class CategoryControler{
    constructor(){}

    static async getCategories(req, res, next) {
        try {
            req.user = await CategoryService.getAll()
            next()
        } catch (error) {
            next(error)
        }
    }
    static async createCategory(req, res,next) {
        try {
            req.user = await CategoryService.addCategory(req.body)
            next()
        } catch (error) {
            next(error)
        }
    }
    static async updateCategory(req, res, next) {
        try {
            req.user = await CategoryService.updateItem(req.body)
            next()
        } catch (error) {
            next(error)
        }
    }
    static async removeCategory(req, res, next) {
        try {
            req.user = await CategoryService.deleteItem(req.body)
            next()
        } catch (error) {
            next(error)
        }
    }
}