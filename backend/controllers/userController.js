//backend/userController.js

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { handleError } from "../middleware/errorHandler.js";
import { sendResetEmail, sendAdminResetNotification } from "../utils/emailService.js";



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

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send reset email
        await sendResetEmail(user.email, resetToken);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error) {
        return handleError(res, error);
    }
}

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return handleError(res, new Error("Invalid or expired token"), 400);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        return handleError(res, error);
    }
}

export const adminResetPassword = async (req, res) => {
    const { userId } = req.body;

    try {
        // Check if requester is admin
        if (req.user.role !== 'admin') {
            return handleError(res, new Error("Unauthorized"), 403);
        }

        const user = await User.findById(userId);
        if (!user) {
            return handleError(res, new Error("User not found"), 404);
        }

        // Generate a random password
        const newPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        // Send notification email
        await sendAdminResetNotification(user.email, newPassword);

        res.status(200).json({
            success: true,
            message: "Password reset successfully. New password sent to user's email.",
            newPassword: newPassword // Only for admin reference, don't send in production
        });
    } catch (error) {
        return handleError(res, error);
    }
}
