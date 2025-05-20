import JWT from "jsonwebtoken"
import AuthorizationError from "../../utils/errors/AuthorizationErrror_.js"

export const verfyToken = (req, res, next) => {
    try {
        const token = req.params.token
        const clientAgent = req.headers['user-agent']

        const decoded = JWT.verify(token, process.env.JWT_ACCESS_KEY)

        if (decoded.agent && decoded.agent != clientAgent) {
            throw new AuthorizationError("User-Agent mismatch", 406)
        }
        req.user = {
            _id: decoded._id,
            isverfy: decoded.isverfy,
            role: decoded.role,
            agent: decoded.agent
        }
        next()
    } catch (error) {
        error.status = error.status || 401
        next(error)
    }
}
