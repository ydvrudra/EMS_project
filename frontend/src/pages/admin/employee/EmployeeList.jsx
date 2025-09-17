import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { columns,EmployeeButtons } from "./EmpHelper"
import { useEffect } from "react";
import { useState } from "react";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";
import MetaData from "../../../components/MetaData";
import axiosInstance from "../../../api/axiosInstance";

const EmployeeList = () => {

  const [employees, setemployees] = useState([]);
  const [empLoading, setEMpLoading] = useState(false);
  const [searchEMpName, setSearchEmpName] = useState([]);


      // const onFilterDepartment = (id) => {
      //         const depData = employees.filter((item) => item._id !== id);
      //         setemployees(depData);
      //     }
      
      
          const handleFilter = (e) => {
              const record = employees.filter((emp) => emp.name.toLowerCase().includes(e.target.value.toLowerCase()) )
              setSearchEmpName(record);
          }
      
          useEffect(() => {
              const fetchemployees = async () => {
                  setEMpLoading(true);
                  try {
                      const res = await axiosInstance.get("/api/employee", {
                          headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`
                          }
                      });
                      if (res.data.success) {
                          let sno = 1;
                          const data = await res.data.employees.map((emp) => ({
                              
                              _id: emp._id,
                              sno: sno++,
                              dep_name: emp.department.dep_name,
                              name: emp.userId.name,
                              dob: new Date(emp.dob).toLocaleDateString(),
                              profileImage:  <img width={40} className="rounded-full" src={`/${emp.userId?.profileImage}`}/>,
                              action:( <EmployeeButtons id = { emp._id }/>)
                          }))
                          
                          setemployees(data);
                          setSearchEmpName(data)
                          //console.log("All employees", res.data.employees);
                      }
                  } catch (error) {
                      showToastError(error)
      
                  }
                  finally {
                      setEMpLoading(false);
                  }
              };
              fetchemployees();
          },[]);

           if (empLoading) {
              return <Loader />;
            }
          

    return(
        <>
        <MetaData title = "Employee List"/>
        <div className="p-5 mx-auto w-96 sm:w-full">
          <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between  items-center space-x-4 mt-4">
        <input 
             type="text" 
             onChange={handleFilter}
             placeholder="Search by Emp.name" 
             className="px-4 py-1 bg-white shadow border" />
        <Link to="/admin-dashboard/add-employee" className="px-4 py-1 text-[8px] sm:text-xl bg-teal-600 hover:bg-teal-800 text-white rounded">Add New Employee
        </Link>
         </div>

         <div className="">
                 <DataTable
                 columns={columns}
                 data={searchEMpName} 
                 pagination
                 />
               </div>
        </div>
        </>
    )
};

export default EmployeeList;