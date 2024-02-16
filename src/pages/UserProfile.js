import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsersStart } from '../redux/actions/UserActions';
import { useNavigate } from "react-router-dom";
import * as dayjs from 'dayjs';
import Controls from "../components/Controls";
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      }
    }
  }, [users]);
  useEffect(() => {
    dispatch(loadUsersStart());
  }, [])
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="User Profile" />
          </Controls.Box>
        </Controls.Paper>
      </Controls.Box>
      <Controls.Grid rowSpacing={3} columnSpacing={3} container p={3} sx={{
        "&.MuiGrid-root": {
          padding: 0,
        },
      }}>
        <Controls.Grid item xs={12} sm={12} md={3} >
          <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 4 }}>
            <Controls.Avatar
              sx={{ width: 140, height: 140 }}
              alt="Profile Pic"
              src={decodedProfilePic} />
            <Controls.Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
              {users?.first_name} {users?.last_name}
            </Controls.Typography>
            <Controls.Typography gutterBottom color="textSecondary" variant="subtitle1" component="div" sx={{ textAlign: 'center' }}> {users?.permanent_address}
            </Controls.Typography>
          </Controls.Paper>
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={12} md={9}>
          <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', backgroundColor: '#fff', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '5px', p: 5 }}>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container>
              <Controls.Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Controls.Typography component="span" sx={{ fontSize: 23, ml: 3, mt: 3 }}>Profile</Controls.Typography>
                <Controls.ReusableButton
                  sx={{
                    width: 23,
                    height: 35,
                    mt: 2,
                    textTransform: 'none',
                    borderRadius: '20px',
                    boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={() => navigate('/emp/profiles/personaldetails')}
                  buttonVariant="contained"
                  buttonColor="info"
                  buttonText="add" />
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Divider />
                <Controls.Typography color="textSecondary" variant="subtitle1" sx={{ mt: 1, fontSize: 15, ml: 3, }}>Hi, this is  {users?.first_name} {users?.last_name} , working as a software developer in Actimize,it is the best company around  and The information can be edited...</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={4} md={4} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ ml: 3, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Controls.EmailTwoToneIcon sx={{ fontSize: '25px', }} />
                  <Controls.Typography sx={{ ml: 1, fontSize: '15px', }}>
                    {users?.personal_email}
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={4} md={4} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ ml: 3, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Controls.PhonelinkRingTwoToneIcon sx={{ fontSize: '25px', }} />
                  <Controls.Typography sx={{ ml: 1, fontSize: '15px', }}>
                    {users?.mobile_number}
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={4} md={4} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ ml: 3, mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Controls.PinDropTwoToneIcon sx={{ fontSize: '25px', }} />
                  <Controls.Typography sx={{ ml: 1, fontSize: '15px', }}>
                    {users?.present_address}
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Paper>
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={12} md={6} >
          <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '5px', p: 5 }}>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container>
              <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Gender</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{users?.gender}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Date of Birth</Controls.Typography>
                  <Controls.Typography sx={{ ml: 14.5, fontSize: 16, }}>
                    {users?.date_of_birth ? dayjs(users.date_of_birth).format('DD-MM-YYYY') : ''}
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Martial Status</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{users?.marital_status}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Paper>
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={12} md={6} >
          <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '5px', p: 5 }}>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container>
              <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Aadhar Card</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{users?.aadhar_card_number}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Pan Card</Controls.Typography>
                  <Controls.Typography sx={{ ml: 18, fontSize: 16, }}>{users?.pan_card_number}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Nationality</Controls.Typography>
                  <Controls.Typography sx={{ ml: 16.5, fontSize: 16, }}>{users?.nationality}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Paper>
        </Controls.Grid>
      </Controls.Grid>
    </>)
}
export default UserProfile;


