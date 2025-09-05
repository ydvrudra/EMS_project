import multer from "multer";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";
import path from "path";
import { handleError } from "../middleware/errorHandler.js";



const storage = multer.diskStorage({
    destination : ( req, file, cb ) => {
        cb(null, 'public/uploads')
    },
    filename : (req, file, cb) => {
        cb (null, Date.now() + path.extname(file.originalname))
    }
});

export const upload = multer({ storage: storage});



export const addEmployee = async (req,res) => {
    try {
        const {
          name,
          email,
          employeeId,
          dob,
          gender,
          maritalStatus,
          designation,
          department,
          salary,
          password,
          role
    } = req.body;


    if (!email || !password) {
         return handleError(res, new Error("Email and password are required"), 400);
        }

    const user = await User.findOne({ email }).select("+password");
    if(user){
        return handleError(res, new Error("user Already registered in emp"), 409);
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename  : ""
            
        });

       const saveUser =  await newUser.save();

       const newEmployee = new Employee({
        userId:saveUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary
       })
       await newEmployee.save();

        res.status(201).json({ success:true , message: "Employee registered successfully", user: saveUser });
        
    } catch (error) {
       return handleError(res, error); 
    }

};