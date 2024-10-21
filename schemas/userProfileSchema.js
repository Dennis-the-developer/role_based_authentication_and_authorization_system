import Joi from "joi";

export const UserProfileValidator = Joi.object({

    firstname: Joi.string(),
    lastname: Joi.string(),
    gender: Joi.string().lowercase().valid('male', 'female', 'other'),
    phone: Joi.string(),
})