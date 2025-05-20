import { getToken } from "../../utils/token/tokens.js";

export default function (req, res, next) {
        try {
            let data = getToken(req.user)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
}