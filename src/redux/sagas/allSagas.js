import { all, fork } from 'redux-saga/effects';
import { onLoginUser } from './loginSagas';
import { onLoadUsers } from './userSagas';
import {
    onCreateUser, onCreateprofile,
    //  onUpdateUser,
} from './createUserSagas';
import {
    onCreateFamilyDetails,
    onLoadFamilyDetails,
    onDeleteFamilyDetails,
    onUpdateFamilyDetails,
} from './familyDetailsSagas';
import {
    onCreateEmergencyDetails,
    onLoadEmergencyDetails,
    onDeleteEmergencyDetails,
    onUpdateEmergencyDetails,
} from './emergencyDetailsSagas';
import {
    onCreateWorkExperienceDetails,
    onLoadWorkExperienceDetails,
    onDeleteWorkExperienceDetails,
    onUpdateWorkExperienceDetails,
} from './workExperienceSagas';
import {
    onCreateSkillDetails,
    onLoadSkillDetails,
    onDeleteSkillDetails,
    onUpdateSkillDetails,
} from './skillSagas';

import {
    onCreateStatusDetails,
    onLoadStatusDetails,
    onDeleteStatusDetails,
    onUpdateStatusDetails,
} from './dailyStatusSagas';
import {
    onLoadCurrentWeek,
} from './currentWeekSagas';

import {
    onCreateBankDetails,
    onLoadBankDetails,
} from './bankDetailsSagas';

import {
    onCreateLeaveDetails,
    onLoadLeaveDetails,
    onDeleteLeaveDetails,
    onUpdateLeaveDetails,
} from './leaveDetailsSagas';
import {
    onCreateMyProjectsDetails,
    onLoadMyProjectsDetails,
    onDeleteMyProjectsDetails,
    onUpdateMyProjectsDetails,
} from './myProjectsSagas';
import { onLoadUsersList } from './usersListSagas';
import {
    onCreateHoursEntryDetails,
    onLoadHoursEntryDetails,
    onUpdateHoursEntryDetails,
} from './hoursDetailsSagas';
import { onLoadDashboardDetials } from './dashboardDetailsSagas'
import { onCreateExpertCreation } from './expertCreationSagas';
import { onCreateLeaveBank, onLoadLeaveBank, onUpdateLeaveBank, onDeleteLeaveBank } from './leaveBankSagas';
import { onLoadAllExpertsDetails } from './AllExpertsSagas';
import { onLoadDashboardMangementDetials } from './dashboardmangementDetailsSagas';
import { onCreateDmeritsDetails, onLoadDmeritsDetails, onUpdateDmeritsDetails } from './dmeritsDetailsSagas';
import { onCreatePerformanceDetails, onLoadPerformanceDetails, onUpdatePerformanceDetails } from './performanceDetailsSagas';
import { onCreateReleavingDetails, onLoadReleavingDetails, onUpdateReleavingDetails } from './releavingDetailsSagas';
import { onLoadLeaveRequestDetails, onUpdateLeaveRequestsDetails } from './leaveRequestSagas';
import { onCreateCertificateDetails, onLoadCertificateDetails, onUpdateCertificateDetails } from './certificateDetailsSagas';
import { onLoadBirthdayDetails } from './birthdayDetailsSagas';
import {
    onCreateProjectDetails,
    onDeleteProjectDetails,
    onLoadProjectDetails,
    onUpdateProjectDetails
}
    from './expertProjectDetailsSagas';
import {
    onCreateHolidayDetails,
    onDeleteHolidayDetails,
    onLoadHolidayDetails,
    onUpdateHolidayDetails
}
    from './expertHolidayDetailsSagas';
import { onCreateEventManDetails, onDeleteEventmanDetails, onLoadEventmanDetails, onUpdateEventmanDetails } from './expertEventmanDetailsSagas';
import { onCreateGadgetDetails, onDeleteGadgetDetails, onLoadGadgetDetails, onUpdateGadgetDetails } from './expertGadgetsDetailsSagas';
import { onLoadProficiencyDetails, onLoadProficiencySelectDetails } from './expertproficiencySagas';
import { onLoadWeeklyDetails, onLoadWeeklySelectDetails } from './experWeeklyDetailsSagas';
import { onLoadAllUsersDetails } from './AllUsersSagas';
import { onLoadmonthlyDetails } from './expertmothlyDetailsSagas';
import { onLoadmonthlyAttendenceListDetails } from './MonthlyAttendenceListSagas';
import { onCreatePaySlipDetails } from './expertPaySlipSagas';
import { onCreateAttendenceListDetails, onLoadAttendenceListDetails, onUpdateAttendenceListDetails } from './expertAttendenceListSagas';
import { onLoadBankWiseDetails, onLoadEmergencyWiseDetails, onLoadFamilyWiseDetails, onLoadPersonalWiseDetails, onLoadSkillsWiseDetails, onLoadWorkExperienceWiseDetails, onLoadleavebankWiseDetails, onLoadprojectWiseDetails } from './expertPersonalWiseSagas';



