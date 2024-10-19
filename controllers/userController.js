import { UserModel } from "../models/userModel.js";
import { AuthValidator, UserValidator } from "../schemas/userSchema.js";
import bcrypt from 'bcrypt';

export const Register = async(req, res, next) => {
    try {
        const {error, value} = UserValidator.validate(req.body);

        if(error){
            return res.status(400).send(error.details[0].message);
        }

        const {email, password} = value;

        const user = await UserModel.findOne({email});
        if(user){
            return res.status(401).send('User already exist');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        password = hashedPassword;
        await UserModel.create(value);
        return res.status(201).send('User registered successfully');

    } catch (error) {
        next(error);
    }
}

// login user
export const login = async (req, res, next) => {
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
            {expiresIn: '72h'}
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
