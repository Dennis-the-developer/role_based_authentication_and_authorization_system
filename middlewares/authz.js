import { roles } from "../config/userRoles.js";
import { UserModel } from "../models/userModel.js";

export const hasPermission = (permission) => {
    return async (req, res, next) => {
        try {
            const id = req?.user?.id;
            const user = await UserModel.findById(id);
            const userRole = roles.find(element => element.role === user.role);
            // Use user role to check if user has permission
            if (userRole && userRole.permissions.includes(permission)){
                next();
            }
            else {
                res.status(403).send("User Not Authorised");
            }
        } catch (error) {
            next(error);
        }
    }
}