import Joi from "joi";

export default class CustomValidation {
    constructor() {}
    static registerValidation (payload) {
        const registerSchema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().min(8).max(32).required(),
            fullname:Joi.string().pattern(/^[A-Z][a-z]{1,}(?: [A-Z][a-z]{1,})*$/).max(255).required()
        })
        return registerSchema.validate(payload)
    }
    static loginValidation (payload) {
        const loginSchema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().min(8).max(32).required()
        })
    }
}