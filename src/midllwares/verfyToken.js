import JWT from "jsonwebtoken"
import AuthorizationError from "../utils/errors/AuthorizationErrror_.js"

export const verfyToken  = (req, res, next) => {
        try {
            const token = req.params.token
            req.user = JWT.verify(token, process.env.JWT_ACCESS_KEY)
            next()
        } catch (error) {
            error.status = 401
            next(error)
        }
    }

