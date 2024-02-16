import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as dayjs from 'dayjs';
import { loadPersonalWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
import { useParams } from 'react-router-dom';
import Controls from "../components/Controls";
const Requestsmangement = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const expertDetailswise = useSelector((state) => state.expertpersonallidwisedata);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadPersonalWiseDetailsStart(id));
  }, [dispatch, id]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Personal Details"
            />
          </Controls.Box>
        </Controls.Paper>
      </Controls.Box>
      <Controls.Grid rowSpacing={3} columnSpacing={3} container p={3} sx={{
        "&.MuiGrid-root": {
          padding: 0,
        },
      }}>
        <Controls.Grid item xs={12} sm={12} md={9} >
          <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '5px', p: 5 }}>
            <Controls.Grid rowSpacing={3} columnSpacing={10} container>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>First Name :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.first_name}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Last Name :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.last_name}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Date of Birth :</Controls.Typography>
                  <Controls.Typography sx={{ ml: 14.5, fontSize: 16 }}>
                    {expertDetailswise?.data?.data?.date_of_birth ? dayjs(expertDetailswise?.data?.data?.date_of_birth).format('DD-MM-YYYY') : ''}
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Nationality :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.nationality}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Gender :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.gender}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Aadhar Card :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.aadhar_card_number}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Pan Card :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.pan_card_number}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Phone Number :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.mobile_number}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Company Mail :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.company_email}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Personal Mail :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.personal_email}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Current Address :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.present_address}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={6} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Permanent Address :</Controls.Typography>
                  <Controls.Typography sx={{ fontSize: 16, }}>{expertDetailswise?.data?.data?.permanent_address}</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Paper>
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={12} md={3} >
          <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '5px', p: 5 }}>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      '&:hover': {
                        textDecoration: 'underline',
                      },}}
                    onClick={() => navigate(`/hr/experts/expertpage/emergencydetails/${id}`)}>
                    Emergency Details
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16, fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                    },}}
                    onClick={() => navigate(`/hr/experts/expertpage/familydetails/${id}`)}
                  >Family Details</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                    }, }}
                    onClick={() => navigate(`/hr/experts/expertpage/skills/${id}`)}
                  >Skills</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                    }, }}
                    onClick={() => navigate(`/hr/experts/expertpage/workexperience/${id}`)}>Work Experience</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                    }, }}
                    onClick={() => navigate(`/hr/experts/expertpage/personaldetails/${id}`)}
                  >Personal Details</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                    }, }}
                    onClick={() => navigate(`/hr/experts/expertpage/bankdetails/${id}`)}>Bank Details</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                    onClick={() => navigate(`/hr/experts/expertpage/projects/${id}`)}
                  >Projects</Controls.Typography>
                </Controls.Box>
              </Controls.Grid> 
               <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                    }, }}
                    onClick={() => navigate(`/hr/experts/expertpage/leavebank/${id}`)}
                  >Leave Bank</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Paper>
        </Controls.Grid>
      </Controls.Grid>
    </>
  )}
export default Requestsmangement;


