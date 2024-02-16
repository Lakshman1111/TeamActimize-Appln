import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
const Portalsmain = () => {
    const { state } = useLocation();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
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
    const storedStateData = state;
    const isEmployee = storedStateData?.roles?.includes('Employee');
    const isManagement = storedStateData?.roles?.includes('Management');
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate('/emp')
    };
    const handleCardClickone = () => {
        navigate('/hr')
    };
    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Controls.Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Controls.AppBar position="absolute" open={open}>
                            <Controls.Toolbar sx={{ pr: '24px' }}>
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
                                            horizontal: 'right',
                                        }} >
                                        <Controls.MenuItem onClick={() => {
                                            localStorage.removeItem('token');
                                            window.location.reload(false);
                                        }}>
                                            Logout
                                        </Controls.MenuItem>
                                    </Controls.Menu>
                                </Controls.Stack>
                            </Controls.Toolbar>
                        </Controls.AppBar>
                    </Controls.Box>
                </Controls.Box>
            </ThemeProvider>
            <Controls.Grid container spacing={2} justifyContent="center" sx={{ marginTop: 20 }}>
                {isEmployee &&
                    <Controls.Grid item xs={12} sm={6} md={5} lg={5}>
                        <Controls.Paper elevation={10} style={{ padding: 26 }}>
                            <Controls.Card
                                onClick={() => handleCardClick('employee')}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundImage: 'url("https://www.shutterstock.com/image-vector/group-portrait-funny-smiling-office-260nw-1249852108.jpg")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    minHeight: '250px', // Set your desired height
                                }}>
                                <Controls.Typography variant="h4">Employee Portal</Controls.Typography>
                                <Controls.CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                </Controls.CardContent>
                            </Controls.Card>
                        </Controls.Paper>
                    </Controls.Grid>
                }
                {isManagement &&
                    <Controls.Grid item xs={12} sm={6} md={5} lg={5}>
                        <Controls.Paper elevation={10} style={{ padding: 26 }}>
                            <Controls.Card
                                onClick={() => handleCardClickone('management')}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundImage: 'url("https://www.hyperoffice.com/blog/wp-content/uploads/2022/08/employees.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    minHeight: '250px', // Set your desired height
                                }}>
                                <Controls.Typography variant="h4">Management Portal</Controls.Typography>
                                <Controls.CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                </Controls.CardContent>
                            </Controls.Card>
                        </Controls.Paper>
                    </Controls.Grid>
                }
            </Controls.Grid>
        </>
    )
};
export default Portalsmain;
