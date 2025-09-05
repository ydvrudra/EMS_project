import User from "../models/User.js";
import jwt from 'jsonwebtoken';

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findById(decoded._id).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('verifyUser error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default verifyUser;
