import JWT from "jsonwebtoken"
import AuthorizationError from "../utils/errors/AuthorizationErrror_.js"

export const checkToken = () => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new AuthorizationError("Token not provided",401)
            }
            const token = authHeader.split(" ")[1]
            try {
                req.user = JWT.verify(token, process.env.JWT_ACCESS_KEY)
            } catch (error) {
                req.user = JWT.verify(token, process.env.JWT_REFRESH_KEY)
            }
            next()
        } catch (error) {
            error.status = 401
            next(error)
        }
    }
}
