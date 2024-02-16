import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import getUserReducer from './userReducer'
import createUserReducer from './createUserReducer'
import familyDetailsReducer from "./familyDetailsReducer";
import emergencyDetailsReducer from "./emergencyDetailsReducer";
import workExperienceDetailsReducer from "./workExperienceReducer";
import skillDetailsReducer from "./skillReducer";
import statusDetailsReducer from "./dailyStatusReducer";
import getCurrentWeekDetails from "./currentWeekReducer";
import bankDetailsReducer from "./bankDetailsReducer";
import leaveDetailsReducer from "./leaveDetailsReducer";
import myProjectsReducer from "./myProjectsReducer";
import userListReducer from "./usersListReducer";
import hoursEntryDetailsReducer from "./hoursDetailsReducer";
import getDashboardReducer from "./dashboardDetailsReducer";
import leaveBankReducer from "./LeaveBankReducer";
import allExpertrsReducer from "./AllExpertsReducer";
import getDashboardMangementReducer from "./dashboardMangmentDetailsReducer";
import dmeritsDetailsReducer from "./dmeritsDetailsReducer";
import performanceDetailsReducer from "./performanceReducer";
import ReleavingDetailsReducer from "./ExpertReleavingReducer";
import LeaveRequestDetailsReducer from "./ExpertLeaveRequestReducer";
import CertificateDetailsReducer from "./ExpertCertificateReducer";
import expertBirthdayDetailsReducer from "./ExpertBirthdayReducer";
import expertProjectDetailsReducer from "./ExpertProjectReducer";
import ExpertHolidayDetailsReducer from "./ExpertHolidayReducer";
import ExpertEventmanDetailsReducer from "./expertEventmanReducer";
import GadgetDetailsReducer from "./ExpertGadgetReducer";
import proficiencyDetailsReducer from "./expertProficiencyReducer";
import proficiencySelectDetailsReducer from "./expertProficiencySelectReducer";
import weeklyExpertDetailsReducer from "./expertWeeklyReducer";
import WeeklySelectDetailsReducer from "./ExpertWeeklySelectReducer";
import allUsersReducer from "./AllUsersReducer";
import monthlyExpertDetailsReducer from "./expertMonthlyReducer";
import MonthlyAttendenceListSelectDetailsReducer from "./monthlyAttendenceListReducer";
import expertPaySlipDetailsReducer from "./expertPaySlipReducer";
import AttendenceListDetailsReducer from "./expertAttendenceListReducer";
import personalWiseDetailsReducer from "./expertPersonalWiseReducer";
import emergencyWiseDetailsReducer from "./expertEmergencywiseReducer";
import familyWiseDetailsReducer from "./expertFamilyWiseReducer";
import skillsWiseDetailsReducer from "./expertSkillsWiseReducer";
import workExperienceWiseDetailsReducer from "./expertWorkExperienceReducer";
import bankWiseDetailsReducer from "./expertWiseBankReducer";
import projectWiseDetailsReducer from "./expertProjectWiseReducer";
import leavebankWiseDetailsReducer from "./expertleavebankReducer";
import createProfileReducer from "./userprofileReducer";





const rootReducer = combineReducers({
    dashboardData: getDashboardReducer,
    data: loginReducer,
    data:createUserReducer,
    data: getUserReducer,
    familydata:familyDetailsReducer,
    emergnecydata:emergencyDetailsReducer, 
    workexpdata:workExperienceDetailsReducer, 
    skilldata: skillDetailsReducer,
    statusdata: statusDetailsReducer,
    weekdata:getCurrentWeekDetails,
    bankdata:bankDetailsReducer,
    leavedata:leaveDetailsReducer,
    projectsdata:myProjectsReducer,
    userslistdata:userListReducer,
    hoursentrydata: hoursEntryDetailsReducer,
    leaveBankData:leaveBankReducer,
    allExpertsData:allExpertrsReducer,
    dashboardMangementData:getDashboardMangementReducer,
    dmeritsdata:dmeritsDetailsReducer,
    performancedata:performanceDetailsReducer,
    releavingdata:ReleavingDetailsReducer,
    leaverequestdata:LeaveRequestDetailsReducer,
    certificatedata: CertificateDetailsReducer,
    expertsBirthdaysdata: expertBirthdayDetailsReducer,
    expertProjectdata:expertProjectDetailsReducer,
    expertHolidaydata:ExpertHolidayDetailsReducer,
    expertEventmandata:ExpertEventmanDetailsReducer,
    expertGadgetdata:GadgetDetailsReducer,
    expertProficiencydata:proficiencyDetailsReducer,
    expertproficiencyselectdata:proficiencySelectDetailsReducer,
     expertweeklydata:weeklyExpertDetailsReducer,
     expertWeeklySelectData:WeeklySelectDetailsReducer,
     alluserdata:allUsersReducer,
     expertmonthlydata:monthlyExpertDetailsReducer,
     expertmonthlyAttendencelistdata:MonthlyAttendenceListSelectDetailsReducer,
     expertpaySlipdata:expertPaySlipDetailsReducer,
     expertAttendencelistdata:AttendenceListDetailsReducer,
     expertpersonallidwisedata:personalWiseDetailsReducer,
     expertperemergencyData:emergencyWiseDetailsReducer,
     expertfimlywiseData:familyWiseDetailsReducer,
     expertSkillWiseData:skillsWiseDetailsReducer,
     expertWorkExperienceWiseData:workExperienceWiseDetailsReducer,
     expertbankWiseData:bankWiseDetailsReducer,
     expertprojectwiseData:projectWiseDetailsReducer,
     expertleavebankwiseData:leavebankWiseDetailsReducer,
     userprofiledata:createProfileReducer
});
export default rootReducer;