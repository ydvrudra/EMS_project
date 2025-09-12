import { handleError } from "../middleware/errorHandler.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";




export const AddLeave = async (req, res) => {
    try {
        const { userId ,leaveType,startDate,endDate,reason } = req.body;

        const employee = await Employee.findOne({userId});

        if (!employee) {
          return res.status(404).json({ success: false, message: "Employee not found" });
         }

        const newLeave = await Leave({
            employeeId:employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await newLeave.save();

      return res.status(201).json({ success: true, message: "Leave created successfully" });

    } catch (error) {
        handleError(res,error)
    }
}

export const getLeaveById = async (req, res) => {
    try {
        const {id} = req.params;

        const employee = await Employee.findOne({userId:id})

        const leaves = await Leave.find({employeeId:employee._id});

        
        return res.status(201).json({ success: true, leaves });

    } catch (error) {
         return handleError(res, error);
    }
}


export const getAllLeave = async (req, res) => {
    try {

        const leaves = await Leave.find().populate({
            path:"employeeId",
            populate:[
                {
                path: 'department',
                select: 'dep_name',
                },
                {
                    path:'userId',
                    select:'name'
                }
            ]
        });
        return res.status(201).json({ success: true, leaves });

    } catch (error) {
         return handleError(res, error);
    }
}

export const getLeaveDetail = async (req, res) => {
    try {
        const {id} = req.params;

        const leave = await Leave.findById({_id:id}).populate({
            path:"employeeId",
            populate:[
                {
                path: 'department',
                select: 'dep_name',
                },
                {
                    path:'userId',
                    select:'name , profileImage'
                }
            ]
        });
        return res.status(201).json({ success: true, leave });

    } catch (error) {
         return handleError(res, error);
    }
}