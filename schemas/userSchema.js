import Joi from "joi";

export const CreateAdminValidator = Joi.object({

    email: Joi.string().email().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().lowercase().valid('admin').default('admin')
})

export const RegisterUserValidator = Joi.object({
    
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    role: Joi.string().lowercase().valid('admin', 'user', 'guest')
}) 

export const AuthValidator = Joi.object({

    email: Joi.string().email().default(''),
    username: Joi.string().alphanum().default(''),
    password: Joi.string(),
})

export const AssignRoleValidator = Joi.object({

    email: Joi.string().email().default(''),
    username: Joi.string().alphanum().default(''),
    newRole: Joi.string().lowercase().valid('admin', 'user', 'guest').required()
})

export const UserValidator = Joi.object({

    email: Joi.string().email().default(''),
    username: Joi.string().alphanum().default(''),
})