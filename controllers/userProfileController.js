import { UserModel } from "../models/userModel.js";
import { UserProfileModel } from "../models/userProfileModel.js";
import { UserProfileValidator } from "../schemas/userProfileSchema.js";

// Get user profile
export const GetProfile = async (req, res, next) => {
    try {
        const userId = req?.user?.id;
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(401).send("User not found");
        }
        const userProfile = await UserModel.findById(userId).populate('otherDetails').lean();
        return res.status(200).json({
            profile: {
                email: userProfile.email,
                username: userProfile.username,
                role: userProfile.role,
                firstname: userProfile.otherDetails.firstname,
                lastname: userProfile.otherDetails.lastname,
                gender: userProfile.otherDetails.gender,
                phone: userProfile.otherDetails.phone
            },
        })
    } catch (error) {
        next(error);
    }
}

// Update user profile
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
        const updatedProfile = await UserProfileModel.findOneAndUpdate({userId}, value, {new: true});
        return res.status(200).json({
            message: "Profile updated successfully",
            updatedProfile: updatedProfile
        })
    } catch (error) {
        next(error);
    }
}