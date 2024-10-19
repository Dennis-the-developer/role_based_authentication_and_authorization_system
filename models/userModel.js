import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({

    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String},
    userProfileId: {type: Types.object, ref: 'UserProfile'},
    role: {type: String, enum: ['admin', 'user', 'guest']},
    userProfileId: {type: Types.ObjectId, ref: 'UserProfile'}

}, {
    timestamps: true,
})

export const UserModel = model('User', userSchema);