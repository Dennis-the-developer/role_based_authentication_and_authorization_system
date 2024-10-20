import { UserModel } from "../models/userModel.js";
import { UserProfileModel } from "../models/userProfileModel.js";
import { AuthValidator, RegisterUserValidator, AssignRoleValidator, UserValidator, CreateAdminValidator } from "../schemas/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Create an admin
export const CreateAdmin = async(req, res, next) => {
    try {
        const {error, value} = CreateAdminValidator.validate(req.body);

        if(error){
            return res.status(400).send(error.details[0].message);
        }

        const {email, password} = value;
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(401).send('Admin already exist');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        value.password = hashedPassword;
        const newUser = await UserModel.create(value);
        await UserProfileModel.create({userId: newUser.id});
        return res.status(201).send('Admin created successfully');

    } catch (error) {
        next(error);
    }
}

// Register users
export const Register = async(req, res, next) => {
    try {
        const {error, value} = RegisterUserValidator.validate(req.body);

        if(error){
            return res.status(400).send(error.details[0].message);
        }

        const {email, password} = value;

        const user = await UserModel.findOne({email});
        if(user){
            return res.status(401).send('User already exist');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        value.password = hashedPassword;
        const newUser = await UserModel.create(value);
        await UserProfileModel.create({userId: newUser.id});
        return res.status(201).send('User registered successfully');

    } catch (error) {
        next(error);
    }
}

// Login user
export const Login = async (req, res, next) => {
    try {
        const {error, value} = AuthValidator.validate(req.body);
        if (error){
            return res.status(400).send(error.details[0].message);
        }
        const {email, username, password} = value;
        const user = await UserModel.findOne({
            $or: [
                {email: email},
                {username: username}
            ]
        });
        if (!user) {
            return res.status(401).send("No user found");
        }
        //If you user is found, verify password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword){
            return res.status(401).send("Invalid credentials");
        }
        // Generate token
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '1h'}
        );
        // Return response
        res.status(201).json({
            message: "Login successful",
            accessToken: token,
            user: user
        })
    } catch (error) {
        next(error);
    }
}

// Assign role to user
export const AssignRole = (req, res, next) => {
    try {
        const {error, value} = AssignRoleValidator.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const {email, username, newRole} = value;
        const query = {
            $or: [
                {email: email},
                {username: username}
            ]
        }
        UserModel.findOneAndUpdate(query, {
            role: newRole
        }, options)
    } catch (error) {
        next(error);
    }
}

// Delete user
export const DeleteUser = (req, res, next) => {
    try {
        const {error, value} = UserValidator.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const {email, username} = value;
        const query = {
            $or: [
                {email: email},
                {username: username}
            ]
        }
        UserModel.findOneAndDelete(query);
        return res.status(200).send("User deleted successfully");
    } catch (error) {
        next(error);
    }
}

// Show data that can be viewed by users of any role
export const ViewPublicData = async (req, res, next) => {
    try {
        const publicData = await UserProfileModel.find({}, 'firstname lastname gender phone -_id').exec();
        if(publicData.length == 0){
            return res.status(404).send("No public data to view");
        }
        return res.status(200).json({
            publicData: publicData
        })
    } catch (error) {
        next(error);
    }
}