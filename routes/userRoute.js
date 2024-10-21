import { Router } from "express";
import passport from "passport";
import "../strategies/discordStrategy.js";
import { CreateAdmin, Register, Login, AssignRole, DeleteUser, ViewPublicData } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authn.js";
import { hasPermission } from "../middlewares/authz.js";

const userRouter = Router();

userRouter.post('/auth/create-admin', CreateAdmin);
userRouter.post('/auth/register', isAuthenticated, hasPermission("createUser"), Register);
userRouter.post('/auth/login', isAuthenticated, Login);
userRouter.get('/auth/oauth/discord-authorise', passport.authenticate('discord'));
userRouter.post('/auth/oauth/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.status(200).send("redirected");
});
userRouter.post('/auth/assign-role', isAuthenticated, hasPermission("assignRole"), AssignRole);
userRouter.delete('/user/:id', isAuthenticated, hasPermission("deleteUser"), DeleteUser);
userRouter.get('/public-data', ViewPublicData);

export default userRouter;