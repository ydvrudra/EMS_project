import { handleError } from "../middleware/errorHandler.js";
import Department from "../models/Department.js";


export const addDepartment = async (req, res) => {
    
    try {
        const { dep_name, description } = req.body;

        if (!dep_name) {
            return handleError(res, new Error("Department name is required"), 400);
            
        }

        // 🔁 Check if department already exists
        const existing = await Department.findOne({ dep_name: dep_name.trim() });
        if (existing) {
            return handleError(res, new Error("Department already exists"), 409);
        }

        const newDepartment = new Department({
            dep_name: dep_name.trim(),
            description,
        });
        await newDepartment.save();

       return res.status(201).json({ success:true , department: newDepartment });

        
    } catch (error) {
       handleError(res, error);
    }
}


export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
       return res.status(201).json({ success: true, departments });
    } catch (error) {
        handleError(res, error);
    }
}


export const getDepartmentbyId = async (req, res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById({_id:id});
        if (!department){
            return handleError(res, new Error("Department not found"), 400);
        }
        return res.status(201).json({ success: true, department });

    } catch (error) {
         return handleError(res, error);
    }
}

export const UpdateDepartmentbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;
        const updatedept = await Department.findByIdAndUpdate({_id:id},{
            dep_name,
            description
        });
        if(!updatedept){
            return handleError(res, new Error("Department not found"), 400);
        }
        return res.status(201).json ({ success:true, message: "Department updated successdully", updatedept});

    } catch (error) {
         return handleError(res, error);
    }
}


export const deleteDepartmentbyId = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedept = await Department.findById({_id:id});
        await deletedept.deleteOne();
        if(!deletedept){
            return handleError(res, new Error("Department not found"), 400);
        }
        return res.status(201).json ({ success: true, message: "Department deleted successfully",deletedept });
    } catch (error) {
        return handleError(res, error);
    }
}
   