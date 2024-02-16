import React from 'react';
import * as dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyProjectsDetailsStart } from '../redux/actions/myProjectsActions';
import Pagination from '@mui/material/Pagination';
import Controls from "../components/Controls";
const MyProjects = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); formik.resetForm() };
  const [modalType, setModalType] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  let [userName, setUserName] = React.useState([]);
  const pluck = (arr, key) => arr.map(i => i[key]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const projectsLIst = useSelector((state) => state.projectsdata.data);
  useEffect(() => {
    dispatch(loadMyProjectsDetailsStart());
  }, [])
  let id = userInfo.id;
  useEffect(() => {
    if (id) {
      setEditMode(true);
      formik.setValues(userInfo);
      handleOpen();
    }
  }, [userInfo]);
  const formik = useFormik({
  });
  const handlePageChange = (event, page) => {
    dispatch(loadMyProjectsDetailsStart(page));
  };
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{
          padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px'
        }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="My Projects" />
          </Controls.Box>
        </Controls.Paper>
      </Controls.Box>
      <Controls.Container maxWidth='xlg' sx={{
        "&.MuiContainer-root": {
          paddingLeft: 0,
          paddingRight: 0
        },
      }}>
        <Controls.Grid container spacing={3} my={1}>
          {projectsLIst?.map((project, index) => (
            <Controls.Grid item xs={12} sm={12} md={4} key={index}>
              <Controls.Card sx={{
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
              }} >
                < Controls.CardContent sx={{
                  "&.MuiCardContent-root:last-child": {
                    paddingBottom: '23px',
                  },
                }}>
                  <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 20 }} gutterBottom>
                    &ensp;{project.project_name}
                  </Controls.Typography>
                  <Controls.Divider sx={{ mt: 1, height: 2, mb: 2 }} color='orange' />
                  <Controls.Grid container rowSpacing={1.5}>
                    <Controls.Grid item xs={12} sm={12} md={12} display='flex' justifyContent='space-between'>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        Initial Date :
                      </Controls.Typography>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        &ensp;&ensp;  {dayjs(project.start_date).format('DD-MM-YYYY')}
                      </Controls.Typography>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={12} display='flex' justifyContent='space-between'>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        Final Date :
                      </Controls.Typography>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        &ensp;&ensp;  {dayjs(project.end_date).format('DD-MM-YYYY')}
                      </Controls.Typography>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={12} display='flex' justifyContent='space-between'>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        Status
                      </Controls.Typography>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        {project.status}
                      </Controls.Typography>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={12} display='flex' justifyContent='space-between'>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        Members
                      </Controls.Typography>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        {project.members}
                      </Controls.Typography>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={12} display='flex' justifyContent='space-between'>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        Assigned By
                      </Controls.Typography>
                      <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 16 }} >
                        {project.assigned_by}
                      </Controls.Typography>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.CardContent>
              </Controls.Card>
            </Controls.Grid>
          ))}
<Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
<Pagination
            onChange={handlePageChange}
            count={20} color="primary" />
        </Controls.Grid>
        </Controls.Grid>
      </Controls.Container>
    </>
  )
}
export default MyProjects;