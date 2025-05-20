import JWT from "jsonwebtoken"
import AuthorizationError from "../../utils/errors/AuthorizationErrror_.js"

export const checkToken = async (req, res, next) => {
        console.log(req.url)

        try {
            const authHeader = req.headers.authorization
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new AuthorizationError("Token not provided", 401)
            }

            const token = authHeader.split(" ")[1]

            const clientAgent = req.headers['user-agent']

            let decoded = JWT.verify(token, process.env.JWT_ACCESS_KEY)

            if (decoded.agent && decoded.agent !== clientAgent) {
                throw new AuthorizationError("Invalid user-agent !", 406)
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

