import mongoose from "mongoose";
import { Schema } from "mongoose";


const leaveSchema = new mongoose.Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    leaveType: {
         type:String,
         enum: ["Sick Leave" , "Casual Leave" , "Annual Leave"],
         require: true},
    startDate: {type: Date, require:true },
    endDate: {type: Date, require:true  },
    reason: {type: String, require:true},
    status:{
        type:String,
        enum:["Pending", "Approved", "Rejected"],
        default:"Pending",
    },
    appliedAt: {type: String, default: Date.now},
    updatedAt: {type: String, default: Date.now},
})

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;

