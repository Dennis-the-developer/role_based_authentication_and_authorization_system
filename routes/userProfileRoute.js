import { Router } from "express";
import {GetProfile, UpdateProfile  } from "../controllers/userProfileController.js";
import { isAuthenticated } from "../middlewares/authn.js";
import { hasPermission } from "../middlewares/authz.js";

const userProfileRouter = Router();

userProfileRouter.get('/profile', isAuthenticated, hasPermission("readOwnProfile"), GetProfile);
userProfileRouter.put('/profile', isAuthenticated, hasPermission("updateOwnProfile"), UpdateProfile);

export default userProfileRouter;