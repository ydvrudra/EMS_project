import { handleError } from "../middleware/errorHandler.js"
import Salary from "../models/Salary.js";
import Employee from '../models/Employee.js';





export const AddSalary = async (req, res) => {
    try {
        const { employeeId ,basicSalary,allowances,deductions,payDate } = req.body;

        const totalSalary  = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        const newSalary = await Salary({
            employeeId ,
            basicSalary,
            allowances,
            deductions,
            netSalary:totalSalary,
            payDate 
        });

        await newSalary.save();

      return res.status(201).json({ success: true, message: "salary created successfully" });

    } catch (error) {
        handleError(res,error)
    }
}


export const getSalaryById = async (req, res) => {
    const {id,role} = req.params;
    try {
        let salary;
        if(role === 'admin'){
             salary = await Salary.find({employeeId:id}).populate('employeeId');
        }
        else {
            const employee = await Employee.findOne({userId:id})
             if (employee) {
                salary = await Salary.find({ employeeId: employee._id }).populate('employeeId');
            }
        }

         if (!salary || salary.length === 0) {
            return res.status(404).json({ success: false, message: 'Salary not found' });
        }

        return res.status(201).json({ success: true, salary });

    } catch (error) {
         return handleError(res, error);
    }
}
