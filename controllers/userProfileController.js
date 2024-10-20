import { UserModel } from "../models/userModel.js";
import { UserProfileModel } from "../models/userProfileModel.js";
import { UserProfileValidator } from "../schemas/userProfileSchema.js";

export const GetProfile = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(401).send("User not found");
        }
        const userProfile = await UserModel.findById(userId).populate({path: "UserProfile"});
        return res.status(200).json({
            userProfile
        })
    } catch (error) {
        next(error);
    }
}

export const UpdateProfile = async (req, res, next) => {
    try {
        const {error, value} = UserProfileValidator.validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(401).send("User not found");
        }
        const updatedProfile = await UserProfileModel.findByIdAndUpdate(userId, value, {new: true});
        return res.status(200).json({
            message: "Profile updated successfully",
            updatedProfile: updatedProfile
        })
    } catch (error) {
        next(error);
    }
}