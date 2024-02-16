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
import Sidebar from './Sidebar';
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
                {/* Team Actimize */}
              </Controls.Typography>
              <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Controls.Typography sx={{ mt: 1, fontSize: 18, mr: 3 }}>
                  {users?.first_name} {users?.last_name}
                </Controls.Typography>
                <Controls.Avatar alt="Remy Sharp" src={decodedProfilePic} />
              </Stack>
            </Toolbar>
          </AppBar>
        </Controls.Box>
        <Sidebar {...{ open, setOpen }} />
      </Controls.Box>
    </ThemeProvider>
  );
};

export default Navbar;