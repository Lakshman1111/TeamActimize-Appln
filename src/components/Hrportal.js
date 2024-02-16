import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { loadUsersStart } from '../redux/actions/UserActions';
import { Routes, Route } from "react-router-dom";
import SidebarMangment from './SidebarMangement';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardMangement from '../pages/DashboardMangement';
import ExpertCreation from '../pages/ExpertCreation';
import ExpertPage from '../pages/ExpertPage';
import LeaveBank from '../pages/LeaveBank';
import LeaveRequests from '../pages/LeaveRequests';
import ExpertWeeklyStatus from '../pages/ExpertWeeklyStatus';
import ExpertMothlyStatus from '../pages/ExpertMothlyStatus';
import ExpertAttendenceList from '../pages/ExpertAttendenceList';
import ExpertMonthlyAttendenceList from '../pages/ExpertMonthlyAttendenceList';
import ExpertCertificateVarification from '../pages/ExpertCertificateVarification';
import ExpertReleavingData from '../pages/ExpertReleavingData';
import ExpertPerformanceAppraisals from '../pages/ExpertPerformanceAppraisals';
import ExpertDmerits from '../pages/ExpertDmerits';
import ProficiencyMangement from '../pages/ProficiencyMangement';
import ProjectsMangement from '../pages/ProjectsMangement';
import HolidaysMangement from '../pages/HolidaysMangement';
import PayslipMangement from '../pages/PayslipMangement';
import BirthdaysManagement from '../pages/BirthdaysMangement';
import EventsMangement from '../pages/EventsMangement';
import Gadgetsmangement from '../pages/Gadgetsmangement';
import Requestsmangement from '../pages/Requestsmangement';
import ExpertWiseEmergency from '../pages/ExpertWiseEmergency';
import ExpertWisetFamily from '../pages/ExpertWisetFamily';
import ExpertWiseSkills from '../pages/ExpertWiseSkills';
import ExpertWiseExperience from '../pages/ExpertWiseExperience';
import ExpertWisebankDetails from '../pages/ExpertWisebankDetails';
import ExpertWiseProjects from '../pages/ExpertWiseProjects';
import ExpertWiseLeaveBank from '../pages/ExpertWiseLeaveBank';
import Controls from './Controls';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const mdTheme = createTheme();
const Hrportal = () => {   
    const [open, setOpen] = useState(false);
    const [base64String, setBase64String] = useState(''); // Define base64String state
    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    const dispatch = useDispatch();
    const users = useSelector((state) => state.data.data);
    const [decodedProfilePic, setDecodedProfilePic] = useState('');
    useEffect(() => {
        if (users && users.profile_pic) {
            const base64Image = users.profile_pic;
            const base64String = base64Image.split(';base64,').pop();
            const cleanedBase64 = base64String.replace(/[^A-Za-z0-9+/]/g, '');
            try {
                const binaryString = window.atob(cleanedBase64);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const blob = new Blob([bytes], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);
                setDecodedProfilePic(imageUrl);
            } catch (error) {
                console.error('Error decoding base64 string:', error);
            }
        }
    }, [users]);
    useEffect(() => {
        dispatch(loadUsersStart());
    }, [])
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { state } = useLocation();
    const storedStateData = state;
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={mdTheme}>
            <Controls.Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AppBar position="absolute" open={open}>
                        <Toolbar sx={{ pr: '24px' }}>
                            <Controls.IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                sx={{ marginRight: '36px', ...(open && { display: 'none' }), }}>
                                <MenuIcon />
                            </Controls.IconButton>
                            <Controls.Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}>
                            </Controls.Typography>
                            <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Controls.Typography sx={{ mt: 1, fontSize: 18, mr: 3 }}>
                                    {users?.first_name} {users?.last_name}
                                </Controls.Typography>
                                <Controls.Avatar alt="Remy Sharp" src={decodedProfilePic} onClick={handleClick} />
                                <Controls.Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <Controls.MenuItem
                                        onClick={() => navigate('/emp/profiles/userprofile')}
                                    >Profile</Controls.MenuItem>
                                    <Controls.MenuItem onClick={handleClose}>Settings</Controls.MenuItem>
                                    <Controls.MenuItem onClick={() => {
 
                                        localStorage.removeItem('token');
                                        window.location.reload(false);
                                    }}>
                                        Logout
                                    </Controls.MenuItem>
                                </Controls.Menu>
                            </Stack>
                        </Toolbar>
                    </AppBar>
                </Controls.Box>
                <SidebarMangment {...{ open, setOpen }}/>
                <Controls.Box
                component="main"
                sx={{
                    backgroundColor: '#F5F7FA',
                    flexGrow: 1,
                    p: 3,
                    overflow: 'auto',
                    my: 7,
                    height: '82rem',
                }}>
                   <Routes>
                  <Route path="/" exact element={<DashboardMangement />} />
                  <Route path="/">
                  <Route path="/experts/expertscreation" element={<ExpertCreation />} />
                      <Route path="/experts/expertpage" element={<ExpertPage/>} />
                      <Route path="/experts/leaves/leavebank" element={<LeaveBank />} />
                      <Route path="/experts/leaves/leaverequests" element={<LeaveRequests />}/>
                      <Route path="/experts/expertstatus/weeklystatus" element={<ExpertWeeklyStatus/>}/>
                      <Route path="/experts/expertstatus/mothlystatus" element={<ExpertMothlyStatus />} />
                      <Route path="/experts/attendence/attendencelist" element={<ExpertAttendenceList />} />
                      <Route path="/experts/attendence/monthlyattendencelist" element={<ExpertMonthlyAttendenceList />} />
                      <Route path= "/experts/certificate_verification" element={<ExpertCertificateVarification />} />
                      <Route path= "/experts/expert-releavingdata" element={<ExpertReleavingData />} />
                      <Route path= "/experts/performance_appraisals" element={<ExpertPerformanceAppraisals/>} />
                      <Route path= "/experts/dmerits" element={<ExpertDmerits/>} />
                      <Route path= "/proficiency" element={<ProficiencyMangement/>} />
                      <Route path= "/projects" element={<ProjectsMangement/>} /> 
                      <Route path= "/holidays" element={<HolidaysMangement/>} />
                      <Route path= "/payslip" element={<PayslipMangement/>} />
                      <Route path= "/birthdays" element={<BirthdaysManagement/>} />
                      <Route path= "/schedules-events" element={<EventsMangement/>} />
                      <Route path= "/gadgets" element={<Gadgetsmangement/>} />
                      <Route path= "/experts/expertpage/personaldetails/:id" element={<Requestsmangement/>} />
                      <Route path= "/experts/expertpage/emergencydetails/:id" element={<ExpertWiseEmergency/>} />
                      <Route path= "/experts/expertpage/familydetails/:id" element={<ExpertWisetFamily/>} />
                      <Route path= "/experts/expertpage/skills/:id" element={<ExpertWiseSkills/>} />
                      <Route path= "/experts/expertpage/workexperience/:id" element={<ExpertWiseExperience/>} />
                      <Route path= "/experts/expertpage/bankdetails/:id" element={<ExpertWisebankDetails/>} />
                      <Route path= "/experts/expertpage/projects/:id" element={<ExpertWiseProjects/>} />
                      <Route path= "/experts/expertpage/leavebank/:id" element={<ExpertWiseLeaveBank/>} />  
                  </Route>
              </Routes>
            </Controls.Box>
            </Controls.Box>
        </ThemeProvider>
    );
};
 
export default Hrportal;