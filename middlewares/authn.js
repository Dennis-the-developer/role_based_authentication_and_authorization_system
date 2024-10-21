import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
                const user = await UserModel.findById(req.user.id);
                if (!user){
                    return res.status(401).send('User not found');
                }
                next();
            } catch (error) {
                res.status(401).send(error);
                console.log(error);
            }
        }
        else {
            res.status(401).send("Not Authenticated");
        }
    } catch (error) {
        next(error);
    }
}