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