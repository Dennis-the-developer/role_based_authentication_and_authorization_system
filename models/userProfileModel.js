import { Schema, model, Types } from "mongoose";

const userProfileSchema = new Schema({

    firstname: {type: String},
    lastname: {type: String},
    gender: {type: String, enum: ['male', 'female', 'other']},
    phone: {type: String},
    userId: {type: Types.ObjectId, ref: 'User'}

}, {
    timestamps: true,
})

export const UserProfileModel = model('UserProfile', userProfileSchema);