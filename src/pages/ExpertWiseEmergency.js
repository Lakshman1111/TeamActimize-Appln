import React from 'react'
import {useEffect,  } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadEmergencyWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
import Controls from "../components/Controls";
import { useParams } from 'react-router-dom';
import {  useNavigate } from "react-router-dom";
const ExpertWiseEmergency = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const expertemergencywise = useSelector((state) => state.expertperemergencyData);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadEmergencyWiseDetailsStart(id));
  }, [dispatch, id]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Emergency Details" />
          </Controls.Box>
        </Controls.Paper>
      </Controls.Box>
      <Controls.Grid rowSpacing={3} columnSpacing={3} container p={3} sx={{
        "&.MuiGrid-root": {
          padding: 0, }, }}>
        <Controls.Grid item xs={12} sm={12} md={9} >
          <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '5px', p: 5 }}>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container justifyContent={'center'} padding={2}>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Name :</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16 }}>
                  {expertemergencywise?.data?.data[0]?.name}
                </Controls.Typography>
              </Controls.Grid>
            </Controls.Grid>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container justifyContent={'center'} padding={2}>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Email :</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, }}>
                  {expertemergencywise?.data?.data[0]?.email}
                </Controls.Typography>
              </Controls.Grid>
            </Controls.Grid>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container justifyContent={'center'} padding={2}>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Address:</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, }}>
                  {expertemergencywise?.data?.data[0]?.address}
                </Controls.Typography>
              </Controls.Grid>
            </Controls.Grid>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container justifyContent={'center'} padding={2}>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Relationship :</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, }}> First Name :
                  {expertemergencywise?.data?.data[0]?.relationship}
                </Controls.Typography>
              </Controls.Grid>
            </Controls.Grid>
            <Controls.Grid rowSpacing={3} columnSpacing={3} container justifyContent={'center'} padding={2}>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, fontWeight: 'bold' }}> Mobile Number</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={12} md={3} sx={{ width: '100%', height: '100%', }}>
                <Controls.Typography sx={{ fontSize: 16, }}>
                  {expertemergencywise?.data?.data[0]?.mobile_number}
                </Controls.Typography>
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
                        textDecoration: 'underline', }, }}
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
                      textDecoration: 'underline', }, }}
                    onClick={() => navigate(`/hr/experts/expertpage/familydetails/${id}`)}>Family Details</Controls.Typography>
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
                      textDecoration: 'underline', },  }}
                    onClick={() => navigate(`/hr/experts/expertpage/skills/${id}`)}>Skills</Controls.Typography>
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
                      textDecoration: 'underline',},  }}
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
                      textDecoration: 'underline', },}}
                    onClick={() => navigate(`/hr/experts/expertpage/personaldetails/${id}`)}>Personal Details</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {  textDecoration: 'underline',},}}
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
                    '&:hover': { textDecoration: 'underline',  },  }}
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
                      textDecoration: 'underline',},}}
                    onClick={() => navigate(`/hr/experts/expertpage/leavebank/${id}`)}
                  >Leave Bank</Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Paper>
        </Controls.Grid>
      </Controls.Grid>
    </>
  );
};
export default ExpertWiseEmergency;