import JWT from "jsonwebtoken"
import AuthorizationError from "../utils/errors/AuthorizationErrror_.js"

export const verfyToken = (req, res, next) => {
    try {
        const token = req.params.token
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const clientAgent = req.headers['user-agent']

        const decoded = JWT.verify(token, process.env.JWT_ACCESS_KEY)
        console.log("Verfy token line 11 ",decoded)
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
