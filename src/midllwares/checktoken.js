import JWT from "jsonwebtoken"
import AuthorizationError from "../utils/errors/AuthorizationErrror_.js"

export const checkToken = () => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new AuthorizationError("Token not provided", 401)
            }

            const token = authHeader.split(" ")[1]
            const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            const clientAgent = req.headers['user-agent']

            let decoded
            try {
                decoded = JWT.verify(token, process.env.JWT_ACCESS_KEY)
            } catch (error) {
                decoded = JWT.verify(token, process.env.JWT_REFRESH_KEY)
            }

            if (decoded.ip && decoded.ip !== clientIP) {
                throw new AuthorizationError("IP address mismatch", 406)
            }

            if (decoded.agent && decoded.agent !== clientAgent) {
                throw new AuthorizationError("User-Agent mismatch", 406)
            }

            req.user = decoded
            next()
        } catch (error) {
            error.status = error.status || 401
            next(error)
        }
    }
}
