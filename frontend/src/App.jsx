import React from 'react';
import './App.css'
import {  BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import { Toaster } from "react-hot-toast";  
import EmployeeDashboard from './pages/employ/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RolebasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './pages/admin/AdminSummary';
import DepartmentList from './pages/admin/department/DepartmentList';
import AddDepartment from './pages/admin/department/AddDepartment';
import EditDepartment from './pages/admin/department/EditDepartment';
import EmployeeList from './pages/admin/employee/EmployeeList';
import AddEmployee from './pages/admin/employee/AddEmployee';




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
        {/* departments Routes */}
         <Route path='/admin-dashboard/departments' element={<DepartmentList/>}/>
         <Route path='/admin-dashboard/add-department' element={<AddDepartment/>}/>
         <Route path='/admin-dashboard/department/:id' element={<EditDepartment/>}/>

         {/* employee Routes */}
         <Route path = '/admin-dashboard/employees' element = {<EmployeeList/>} /> 
         <Route path = '/admin-dashboard/add-employee' element = {<AddEmployee/>} />
          </Route>

      <Route path='/employee-dashboard'  element = { <EmployeeDashboard/> }/>
    </Routes>
   </Router>
    <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
