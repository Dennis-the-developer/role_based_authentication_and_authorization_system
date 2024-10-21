import { Schema, model, Types } from "mongoose";

const userProfileSchema = new Schema({

    firstname: {type: String, default: " "},
    lastname: {type: String, default: " "},
    gender: {type: String, enum: ['male', 'female', 'other'], default: " "},
    phone: {type: String, default: " "},
    userId: {type: Types.ObjectId, ref: 'User'}

}, {
    timestamps: true,
})

export const UserProfileModel = model('UserProfile', userProfileSchema);