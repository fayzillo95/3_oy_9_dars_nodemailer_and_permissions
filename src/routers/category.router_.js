import { Router } from "express";
import { checkToken } from "../midllwares/TOKENMIDLL/checktoken.js";
import checkPermision from "../midllwares/AUTH/checkPermission_.js";
import CategoryControler from "../controller/Categoriy.Controller_.js";
import responseHandlers from "../midllwares/RESPONSEMIDLL/responserHandlers_.js";

const categoryRouter = Router()

categoryRouter.get("/category", checkToken, checkPermision, CategoryControler.getCategories, responseHandlers)
categoryRouter.post("/add/category", checkToken, checkPermision, CategoryControler.createCategory, responseHandlers)
categoryRouter.put("/update/category", checkToken, checkPermision, CategoryControler.updateCategory, responseHandlers)
categoryRouter.delete("/delete/category", checkToken, checkPermision, CategoryControler.removeCategory, responseHandlers)
export default categoryRouter