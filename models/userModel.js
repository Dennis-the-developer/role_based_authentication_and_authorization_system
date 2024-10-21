import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({

    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'user', 'guest'], default: 'guest'},
    userProfileId: {type: Types.ObjectId, ref: 'UserProfile'}

}, {
    timestamps: true,
})

export const UserModel = model('User', userSchema);