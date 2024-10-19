import { Schema, model, Types } from "mongoose";

const userProfileSchema = new Schema({

    firstname: {type: string},
    lastname: {type: string},
    gender: {type: string, enum: ['Male', 'Female', 'Other']},
    phone: {type: string},
    userId: {type: Types.ObjectId, ref: 'User'}

}, {
    timestamps: true,
})

export const UserProfileModel = model('UserProfile', userProfileSchema);