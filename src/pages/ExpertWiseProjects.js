import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  loadProjectWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
import { useParams } from 'react-router-dom';
import {useNavigate } from "react-router-dom"
import Controls from "../components/Controls";
const ExpertWiseProjects = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const projectData = useSelector((state) => state.expertprojectwiseData?.data?.data || []);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadProjectWiseDetailsStart(id));
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
              typographyText="Expert Projects" />
          </Controls.Box>
        </Controls.Paper>
      </Controls.Box>
      <Controls.Grid rowSpacing={3} columnSpacing={3} container p={3} sx={{
        "&.MuiGrid-root": {padding: 0,},}}>
        <Controls.Grid item xs={12} sm={12} md={9.5} >
          <Controls.Paper maxWidth="xlg" sx={{ width: '100%', height: '100%', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '5px', p: 5 }}>
            <Controls.Grid container spacing={3}>
              {projectData && projectData.length > 0 ? (
                projectData.map((project, index) => (
                  <Controls.Grid item xs={12} sm={12} md={4} key={index} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
                    <Controls.Card
                      variant="outlined"
                      sx={{
                        backgroundColor: '#f5f5f5',
                        borderRadius: '15px',
                        boxShadow: '8px 8px 8px 8px rgba(0,0,0,0.2)',
                        width: 270, 
                        height: 200, }}>
                      <Controls.CardContent>
                        <Controls.Typography variant="h6" color="textPrimary" align="center" gutterBottom>
                          Project Name: {project.project_name}
                        </Controls.Typography>
                        <Controls.Typography variant="h6" color="textPrimary" align="center" gutterBottom>
                          Status: {project.status}
                        </Controls.Typography>
                        <Controls.Typography variant="h6" color="textPrimary" align="center" gutterBottom>
                          Start Date: {project.start_date}
                        </Controls.Typography>
                        <Controls.Typography variant="h6" color="textPrimary" align="center" gutterBottom>
                          End Date: {project.end_date}
                        </Controls.Typography>
                      </Controls.CardContent>
                    </Controls.Card>
                  </Controls.Grid>
                ))
              ) : (
                <Controls.Typography variant="body1" align="center">No projects available</Controls.Typography>
              )}
            </Controls.Grid>
          </Controls.Paper>
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={12} md={2.5} >
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
                        textDecoration: 'underline',}, }}
                    onClick={() => navigate(`/hr/experts/expertpage/emergencydetails/${id}`)} >
                    Emergency Details
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6} sm={6} md={12} sx={{ width: '100%', height: '100%', }}>
                <Controls.Box component="span" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flexstart' }}>
                  <Controls.Typography sx={{
                    fontSize: 16, fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline', },}}
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
                      textDecoration: 'underline',}, }}
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
                      textDecoration: 'underline',},}}
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
                    '&:hover': {  textDecoration: 'underline', }, }}
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
                    '&:hover': {  textDecoration: 'underline', }, }}
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
                    '&:hover': {  textDecoration: 'underline',  },}}
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
                      textDecoration: 'underline', },}}
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
export default ExpertWiseProjects;