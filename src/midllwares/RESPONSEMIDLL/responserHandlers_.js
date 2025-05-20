export default function responseHandlers(req, res, next){
    try {
        res.status(req.user.status || 200).json(req.user)
    } catch (error) {
        next(error)
    }
}