import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
    {
        path: "/emp",
        title: "Dashboard",
        icon: <DashboardIcon />
    },
    {
        path: null,
        title: "Profile",
        icon: <PeopleAltIcon />,
        iconClosed: <ExpandLessIcon />,
        iconOpened: <ExpandMoreIcon />,
        items: [
            {
                title: "FamilyDetails",
                path: "/emp/profiles/familydetails",
 
            },
            {
                title: "EmergencyDetails",
                path: "/emp/profiles/emergencydetails",
 
            },
            {
                title: "UserProfile",
                path: "/emp/profiles/userprofile",
 
            },
        ],
    },
 
    {
        title: "Experience Skills",
        path: null,
        icon: <WorkHistoryIcon />,
        items: [
            {
                title: "WorkExpereince",
                path: "/emp/workandskills/workexperience"
            },
            {
                title: "Skills",
                path: "/emp/workandskills/skills"
            },
        ],
    },
    {
        title: "Tasks",
        path: null,
        icon: <AddTaskIcon />,
        items: [
            {
                title: "DailyStatus",
                path: "/emp/tasks/dailystatus"
            },
            {
                title: "HoursEntry",
                path: "/emp/tasks/hoursentry"
            },
        ],
    },
 
    {
        title: "MyProjects",
        path: "/emp/myprojects",
        icon: <FactCheckIcon />
    },
    {
        title: "Leaves",
        path: "/emp/leaves",
        icon: <CalendarMonthIcon />
    },
    {
        title: "BankDetails",
        path: "/emp/bankdetails",
        icon: <AccountBalanceIcon />
    },
 
    {
        title: "Logout",
        icon: <LogoutIcon />
    },
 
];