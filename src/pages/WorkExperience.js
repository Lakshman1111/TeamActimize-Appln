import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  createWorkExperienceDetailsStart,
  loadWorkExperienceDetailsStart,
  updateWorkExperienceDetailsStart,
  deleteWorkExperienceDetailsStart,
} from '../redux/actions/workExperienceActions';
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import Controls from "../components/Controls";
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
  backgroundColor: (theme) =>
    theme.palette.common.white,
  transform: 'translate(-50%, -50%)',
};
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "organization_name", label: "Organization" },
  { id: "date_of_join", label: "Joining Date" },
  { id: "date_of_end", label: "Ending Date" },
  { id: "experience", label: "Experience" },
  { id: "designation", label: "Designation" },
];
const formFields = [
  "organization_name",
  "designation",
  "date_of_join",
  "date_of_end",
];
const validationSchema = generateValidationSchema(formFields);
const WorkExperience = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const editHandler = (id) => {
    const user = workExperienceData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteWorkExperienceDetailsStart(id));
      setTimeout(() => {
        dispatch(loadWorkExperienceDetailsStart());
      }, 500);
    }
  };
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createWorkExperienceDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadWorkExperienceDetailsStart()) }, 500);
    } else {
      dispatch(updateWorkExperienceDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadWorkExperienceDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const workExperienceData = useSelector((state) => state.workexpdata.data);
  useEffect(() => {
    dispatch(loadWorkExperienceDetailsStart());
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
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={workExperienceData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, workExperienceData, editHandler, deleteHandler]);
  return (
    <>
      <Controls.Box>
        <Controls.ReusablePaper elevation={1}>
          <Controls.Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Controls.ResuableHeaderTypo typographyText="Work Experience Details" />
            <Controls.ReusableButton
              startIcon={<Controls.AddIcon />}
              onClick={() => {
                handleOpen();
              }}
            />
          </Controls.Box>
        </Controls.ReusablePaper>
        <Controls.Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
            <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
              <Controls.Grid>
                <Controls.Box sx={style}>
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                    Work Experience
                  </Controls.Typography>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="organization"
                    variant="filled"
                    label="Organization"
                    name="organization_name"
                    onBlur={formik.handleBlur}
                    value={formik.values.organization_name}
                    onChange={formik.handleChange}
                    error={formik.touched.organization_name && Boolean(formik.errors.organization_name)}
                    helperText={formik.touched.organization_name && formik.errors.organization_name} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      InputProps={{
                        disableUnderline: true,}}
                      renderInput={(params) => (
                        <Controls.TextField
                          fullWidth
                          variant='filled'
                          margin="dense"
                          name="date_of_join"
                          {...params}
                          error={formik.touched.date_of_join && Boolean(formik.errors.date_of_join)}
                          helperText={formik.touched.date_of_join && formik.errors.date_of_join}/> )}
                      name="date_of_join"
                      value={formik.values.date_of_join}
                      onBlur={formik.handleBlur}
                      onChange={(joinDate) => {
                        formik.setFieldTouched("JoinDate");
                        formik.setFieldValue("date_of_join", joinDate ? joinDate.toString() : ''); }}
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      label="Date of Join"/>
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      InputProps={{
                        disableUnderline: true,}}
                      renderInput={(params) => (
                        <Controls.TextField
                          fullWidth
                          variant='filled'
                          margin="dense"
                          name="date_of_end"
                          {...params}
                          error={formik.touched.date_of_end && Boolean(formik.errors.date_of_end)}
                          helperText={formik.touched.date_of_end && formik.errors.date_of_end}/>)}
                      name="date_of_end"
                      value={formik.values.date_of_end}
                      onBlur={formik.handleBlur}
                      onChange={(endDate) => {
                        formik.setFieldTouched("endDate");
                        formik.setFieldValue("date_of_end", endDate ? endDate.toString() : ''); }}
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      label="Date of End"/>
                  </LocalizationProvider>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Designation"
                    id="designation"
                    name='designation'
                    type="text"
                    fullWidth
                    variant="filled"
                    onBlur={formik.handleBlur}
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                    helperText={formik.touched.designation && formik.errors.designation}/>
                  <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.ReusableButton
                      buttonVariant="contained"
                      buttonText="Close"
                      onClick={() => { handleClose(); }}
                      sx={{
                        width: 20,
                        height: 35,
                        mt: 2,
                        bgcolor: Controls.red[500],
                        textTransform: 'none',
                        borderRadius: '20px',
                        boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                          bgcolor:Controls.red[500],
                        },
                      }}/>
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
                      }} />
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </form>
        </Controls.Modal>
      </Controls.Box>
       <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
        {workExperienceData?.length >= 0 && workExperienceData
          ? (memoizedTable)
          : null}
      </Controls.Paper>
    </>
  )
}
export default WorkExperience;