export default class AuthorizationError extends Error{
    constructor(message, status){
        super(message)
        this.status = status
    }
}