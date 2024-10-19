import Joi from "joi";

export const UserProfileValidator = Joi.object({

    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    phone: Joi.string(),
    role: Joi.string().valid('Admin', 'User', 'Guest'),

})