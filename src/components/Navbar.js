import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { loadUsersStart } from '../redux/actions/UserActions';
import Sidebar from './Sidebar';
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import MyProjects from '../pages/MyProjects';
import HoursEntry from '../pages/HoursEntry';
import BankDetails from '../pages/BankDetails';
import DailyStatus from '../pages/DailyStatus';
import FamilyDetails from '../pages/FamilyDetails';
import WorkExperience from '../pages/WorkExperience';
import PersonalDetails from '../pages/PersonalDetails';
import EmergencyDetails from '../pages/EmergencyDetails';
import Skills from '../pages/Skills';
import Leaves from '../pages/Leaves';
import Dashboard from '../pages/Dashboard';
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
const Navbar = () => {
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
    const storedStateData = state; // Storing the state data in a variable
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={mdTheme}>
            <Controls.Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.AppBar position="absolute" open={open}>
                        <Controls.Toolbar sx={{ pr: '24px' }}>
                            <Controls.IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                sx={{ marginRight: '36px', ...(open && { display: 'none' }), }}>
                                <Controls.MenuIcon />
                            </Controls.IconButton>
                            <Controls.Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}>
                            </Controls.Typography>
                            <Controls.Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                                        horizontal: 'right',}} >
                                    <Controls.MenuItem
                                        onClick={() => navigate('/emp/profiles/userprofile')}
                                    >Profile</Controls.MenuItem>
                                    <Controls.MenuItem onClick={handleClose}>Settings</Controls.MenuItem>
                                    <Controls.MenuItem onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.reload(false); }}> Logout </Controls.MenuItem>
                                </Controls.Menu>
                            </Controls.Stack>
                        </Controls.Toolbar>
                    </Controls.AppBar>
                </Controls.Box>
                <Sidebar {...{ open, setOpen }} />
                <Controls.Box
                component="main"
                sx={{
                    backgroundColor: '#F5F7FA',
                    flexGrow: 1,
                    p: 3,
                    overflow: 'auto',
                    my: 7,
                    height: '68rem',
                }}>
                <Routes>
                    <Route path="/" exact element={<Dashboard />} />
                    <Route path="/profiles">
                        <Route path="/profiles/personaldetails" element={<PersonalDetails />} />
                        <Route path="/profiles/familydetails" element={<FamilyDetails />} />
                        <Route path="/profiles/emergencydetails" element={<EmergencyDetails />} />
                        <Route path="/profiles/userprofile" element={<UserProfile />} />
                    </Route>
                    <Route path="/workandskills">
                        <Route path="/workandskills/workexperience" element={<WorkExperience />} />
                        <Route path="/workandskills/skills" element={<Skills />} />
                    </Route>
                    <Route path="/tasks">
                        <Route path="/tasks/dailystatus" element={<DailyStatus />} />
                        <Route path="/tasks/hoursentry" element={<HoursEntry />} />
                    </Route>
                    <Route path="/myprojects" element={<MyProjects />} />
                    <Route path="/bankdetails" element={<BankDetails />} />
                    <Route path="/leaves" element={<Leaves />} />
                </Routes>
            </Controls.Box>
            </Controls.Box>
        </ThemeProvider>
    );
};
export default Navbar;