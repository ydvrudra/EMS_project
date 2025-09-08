import React from 'react';
import './App.css'
import {  BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import { Toaster } from "react-hot-toast";  


import PrivateRoutes from './utils/PrivateRoutes';
import RolebasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './pages/admin/AdminSummary';
import DepartmentList from './pages/admin/department/DepartmentList';
import AddDepartment from './pages/admin/department/AddDepartment';
import EditDepartment from './pages/admin/department/EditDepartment';
import EmployeeList from './pages/admin/employee/EmployeeList';
import AddEmployee from './pages/admin/employee/AddEmployee';
import EditEmployee from './pages/admin/employee/Editemployee';
import ViewEmployee from './pages/admin/employee/ViewEmployee';
import AddSalary from './pages/admin/salary/AddSalary';
import ViewSalary from './pages/admin/salary/ViewSalary';

// emp dashboard pages
import EmpDashboard from './pages/employ/EmplDashboard';
import EmpSummary from './pages/employ/EmpSummary';
import ViewEmpProfile from './pages/employ/VIewEmpProfile';
import EmpLeavesList from './pages/employ/leaves/EmpLeavesList';
import AddEmpLeave from './pages/employ/leaves/AddEmpLeave';
import ViewEmpSalary from './pages/employ/salary/ViewEmpSalary';




function App() {

  return (
    <>
   <Router>
    <Routes>
      <Route path='/' element = { <Navigate to='/admin-dashboard'/> }/>
      <Route path='/register' element = {<Register/>}/>
      <Route path='/login' element = {<Login/>}/>

      <Route path='/admin-dashboard'  element = {
        <PrivateRoutes>
          <RolebasedRoutes RequiredRole={["admin"]}>
            <AdminDashboard/>
          </RolebasedRoutes>
        </PrivateRoutes>
          }>
        <Route index element={<AdminSummary/>}></Route>

        {/* departments admin Routes */}
         <Route path='/admin-dashboard/departments' element={<DepartmentList/>}/>
         <Route path='/admin-dashboard/add-department' element={<AddDepartment/>}/>
         <Route path='/admin-dashboard/department/:id' element={<EditDepartment/>}/>

         {/* employee admin Routes */}
         <Route path = '/admin-dashboard/employees' element = {<EmployeeList/>} /> 
         <Route path = '/admin-dashboard/add-employee' element = {<AddEmployee/>} />
         <Route path='/admin-dashboard/employees/:id' element={<ViewEmployee/>}/>
         <Route path='/admin-dashboard/employee/edit/:id' element={<EditEmployee/>}/>

         {/* salary admin Routes */}
         <Route path = '/admin-dashboard/salary/add-salary' element = {<AddSalary/>} />
         <Route path = '/admin-dashboard/employees/salary/:id' element = {<ViewSalary/>} />
          </Route>



      {/* emp routes */}
      <Route path='/employee-dashboard'  element = { 
        <PrivateRoutes>
          <RolebasedRoutes RequiredRole={["admin", "employee"]}>
          <EmpDashboard/>
          </RolebasedRoutes>
        </PrivateRoutes>
         }>
         <Route index element={<EmpSummary/>}></Route>
         <Route path='/employee-dashboard/profile/:id' element = { <ViewEmpProfile/>}/>
          
         {/* emp leaves routes */}
         <Route path='/employee-dashboard/leaves' element = { <EmpLeavesList/>}/> 
         <Route path='/employee-dashboard/add-leave' element = { <AddEmpLeave/>}/> 

         {/* emp salary route */}
         <Route path='/employee-dashboard/salary/:id' element = { <ViewEmpSalary/>}/> 
         </Route>
    </Routes>
   </Router>
    <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
