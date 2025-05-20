import Joi from "joi";
import { Schema } from "mongoose";
import { actions as methods, models } from "../componentes/collection.componentes_.js";


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
        return loginSchema.validate(payload)
    }
    static permissionValidation(payload) {
        const permitionSchema = Joi.object({
            user_id:Joi.string().min(24).max(24).required(),
            actions:Joi.string().valid(...methods).required(),
            model:Joi.string().valid(...models).required()
        })
        return permitionSchema.validate(payload,{ abortEarly: false })
    }
}