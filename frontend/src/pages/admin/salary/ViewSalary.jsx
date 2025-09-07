import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showToastError } from "../../../utils/showToastError";
import Loader from "../../../components/Loader";
//import Loader from "../../../components/Loader";

const ViewSalary = () => {

    const [salaries, setSalaries] = useState([])
    const[filteredSalaries, setFilteredSalaries] = useState([]);

    const {id} = useParams();

    let sno = 1;
    

        const getSalaryById = async () => {
            try {
                // Fetch department details using the id
                const res = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                    setSalaries(res.data.salary);
                    setFilteredSalaries(res.data.salary);
                    console.log("salary getby id", res.data.salary);

                }
            } catch (error) {
               showToastError(error) 
            }
        };

        useEffect(() => {
            getSalaryById();
        },[]);


const filterSalary = (q) => {
    const filterRecord = salaries.filter((sal) => sal.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase()) )
    setFilteredSalaries(filterRecord);
}


  return (
    <>
    {filteredSalaries === null ? (
        <Loader/>
    ) : (
        <div className="overflow-x-auto p-5">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Salary History</h2>
            </div>
            <div className="flex justify-end my-3">
                <input 
                type="text" 
                className="border px-2 rounded border-gray-300 py-1"
                placeholder="Search by Emp. ID"
                onChange={filterSalary}
                 />
            </div>

            {filteredSalaries.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs uppercase text-gray-700 bg-gray-50 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">SSNO</th>
                             <th className="px-6 py-3">EMP ID</th>
                              <th className="px-6 py-3">SALARY</th>
                               <th className="px-6 py-3">ALLOWANCE</th>
                                <th className="px-6 py-3">DEDUCTION</th>
                                 <th className="px-6 py-3">TOTAL</th>
                                  <th className="px-6 py-3">PAYDATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary) => (
                                <tr key={salary.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-3">{sno++}</td>
                                    <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                    <td className="px-6 py-3">{salary.basicSalary}</td>
                                    <td className="px-6 py-3">{salary.allowances}</td>
                                    <td className="px-6 py-3">{salary.deductions}</td>
                                    <td className="px-6 py-3">{salary.netSalary}</td>
                                    <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                                </tr>
                    
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="">No Records Found</div>
            )}
        </div>
    )}
    </>
  )
}

export default ViewSalary;