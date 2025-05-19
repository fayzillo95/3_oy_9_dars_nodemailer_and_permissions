import JWT from "jsonwebtoken"

export const getToken = (payload) => {
    const accessToken = JWT.sign(payload,process.env.JWT_ACCESS_KEY,{expiresIn:'4h'})
    const refreshToken = JWT.sign(payload,process.env.JWT_REFRESH_KEY, {expiresIn:'24h'})
    return {
        success:true,
        accessToken,refreshToken
    }
}

export const getUrl = (payload) => {
    const accessToken = JWT.sign(payload,process.env.JWT_ACCESS_KEY,{expiresIn:'10m'})
    let url = `https://three-oy-9-dars-nodemailer-and.onrender.com/api/${accessToken}`
    return url
}
export const getrefUrl = (payload) => {
    const accessToken = JWT.sign(payload,process.env.JWT_ACCESS_KEY,{expiresIn:'10d'})
    let url = `https://three-oy-9-dars-nodemailer-and.onrender.com/api/${accessToken}`
    return url
}