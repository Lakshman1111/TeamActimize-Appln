import React from 'react';
import {
    Button,
    TextField,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    useTheme
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsersStart } from '../redux/actions/UserActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { blue } from '@mui/material/colors';
import User from '../assets/images/user8.jpg';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useLocation, useNavigate } from "react-router-dom";
import PersonalDetails from './PersonalDetails';
import * as dayjs from 'dayjs';
import { connect } from 'react-redux';

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;
const users = {
    aadhar_card_number: "789789456456",
    company_email: "srinivas.actimize@gmail.com",
    date_of_birth: "Sun, 04 Dec 2022 18:30:00 GMT",
    first_name: "Srinu",
    gender: "male",
    last_name: "vasu",
    marital_status: "married",
    mobile_number: "9440609464",
    nationality: "Indian",
    pan_card_number: "PANUM7894R",
    permanent_address: "Andhra Pradesh",
    personal_email: "srinu@gmail.com",
    present_address: "Telangana",
}
const UserProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const users= useSelector((state)=>state.data.data);

    // const dateofBirth = users?.date_of_birth;
    // const date = new Date(dateofBirth).toLocaleDateString('pt-PT').split(',')[0];

    useEffect(() => {
        dispatch(loadUsersStart());
    }, [])

    // onClick={()=>navigate('/profiles/personaldetails')}
    return (
        <>
            <Box>
                <Paper sx={{ padding: '10px', mb: 2 }} elevation={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography
                            component="span"
                            variant="h5"
                            sx={{ fontSize: 29, mt: 0.5, ml: 2 }}>
                            User Profile
                        </Typography>
                        {/* <Fab sx={{ mr: 3 }} type="submit" color="secondary" aria-label="add" size="medium" title="Edit">
              <EditIcon/>
            </Fab> */}
                    </Box>
                </Paper>


            </Box>
            <Box>
                <Grid rowSpacing={2} columnSpacing={2} container>
                    <Grid item xs={3}>
                        <Paper sx={{ padding: '10px', mb: 2 }} elevation={1}>
                            <Grid container wrap="nowrap" spacing={1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid item >
                                    <Avatar sx={{ mx: 'auto', my: 1, width: 140, height: 140, mb: 0.5 }} src={User} />
                                </Grid>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {users?.first_name} {users?.last_name}
                                        <Typography color="textSecondary" variant="body2" component="div" >{users?.permanent_address}
                                        </Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ mt: 0.5, }} />
                            <Typography component="span" sx={{ ml: 2, mt: 2, mr: 2, fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <EmailTwoToneIcon />
                                {users?.personal_email}
                            </Typography>
                            <Divider sx={{ mt: 2, }} />
                            <Typography component="span" sx={{ ml: 2, mt: 2, mr: 2, fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <PhonelinkRingTwoToneIcon />
                                {users?.mobile_number}
                            </Typography>
                            <Divider sx={{ mt: 2, }} />
                            <Typography component="span" sx={{ m: 2, fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <PinDropTwoToneIcon />
                                {users?.present_address}
                            </Typography>

                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper sx={{ padding: '10px', mb: 2 }} elevation={1}>
                            <Box p={1}>
                                <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component="span" sx={{ fontSize: 23, ml: 3, mt: 3 }}>Profile</Typography>
                                    <BorderColorIcon onClick={() => navigate('/profiles/personaldetails')} sx={{ mt: 3, mr: 4, color: 'blue' }} />
                                </Typography>
                                <Typography color="textSecondary" variant="body2" component="span" sx={{ fontSize: 15, ml: 3, }}>Hi, this is  {users?.first_name} {users?.last_name} , working as a software developer in Actimize  and The information can be edited...</Typography>
                                <Divider sx={{ mt: 1, }} />
                                <Typography component="span" sx={{ fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component="span" sx={{ ml: 5, mt: 2, fontSize: 13, display: 'flex' }}>
                                        <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Company Email</Typography>
                                        <Typography sx={{ ml: 12.8, fontSize: 16, }}>{users?.company_email}</Typography>
                                    </Typography>
                                </Typography>

                                <Typography component="span" sx={{ fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component="span" sx={{ ml: 5, mt: 2, fontSize: 13, display: 'flex' }}>
                                        <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Gender</Typography>
                                        <Typography sx={{ ml: 20.1, fontSize: 16, }}>{users?.gender}</Typography>
                                    </Typography>
                                </Typography>
                                <Typography component="span" sx={{ fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component="span" sx={{ ml: 5, mt: 2, fontSize: 13, display: 'flex' }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Date of Birth</Typography>
                                        {/* <Typography sx={{ml:14.5,fontSize:16,}}>{users?.date_of_birth}</Typography> */}
                                        <Typography sx={{ ml: 14.5, fontSize: 16, }}>{dayjs(users?.date_of_birth).format('DD-MM-YYYY')}</Typography>
                                    </Typography>
                                </Typography>
                                <Typography component="span" sx={{ fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component="span" sx={{ ml: 5, mt: 2, fontSize: 13, display: 'flex' }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Martial Status</Typography>
                                        <Typography sx={{ ml: 13.2, fontSize: 16, }}>{users?.marital_status}</Typography>
                                    </Typography>
                                </Typography>
                                <Typography component="span" sx={{ fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component="span" sx={{ ml: 5, mt: 2, fontSize: 13, display: 'flex' }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Aadhar Card</Typography>
                                        <Typography sx={{ ml: 15, fontSize: 16, }}>{users?.aadhar_card_number}</Typography>
                                    </Typography>
                                </Typography>
                                <Typography component="span" sx={{ fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component="span" sx={{ ml: 5, mt: 2, fontSize: 13, display: 'flex' }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Pan Card</Typography>
                                        <Typography sx={{ ml: 18, fontSize: 16, }}>{users?.pan_card_number}</Typography>
                                    </Typography>
                                </Typography>
                                <Typography component="span" sx={{ fontSize: 13, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography component="span" sx={{ ml: 5, mt: 2, mb: 1, fontSize: 13, display: 'flex' }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Nationality</Typography>
                                        <Typography sx={{ ml: 16.5, fontSize: 16, }}>{users?.nationality}</Typography>
                                    </Typography>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>


        </>
    )
}

export default UserProfile;


