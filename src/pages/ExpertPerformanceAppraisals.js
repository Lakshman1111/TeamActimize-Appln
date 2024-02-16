import React from 'react'
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Pagination from '@mui/material/Pagination';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createPerformanceDetailsStart, loadPerformanceDetailsStart, updatePerformanceDetailsStart } from '../redux/actions/ExpertPerformanceActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import Controls from "../components/Controls";
import { initialValues, generateValidationSchema, } from "../components/Validations";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Expert Name" },
  { id: "appreciation_date", label: "Apprecation Date" },
  { id: "message", label: "Message" },
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
  borderRadius: '10px',
  position: 'absolute',
  backgroundColor: (theme) =>
    theme.palette.common.white,
  transform: 'translate(-50%, -50%)',
};
const ExpertPerformanceAppraisals = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [dateChanged, setDateChanged] = useState(false); // Track if date field has been changed
  const handleOpen = () => {setDateChanged(false); setOpen(true); }
  const handleOnChange = (appreciationDate) =>{
    formik.setFieldValue('appreciation_date', appreciationDate);

                        setDateChanged(true)
  }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const formFields = [
    "expert_id",
    "appreciation_date",
    "message",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
// Update the start_date value in the values object
if (editMode) {
  if(dateChanged){
    let appreciationDate = new Date(values.appreciation_date);
    appreciationDate.setDate(appreciationDate.getDate() + 1);
    values.appreciation_date = appreciationDate;
  } else {
    values.appreciation_date = values.appreciation_date;
  }
} else {
  // Otherwise, update the date value
  let appreciationDate = new Date(values.appreciation_date);
  appreciationDate.setDate(appreciationDate.getDate() + 1); // Increment the date by 1 day
  values.appreciation_date = appreciationDate;
}
    setStatus();
    if (!editMode) {
 
      dispatch(createPerformanceDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      dispatch(loadPerformanceDetailsStart());
      setTimeout(() => { dispatch(loadPerformanceDetailsStart()) }, 500);
    } else {
   
      dispatch(updatePerformanceDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadPerformanceDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadPerformanceDetailsStart(page));
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const performancedata = useSelector((state) => state.performancedata.data || []);
  useEffect(() => {
    dispatch(loadPerformanceDetailsStart());
  }, [])
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
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
  const handleEdit = (id) => {
    setUserInfo(id);
    formik.setFieldValue(id);
  }
  const editHandler = (id) => {
    const user = performancedata.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
  };
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={performancedata}
        hideDeleteIcon={true}
        editHandler={editHandler}
        allUsersData={allusersnamedata}
      />
    </Suspense>
  ), [columns, performancedata,
    editHandler
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
              typographyText=" Performance Appraisals"
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
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2">
                    Performance Appraisals
                  </Controls.Typography>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Expert Name"
                    id="expert_id"
                    name="expert_id"
                    select
                    fullWidth
                    variant="filled"
                    onBlur={formik.handleBlur}
                    value={formik.values.expert_id}
                    onChange={formik.handleChange}
                    error={formik.touched.expert_id && Boolean(formik.errors.expert_id)}
                    helperText={formik.touched.expert_id && formik.errors.expert_id} >
                    <Controls.MenuItem value="">Select</Controls.MenuItem>
                    {allusersnamedata.map((user) => (
                      <Controls.MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </Controls.MenuItem>
                    ))}
                  </Controls.TextField>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      InputProps={{
                        disableUnderline: true,
                      }}
                      renderInput={(params) => {
                        return (
                        
                          <Controls.TextField
                            fullWidth
                            variant='filled'
                            margin="dense"
                            name="appreciation_date"
                            value={formik.values.appreciation_date}
                            {...params}
                            error={formik.touched.appreciation_date && Boolean(formik.errors.appreciation_date)}
                            helperText={formik.touched.appreciation_date && formik.errors.appreciation_date}
                          />
                        );
                      }}
                      name="appreciation_date"
                      value={formik.values.appreciation_date}
                      onBlur={() => { formik.handleBlur('appreciation_date') }}
                      onChange={(appreciationDate) => { handleOnChange(appreciationDate); }}
                    
                      placeholder="DD-MM-YYYY"
                      label="Appreciation Date"
                    />
                  </LocalizationProvider>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    label="Message"
                    margin="dense"
                    id="message"
                    name="message"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.message}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
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
                          bgcolor: Controls.red[500],
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
        {performancedata?.length >= 0 && performancedata
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
 
export default ExpertPerformanceAppraisals;