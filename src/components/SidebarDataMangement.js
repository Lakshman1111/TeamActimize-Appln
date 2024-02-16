import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ExtensionIcon from '@mui/icons-material/Extension';
import EventIcon from '@mui/icons-material/Event';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CakeIcon from '@mui/icons-material/Cake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DevicesIcon from '@mui/icons-material/Devices';
import DescriptionIcon from '@mui/icons-material/Description';
export const SidebarDataMangement = [

    { 
        path: "/hr",
        title: "Dashboard",
        icon: <DashboardIcon />
     },
    {
        path: null,
        title: "Expert",
        icon: <PeopleAltIcon />,
        iconClosed: <ExpandLessIcon />,
        iconOpened: <ExpandMoreIcon />,
        items: [
            {
                title: "Expert Creation",
                path: "/hr/experts/expertscreation",
                
            },
            {
                title: "Expert Page",
                path: "/hr/experts/expertpage",
                
            },
            {
                title: "Leaves",
                path: "/profiles/userprofile",
                items: [
                    {
                        title: "Leave Reqest ",
                        path: "/hr/experts/leaves/leaverequests",
                        
                    },
                    {
                        title: "Leave Bank",
                        path: "/hr/experts/leaves/leavebank",
                        
                    },

                ]
                
            },
            {
                title: "Expert Status",
                path: "/experts/profiles/emergencydetails",
                items: [
                    {
                        title: "Weekly Status",
                        path: "/hr/experts/expertstatus/weeklystatus",
                        
                    },
                    {
                        title: "Mothly Status",
                        path: "/hr/experts/expertstatus/mothlystatus",
                        
                    },
                ]
                
            },
            {
                title: "Attendance",
                path: "/attendencelist",
                items: [
                    {
                        title: "Attendance List",
                        path: "/hr/experts/attendence/attendencelist",
                        
                    },
                    // {
                    //     title: " Monthly Attendance List ",
                    //     path: "/hr/experts/attendence/monthlyattendencelist",
                        
                    // },
                ]
                
            },
            {
                title: "Certificate Verfications",
                path: "/hr/experts/certificate_verification",
                
            },
            {
                title: "Expert Releaving Data",
                path: "/hr/experts/expert-releavingdata",
                
            },
            {
                title: "Performance Appraisals",
                path: "/hr/experts/performance_appraisals",
                
            },
            {
                title: "Demerits",
                path:"/hr/experts/dmerits",
                
            },
        ],
    },
  {
    title: "Proficiency",
        path: "/hr/proficiency" ,
            icon:<AccessAlarmIcon />
},

{
    title: "Projects",
        path: "/hr/projects",
            icon: <ExtensionIcon />
},
{
    title: "Holidays",
        path: "/hr/holidays",
            icon: <EventIcon />
},
{
    title: "Pay slip",
        path: "/hr/payslip" ,
            icon: <CreditCardIcon />
},
{
    title: "Birthdays",
        path:"/hr/birthdays",
            icon: <CakeIcon />
},
{
    title: "Schedules and Events",
        path: "/hr/schedules-events",
            icon: <CalendarTodayIcon />
},
{
    title: "Gadgets",
        path: "/hr/gadgets",
            icon: <DevicesIcon />
},
{
    title: "Requests",
        // path: "/hr/requests" ,
            icon: <DescriptionIcon />
},
{
    title: "Logout",
            icon: <LogoutIcon />
},
    
];