import joi from "joi";

export const singUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref("password")
})

export const singInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})