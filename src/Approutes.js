// routesConfig.js
import React from 'react';
import Navbar from './components/Navbar';
import LoginForm from './LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import Portalsmain from './components/Portalsmain';
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Leaves from './pages/Leaves';
import MyProjects from './pages/MyProjects';
import HoursEntry from './pages/HoursEntry';
import BankDetails from './pages/BankDetails';
import UserProfile from './pages/UserProfile';
import DailyStatus from './pages/DailyStatus';
import FamilyDetails from './pages/FamilyDetails';
import WorkExperience from './pages/WorkExperience';
import PersonalDetails from './pages/PersonalDetails';
import EmergencyDetails from './pages/EmergencyDetails';
import Hrportal from './components/Hrportal';
import ExpertCreation from './pages/ExpertCreation';
import ExpertPage from './pages/ExpertPage';
import LeaveBank from './pages/LeaveBank';
import LeaveRequests from './pages/LeaveRequests';
import ExpertWeeklyStatus from './pages/ExpertWeeklyStatus';
import ExpertMothlyStatus from './pages/ExpertMothlyStatus';
import ExpertAttendenceList from './pages/ExpertAttendenceList';
import ExpertMonthlyAttendenceList from './pages/ExpertMonthlyAttendenceList';
import ExpertCertificateVarification from './pages/ExpertCertificateVarification';
import ExpertReleavingData from './pages/ExpertReleavingData';
import ExpertPerformanceAppraisals from './pages/ExpertPerformanceAppraisals';
import ExpertDmerits from './pages/ExpertDmerits';
import ProficiencyMangement from './pages/ProficiencyMangement';
import ProjectsMangement from './pages/ProjectsMangement';
import HolidaysMangement from './pages/HolidaysMangement';
import PayslipMangement from './pages/PayslipMangement';
import BirthdaysMangement from './pages/BirthdaysMangement';
import EventsMangement from './pages/EventsMangement';
import Gadgetsmangement from './pages/Gadgetsmangement';
import Requestsmangement from './pages/Requestsmangement';
import ExpertWiseEmergency from './pages/ExpertWiseEmergency';
import ExpertWisetFamily from './pages/ExpertWisetFamily';
import ExpertWiseSkills from './pages/ExpertWiseSkills';
import ExpertWiseExperience from './pages/ExpertWiseExperience';
import ExpertWisebankDetails from './pages/ExpertWisebankDetails';
import ExpertWiseProjects from './pages/ExpertWiseProjects';
import ExpertWiseLeaveBank from './pages/ExpertWiseLeaveBank';
const Approutes = () => (
    <Routes>
        <Route path="/" exact element={<Portalsmain />} />
        {/* <Route path="/login" exact element={<LoginForm />} /> */}
        <Route path="/emp" exact element={<Navbar />} >
          <Route path="/emp/profiles">
            <Route path="/emp/profiles/personaldetails" element={<PersonalDetails />} />
            <Route path="/emp/profiles/familydetails" element={<FamilyDetails />} />
            <Route path="/emp/profiles/emergencydetails" element={<EmergencyDetails />} />
            <Route path="/emp/profiles/userprofile" element={<UserProfile />} />
          </Route>
          <Route path="/emp/workandskills">
            <Route path="/emp/workandskills/workexperience" element={<WorkExperience />} />
            <Route path="/emp/workandskills/skills" element={<Skills />} />
          </Route>
          <Route path="/emp/tasks">
            <Route path="/emp/tasks/dailystatus" element={<DailyStatus />} />
            <Route path="/emp/tasks/hoursentry" element={<HoursEntry />} />
          </Route>
          <Route path="/emp/myprojects" element={<MyProjects />} />
          <Route path="/emp/bankdetails" element={<BankDetails />}/>
          <Route path="/emp/leaves" element={<Leaves />} />
        </Route>
        <Route path="/hr" exact element={<Hrportal />} >
        <Route path="/hr/experts">
        <Route path="/hr/experts/expertscreation" element={<ExpertCreation />} />
        <Route path="/hr/experts/expertpage" element={<ExpertPage/>} />
</Route>
<Route path="/hr/experts">
        <Route path="/hr/experts/expertscreation" element={<ExpertCreation />} />
        <Route path="/hr/experts/expertpage" element={<ExpertPage/>} />
        <Route path="/hr/experts/leaves/leavebank" element={<LeaveBank />} />
        <Route path="/hr/experts/leaves/leaverequests" element={<LeaveRequests />} />
        <Route path="/hr/experts/expertstatus/weeklystatus" element={<ExpertWeeklyStatus/>}/>
        <Route path="/hr/experts/expertstatus/mothlystatus" element={<ExpertMothlyStatus />} />
        <Route path="/hr/experts/attendence/attendencelist" element={<ExpertAttendenceList />} />
        <Route path="/hr/experts/attendence/monthlyattendencelist" element={<ExpertMonthlyAttendenceList />} />
        <Route path= "/hr/experts/certificate_verification" element={<ExpertCertificateVarification />} />
        <Route path= "/hr/experts/expert-releavingdata" element={<ExpertReleavingData />} />
        <Route path= "/hr/experts/performance_appraisals" element={<ExpertPerformanceAppraisals/>} />
        <Route path= "/hr/experts/dmerits" element={<ExpertDmerits/>} />
        <Route path= "/hr/experts/expertpage/personaldetails/:id" element={<Requestsmangement/>} />
        <Route path= "/hr/experts/expertpage/emergencydetails/:id" element={<ExpertWiseEmergency/>} />
        <Route path= "/hr/experts/expertpage/familydetails/:id" element={<ExpertWisetFamily/>} />
        <Route path= "/hr/experts/expertpage/skills/:id" element={<ExpertWiseSkills/>} />
        <Route path= "/hr/experts/expertpage/workexperience/:id" element={<ExpertWiseExperience/>} />
        <Route path= "/hr/experts/expertpage/bankdetails/:id" element={<ExpertWisebankDetails/>} />
        <Route path= "/hr/experts/expertpage/projects/:id" element={<ExpertWiseProjects/>} />
        <Route path= "/hr/experts/expertpage/leavebank/:id" element={<ExpertWiseLeaveBank/>} />

</Route>
 <Route path= "/hr/proficiency" element={<ProficiencyMangement/>} />
 <Route path= "/hr/projects" element={<ProjectsMangement/>} />
 <Route path= "/hr/holidays" element={<HolidaysMangement/>} />
 <Route path= "/hr/payslip" element={<PayslipMangement/>} />
 <Route path= "/hr/birthdays" element={<BirthdaysMangement/>} />
 <Route path= "/hr/schedules-events" element={<EventsMangement/>} />
 <Route path= "/hr/gadgets" element={<Gadgetsmangement/>} />
        </Route>
      </Routes>
);
export default Approutes;
