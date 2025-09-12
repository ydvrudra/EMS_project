import { handleError } from "../middleware/errorHandler.js"
import User from "../models/User.js";
import bcrypt from 'bcrypt';



export const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Find the user by userId
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Compare old password
        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            return res.status(400).json({ success: false, message: "Wrong old password" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in the database
        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            { password: hashedPassword },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(500).json({ success: false, message: "Failed to update password" });
        }

        return res.status(200).json({ success: true, updatedUser: updatedUser });
    } catch (error) {
        console.log(error); 
        return res.status(500).json({ success: false, message: "Server error" });
    }
};



