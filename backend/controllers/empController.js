import User from "../models/User.js";
import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";
import fs from 'fs';
import path from 'path';

import { handleError } from "../middleware/errorHandler.js";




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



export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId',{password:0 }).populate('department');
       return res.status(201).json({ success: true, employees });
    } catch (error) {
        handleError(res, error);
    }
}


export const getEmployeebyId = async (req, res) => {
    const {id} = req.params;
    try {
        const employee = await Employee.findById({_id:id}).populate('userId',{password:0 }).populate('department');
        if (!employee){
            return handleError(res, new Error("Employee not found"), 400);
        }
        return res.status(201).json({ success: true, employee });

    } catch (error) {
         return handleError(res, error);
    }
}


export const UpdateEmployeebyId = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return handleError(res, new Error("Employee not found"), 400);
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return handleError(res, new Error("User not found"));
    }

    // ✅ Purani image delete karna agar nayi image aayi hai
    if (req.file && user.profileImage) {
      const oldImagePath = path.join('public/uploads', user.profileImage);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Old image delete error:", err);
      });
    }

    // ✅ Update user with new data + image
    const updatedUserData = { name };
    if (req.file) {
      updatedUserData.profileImage = req.file.filename;
    }

    const updateUser = await User.findByIdAndUpdate(
      employee.userId,
      updatedUserData,
      { new: true }
    );

    // ✅ Update employee info
    const updateEmp = await Employee.findByIdAndUpdate(
      id,
      { maritalStatus, salary, designation, department },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      user: updateUser,
      employee: updateEmp,
    });

  } catch (error) {
    return handleError(res, error);
  }
};


export const fetchEmployeesByDeptId = async (req, res) => {
    const {id} = req.params;
    try {
        const employees = await Employee.find({department:id})
        if (!employees){
            return handleError(res, new Error("Employee not found"), 400);
        }
        return res.status(201).json({ success: true, employees });

    } catch (error) {
         return handleError(res, error);
    }
}