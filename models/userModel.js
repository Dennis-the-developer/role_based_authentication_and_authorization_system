import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({

    email: {type: string, unique: true, required: true},
    username: {type: string, unique: true, required: true},
    password: {type: string},
    userProfileId: {type: Types.object, ref: 'UserProfile'},
    role: {type: string, enum: ['admin', 'user', 'guest']},
    userProfileId: {type: Types.ObjectId, ref: 'UserProfile'}

}, {
    timestamps: true,
})

export const UserModel = model('User', userSchema);