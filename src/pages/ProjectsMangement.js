import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { red } from '@mui/material/colors';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Pagination from '@mui/material/Pagination';
import {
  createProjectDetailsStart,
  loadProjectDetailsStart,
  updateProjectDetailsStart,
  deleteProjectDetailsStart
}
  from '../redux/actions/expertProjectDetailsActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import ResuableTable from "../components/Table";
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import Controls from "../components/Controls";
const columns = [
  { id: "id", label: "S.No" },
  { id: "project_name", label: "Project Name" },
  { id: "status", label: "Status" },
  { id: "start_date", label: "Start Date" },
  { id: "end_date", label: "End Date" },
  { id: "members", label: "Team" },
];
const style = {
  p: 4,
  top: '45%',
  left: '50%',
  width: 400,
  boxShadow: 30,
  maxHeight: '100%',
  maxWidth: '100vw',
  overflowY: 'auto',
  position: 'absolute',
  // bgcolor: 'background.paper',
  backgroundColor: (theme) =>
    theme.palette.common.white,
  transform: 'translate(-50%, -50%)',
};
const ProjectsMangement = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setstartDate(false);
    setendDate(false);
    setOpen(true);
    setSelectedNames([]);    // Reset the selectedNames state to an empty array
  }
  const [startDate, setstartDate] = useState(false);
  const [endDate, setendDate] = useState(false);
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const handleOnChange = (startDate,endDate) =>{
    formik.setFieldValue('startDate', startDate);
    setstartDate(true)
  }
  const handleOnChangeone = (endDate) =>{
    formik.setFieldValue('endDate', endDate);
    setendDate(true)
  }
  const dispatch = useDispatch();
  const formFields = [
    "project_name",
    "status",
    "start_date",
    "end_date",
    "members",
    "members_list",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handlePageChange = (event, page) => {
    dispatch(loadProjectDetailsStart(page));
  };
  const handleSubmit = (values, { setStatus, resetForm }) => {
    if (editMode) {
      if(startDate){
        let startDate = new Date(values.start_date);
        startDate.setDate(startDate.getDate() + 1); // Increment the start_date by 1 day
        values.start_date = startDate;
      } 
      else if(endDate){
        let endDate = new Date(values.end_date);
        endDate.setDate(endDate.getDate() + 1); // Increment the end_date by 1 day
        values.end_date = endDate;
      }
      else {
        values.start_date = values.start_date;
        values.end_date = values.end_date;
      }
    } else {
      let startDate = new Date(values.start_date);
      startDate.setDate(startDate.getDate() + 1); // Increment the start_date by 1 day
      let endDate = new Date(values.end_date);
      endDate.setDate(endDate.getDate() + 1); // Increment the end_date by 1 day
      values.start_date = startDate; // Update the start_date value in the values object
      values.end_date = endDate;
    }
    setStatus();
    if (!editMode) {
      values.members = allusersnamedata.filter(i=>values.members.includes(i.name)).map(j=>j.id);
      dispatch(createProjectDetailsStart(values));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      dispatch(loadProjectDetailsStart());
      setTimeout(() => { dispatch(loadProjectDetailsStart()); }, 500);
    } else {
      values.members = allusersnamedata.filter(i=>values.members.includes(i.name)).map(j=>j.id);
      dispatch(updateProjectDetailsStart({ id: values?.id, values }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadProjectDetailsStart()); }, 500);
      resetForm();
      handleClose();
    }
  };
  const editHandler = (id) => {
    const project = expertprojectdata.find((row) => row.id === id);
  setEditMode(true)
    if (project) {
      const memberNames = project.members_list.map((member) => member.name);
      formik.setValues({
        id: project.id,
        project_name: project.project_name,
        status: project.status,
        start_date: project.start_date,
        end_date: project.end_date,
        members: memberNames || [], // Make sure memberNames is an array
      });  
      handleOpen(); // Open the modal
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteProjectDetailsStart(id));
      setTimeout(() => {
        dispatch(loadProjectDetailsStart());
      }, 500);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])
  const expertprojectdata = useSelector((state) => state.expertProjectdata.data || []);
  useEffect(() => {
    dispatch(loadProjectDetailsStart());
  }, [])
  let id = userInfo.id;
  useEffect(() => {
    if (id) {
      setEditMode(true);
      formik.setValues(userInfo);
      handleOpen();
    }
    else {
      setEditMode(false);
    }
  }, [userInfo]);
  const [selectedNames, setSelectedNames] = useState([]);
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertprojectdata}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, expertprojectdata,
    editHandler,
    deleteHandler
  ]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Projects"
            />
            <Controls.ReusableButton
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)'
              }}
              buttonVariant="contained"
              buttonColor="info"
              buttonText="Add"
              startIcon={<Controls.AddIcon />}
              onClick={() => { handleOpen(); }}
            />
          </Controls.Box>
        </Controls.Paper>
        <Controls.Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
            <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
              <Controls.Grid>
                <Controls.Box sx={style}>
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                    Add project
                  </Controls.Typography>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="project_name"
                    variant="filled"
                    label="Project Name"
                    name="project_name"
                    onBlur={formik.handleBlur}
                    value={formik.values.project_name}
                    onChange={formik.handleChange}
                    error={formik.touched.project_name && Boolean(formik.errors.project_name)}
                    helperText={formik.touched.project_name && formik.errors.project_name}
                  />
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="status"
                    variant="filled"
                    label="Status"
                    name="status"
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      InputProps={{
                        disableUnderline: true,
                      }}
                      renderInput={(params) => (
                        <Controls.TextField
                          fullWidth
                          variant='filled'
                          margin="dense"
                          name="start_date"
                          {...params}
                          error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                          helperText={formik.touched.start_date && formik.errors.start_date}
                        />
                      )}
                      name="start_date"
                      value={formik.values.start_date}
                      onBlur={formik.handleBlur}
                      // onChange={(startDate) => {
                      //   formik.setFieldTouched("start_date");
                      //   formik.setFieldValue("start_date", startDate ? startDate.toString() : '');
                      // }}
                      onChange={(startDate) => { 
                        handleOnChange(startDate);
                        formik.setFieldValue("start_date", startDate ? startDate.toString() : '');
                       }}
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      label="Start Date"
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      InputProps={{
                        disableUnderline: true,
                      }}
                      renderInput={(params) => (
                        <Controls.TextField
                          fullWidth
                          variant="filled"
                          margin="dense"
                          name="end_date"
                          {...params}
                          error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                          helperText={formik.touched.end_date && formik.errors.end_date}
                        />
                      )}
                      name="end_date"
                      value={formik.values.end_date}
                      onBlur={formik.handleBlur}
                      // onChange={(end_date) => {
                      //   formik.setFieldTouched("end_date");
                      //   formik.setFieldValue("end_date", end_date ? end_date.toString() : '');
                      // }}
                      onChange={(endDate) => { 
                        handleOnChangeone(endDate);
                        formik.setFieldValue("end_date", endDate ? endDate.toString() : '');
                       }}
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      label="Date of Exit"
                    />
                  </LocalizationProvider>
                  <Controls.TextField
                    select
                    fullWidth
                    variant='filled'
                    name='members'
                    label="Members"
                    placeholder='Select Leave'
                    multiple
                    value={Array.isArray(formik.values.members) ? formik.values.members : []}
                    onChange={(event) => {
                      const selectedNames = event.target.value;
                      setSelectedNames(selectedNames);
                      formik.setFieldValue('members', selectedNames);
                    }}
                    onBlur={formik.handleBlur}
                    SelectProps={{
                      multiple: true,
                      renderValue: (selected) => {
                        return selected;
                      },
                    }}
                    error={formik.touched.members && Boolean(formik.errors.members)}
                    helperText={formik.touched.members && formik.errors.members}
                  >
                    {Array.isArray(allusersnamedata) && allusersnamedata.length > 0 ? (
                      allusersnamedata.map((item, index) => (
                        <Controls.MenuItem key={index} value={item.name}>
                          {item.name}
                        </Controls.MenuItem>
                      ))
                    ) : (
                      <Controls.MenuItem value="">
                        <em>No data available</em>
                      </Controls.MenuItem>
                    )}
                  </Controls.TextField>
                  <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.ReusableButton
                      buttonVariant="contained"
                      buttonText="Close"
                      onClick={() => { handleClose(); }}
                      sx={{
                        width: 20,
                        height: 35,
                        mt: 2,
                        bgcolor: red[500],
                        textTransform: 'none',
                        borderRadius: '20px',
                        boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          bgcolor: red[500],
                        },
                      }}
                    />
                    <Controls.ReusableButton
                      buttonType="submit"
                      buttonVariant="contained"
                      buttonColor="info"
                      buttonText={!editMode ? "Add" : "Update"}
                      sx={{
                        width: 20,
                        height: 35,
                        mt: 2,
                        bgcolor: 'info',
                        textTransform: 'none',
                        borderRadius: '20px',
                        boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </form>
        </Controls.Modal>
      </Controls.Box>
      <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
        {expertprojectdata?.length >= 0 && expertprojectdata
          ? (memoizedTable)
          : null}
      </Controls.Paper>
      <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            onChange={handlePageChange}
            count={20} color="primary" />
        </Controls.Grid>
    </>
  )
}
export default ProjectsMangement;