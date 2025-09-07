import mongoose from "mongoose";
import { Schema } from "mongoose";


const salarySchema = new mongoose.Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    basicSalary: {type: Number , require: true},
    allowances: {type: Number },
    deductions: {type: Number },
    netSalary: {type: Number},
    payDate: { type: Date, require:true },
    createdAt: {type: String, default: Date.now},
    updatedAt: {type: String, default: Date.now},
})

const Salary = mongoose.model("Salary", salarySchema);
export default Salary;

