//backend/models
import mongoose, { now } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String , require: true},
    email: {type: String , require: true},
    password: {type: String , require: true },
    role: {type: String , enum: ['admin', 'employee'], default: "admin" },
    profileImage: {type: String},
    createAt: {type: String, default: Date.now},
    updatedAt: {type: String, default: Date.now},

})

const User = mongoose.model("User", userSchema);
export default User; 