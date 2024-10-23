import { UserModel } from "../models/userModel.js";
import { UserProfileModel } from "../models/userProfileModel.js";
import {
  AuthValidator,
  RegisterUserValidator,
  AssignRoleValidator,
  UserValidator,
  CreateAdminValidator,
} from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create an admin
export const CreateAdmin = async (req, res, next) => {
  try {
    const { error, value } = CreateAdminValidator.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password } = value;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(401).send("Admin already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    value.password = hashedPassword;
    const newUser = await UserModel.create(value);
    const userProfile = await UserProfileModel.create({ userId: newUser.id });
    await UserModel.findByIdAndUpdate(newUser.id, {
      otherDetails: userProfile,
    });
    return res.status(201).send("Admin created successfully");
  } catch (error) {
    next(error);
  }
};

// Register users
export const Register = async (req, res, next) => {
  try {
    const { error, value } = RegisterUserValidator.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password } = value;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(401).send("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    value.password = hashedPassword;
    const newUser = await UserModel.create(value);
    const userProfile = await UserProfileModel.create({ userId: newUser.id });
    await UserModel.findByIdAndUpdate(newUser.id, {
      otherDetails: userProfile,
    });
    return res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const Login = async (req, res, next) => {
  try {
    const { error, value } = AuthValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { email, username, password } = value;
    const user = await UserModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!user) {
      return res.status(401).send("No user found");
    }
    //If you user is found, verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid credentials");
    }
    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });
    // Return response
    res.status(201).json({
      message: "Login successful",
      accessToken: token,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

// Assign role to user
export const AssignRole = async (req, res, next) => {
  try {
    const { error, value } = AssignRoleValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { email, username, newRole } = value;
    const query = {
      $or: [{ email: email }, { username: username }],
    };
    const user = await UserModel.findOne(query);
    const oldRole = user.role;
    const updatedUserDetails = await UserModel.findOneAndUpdate(
      query,
      {
        role: newRole,
      },
      { returnDocument: "after" }
    );
    return res.status(200).json({
      username: user.username,
      oldRole: oldRole,
      newRole: updatedUserDetails.role,
      message: "User role assigned successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const DeleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log(`UserId is ${userId}`);
    const user = await UserModel.findById(userId);
    console.log(`User is ${user}`);
    if (!user) {
        return res.status(400).send("User does not exist");
    }
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    return res.status(200).json({
        message: "User deleted successfully",
        deletedUser
    });
  } catch (error) {
    next(error);
  }
};

// Show data that can be viewed by users of any role
export const ViewPublicData = async (req, res, next) => {
  try {
    const userData = await UserModel.find(
      {},
      {
        role: 1,
        _id: 0,
      }
    )
      .populate({
        path: "otherDetails",
        select: "-_id firstname lastname"
      });
    if (userData.length == 0) {
      return res.status(404).send("No public data to view");
    }
    const publicData = userData.map((user) => ({
        firstname: user.otherDetails.firstname,
        lastname: user.otherDetails.lastname,
        role: user.role
    }))
    return res.status(200).json({
        publicData
    });
  } catch (error) {
    next(error);
  }
};
