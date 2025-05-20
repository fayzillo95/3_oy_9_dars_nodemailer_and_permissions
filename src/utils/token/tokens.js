import JWT from "jsonwebtoken"

export const getToken = (payload) => {
    const accessToken = JWT.sign(payload,process.env.JWT_ACCESS_KEY,{expiresIn:'4h'})
    const refreshToken = JWT.sign(payload,process.env.JWT_REFRESH_KEY, {expiresIn:'24h'})
    return {
        success:true,
        accessToken,refreshToken
    }
}
const refreshUrl = `http://${process.env.HOST}:${process.env.PORT}/refresh`

export const getUrl = (payload) => {
    const accessToken = JWT.sign(payload,process.env.JWT_ACCESS_KEY,{expiresIn:'10h'})
    let url = `http://${process.env.HOST}:${process.env.PORT}/api/verfy/${accessToken}`
    return url
}
export const getrefUrl = (payload) => {
    const accessToken = JWT.sign(payload,process.env.JWT_ACCESS_KEY,{expiresIn:'10d'})
    let url = `http://${process.env.HOST}:${process.env.PORT}/api/refreshtoken/${accessToken}`
    return url
}