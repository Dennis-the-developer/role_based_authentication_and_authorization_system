import { Router } from "express";
import { Register, Login, AssignRole, DeleteUser, ViewPublicData } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authn.js";
import { hasPermission } from "../middlewares/authz.js";

const userRouter = Router();

userRouter.post('/auth/register', isAuthenticated, hasPermission("createUser"), Register);
userRouter.post('/auth/login', isAuthenticated, Login);
userRouter.post('/auth/oauth/dicord/redirect', Login);
userRouter.post('/auth/assign-role', isAuthenticated, hasPermission("assignRole"), AssignRole);
userRouter.delete('/user/:id', isAuthenticated, hasPermission("deleteUser"), DeleteUser);
userRouter.get('/public-data', ViewPublicData);

export default userRouter;