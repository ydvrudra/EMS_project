//backend/userController.js

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { handleError } from "../middleware/errorHandler.js";



// user register function 
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
             return handleError(res, new Error("User already exists"), 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            
        });

        await newUser.save();

     res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        handleError(res, error)
    }
};


export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user || !user.password || !await bcrypt.compare(password, user.password)) {
             return handleError(res, new Error("Invalid email or password"), 400);
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "5d" }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
            }
        });
    } catch (error) {
        return handleError(res, error);
    }
};


export const verify = (req, res) => {
    res.status(200).json({ success: true, user: req.user });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return handleError(res, new Error("User not found"), 404);
        }
        // Generate reset token (simplified, in production use proper token generation)
        const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        // Here you would send email with reset link
        // For now, just return success
        res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
        return handleError(res, error);
    }
}

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded._id);
        if (!user) {
            return handleError(res, new Error("Invalid token"), 400);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        return handleError(res, error);
    }
}
