import { use } from "react";
import User from "./models/User"
import bcrypt from "bcryptjs"


const userRegister = async () => {
    try {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin",
        })
        await newUser.save();
        console.log("Admin user created");
    } catch (error) {
        console.log(error);
    }
}
userRegister();