const allSagas = [
    fork(onLoginUser),
    fork(onCreateUser),
    fork(onLoadUsers),
    fork(onLoadDashboardDetials),
    fork(onCreateprofile),


    fork(onCreateFamilyDetails),
    fork(onLoadFamilyDetails),
    fork(onUpdateFamilyDetails),
    fork(onDeleteFamilyDetails),

    fork(onCreateEmergencyDetails),
    fork(onLoadEmergencyDetails),
    fork(onUpdateEmergencyDetails),
    fork(onDeleteEmergencyDetails),

    fork(onCreateWorkExperienceDetails),
    fork(onLoadWorkExperienceDetails),
    fork(onDeleteWorkExperienceDetails),
    fork(onUpdateWorkExperienceDetails),

    fork(onCreateSkillDetails),
    fork(onLoadSkillDetails),
    fork(onDeleteSkillDetails),
    fork(onUpdateSkillDetails),

    fork(onCreateStatusDetails),
    fork(onLoadStatusDetails),
    fork(onDeleteStatusDetails),
    fork(onUpdateStatusDetails),

    fork(onLoadCurrentWeek),

    fork(onCreateBankDetails),
    fork(onLoadBankDetails),

    fork(onCreateLeaveDetails),
    fork(onLoadLeaveDetails),
    fork(onDeleteLeaveDetails),
    fork(onUpdateLeaveDetails),

    fork(onCreateMyProjectsDetails),
    fork(onLoadMyProjectsDetails),
    fork(onDeleteMyProjectsDetails),
    fork(onUpdateMyProjectsDetails),

    fork(onLoadUsersList),

    fork(onCreateHoursEntryDetails),
    fork(onLoadHoursEntryDetails),
    fork(onUpdateHoursEntryDetails),

    fork(onCreateExpertCreation),


    fork(onCreateLeaveBank),
    fork(onLoadLeaveBank),
    fork(onUpdateLeaveBank),
    fork(onDeleteLeaveBank),



    fork(onLoadDashboardMangementDetials),
    fork(onLoadAllExpertsDetails),

    fork(onCreateDmeritsDetails),
    fork(onLoadDmeritsDetails),
    fork(onUpdateDmeritsDetails),


    fork(onCreatePerformanceDetails),
    fork(onLoadPerformanceDetails),
    fork(onUpdatePerformanceDetails),

    fork(onCreateReleavingDetails),
    fork(onLoadReleavingDetails),
    fork(onUpdateReleavingDetails),


    fork(onLoadLeaveRequestDetails),
    fork(onUpdateLeaveRequestsDetails),



    fork(onCreateCertificateDetails),
    fork(onLoadCertificateDetails),
    fork(onUpdateCertificateDetails),

    fork(onLoadBirthdayDetails),


    fork(onCreateProjectDetails),
    fork(onDeleteProjectDetails),
    fork(onLoadProjectDetails),
    fork(onUpdateProjectDetails),



    fork(onCreateHolidayDetails),
    fork(onDeleteHolidayDetails),
    fork(onLoadHolidayDetails),
    fork(onUpdateHolidayDetails),



    fork(onCreateEventManDetails),
    fork(onUpdateEventmanDetails),
    fork(onLoadEventmanDetails),
    fork(onDeleteEventmanDetails),

    fork(onCreateGadgetDetails),
    fork(onDeleteGadgetDetails),
    fork(onLoadGadgetDetails),
    fork(onUpdateGadgetDetails),

    fork(onLoadProficiencyDetails),
    fork(onLoadProficiencySelectDetails),


    fork(onLoadWeeklyDetails),
    fork(onLoadWeeklySelectDetails),

    fork(onLoadAllUsersDetails),

    fork(onLoadmonthlyDetails),


    fork(onLoadmonthlyAttendenceListDetails),

    fork(onCreatePaySlipDetails),



    fork(onCreateAttendenceListDetails),
    fork(onLoadAttendenceListDetails),
    fork(onUpdateAttendenceListDetails),



    fork(onLoadPersonalWiseDetails),
    fork(onLoadEmergencyWiseDetails),
    fork(onLoadFamilyWiseDetails),
    fork(onLoadSkillsWiseDetails),
    fork(onLoadWorkExperienceWiseDetails),
    fork(onLoadBankWiseDetails),
    fork(onLoadprojectWiseDetails),
    fork(onLoadleavebankWiseDetails),





];
export default function* rootSaga() {
    yield all([...allSagas]);
}