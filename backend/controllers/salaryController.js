import { handleError } from "../middleware/errorHandler.js"
import Salary from "../models/Salary.js";





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
    const {id} = req.params;
    try {
        const salary = await Salary.find({employeeId:id}).populate('employeeId','employeeId');
        if (!salary){
            return handleError(res, new Error("salary not found"), 400);
        }

        return res.status(201).json({ success: true, salary });

    } catch (error) {
         return handleError(res, error);
    }
}
