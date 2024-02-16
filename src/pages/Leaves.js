import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {useState,useEffect,useMemo, lazy, Suspense} from 'react';
import Pagination from '@mui/material/Pagination';
import { 
  Table, 
  TableBody, 
  TableCell, 
  tableCellClasses, 
  TableContainer, 
  TableHead, 
  TableRow, 
  MenuItem  
} from '@mui/material';
import * as dayjs from 'dayjs';    
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import ViewLeaveDetails from './ViewLeaveDetails';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  createLeaveDetailsStart,
  loadLeaveDetailsStart,
  updateLeaveDetailsStart,
  deleteLeaveDetailsStart,
} from '../redux/actions/leaveDetailsActions';
import Controls from "../components/Controls";
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "leave_purpose", label: "Purpose of Leave" },
  { id: "start_date", label: "Start Date" },
  { id: "end_date", label: "End Date " },
  { id: "number_of_leaves", label: "Number of Leaves " },
  { id: "type_of_leave", label: "Type of Leave " },
  { id: "approval", label: "Status " },
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
  backgroundColor: (theme) =>
    theme.palette.common.white,  
  transform: 'translate(-50%, -50%)',
};
const Leaves = () => {
  const [show, setShow] = useState(false);
  const [data,setData] = useState('');
  const [userInfo,setUserInfo]= useState({});
  const [editMode,setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
let id = userInfo.id;
 useEffect(()=>{
   if(id){
      setEditMode(true);
     formik.setValues(userInfo);
      handleOpen();
   }
   else {
     setEditMode(false);
   }
 },[userInfo]);
const deleteHandler = (id) => {
  if (window.confirm("confirm to delete")) {
    dispatch(deleteLeaveDetailsStart(id));
    setTimeout(() => {
      dispatch(loadLeaveDetailsStart());
    }, 500);
  }
};
const editHandler = (id) => {
  const user = leavesData.find((row) => row.id === id);
  if (user) {
    setUserInfo(user);
    formik.setValues(user); 
    handleOpen(); 
  }
};
const leavesData = useSelector((state)=>state.leavedata.data?.leaves);
useEffect(() => {
  dispatch(loadLeaveDetailsStart());
}, [])                      
const showModal = (data) => {
  setShow(true);
  setData(data);
}
const closeModal = () => {
  setShow(false);
}
  const leavesBank = useSelector((state) => state.leavedata.data?.leave_bank);
let cLeaves =  parseInt(leavesBank?.casual_leaves);
let sLeaves =  parseInt(leavesBank?.sick_leaves);
let tCLeaves = parseInt(leavesBank?.taken_casual_leaves);
let tSLeaves = parseInt(leavesBank?.taken_sick_leaves);
let rCLeaves = parseInt(leavesBank?.remaining_casual_leaves);
let rSLeaves = parseInt(leavesBank?.remaining_sick_leaves);
  const formFields = [
    "leave_purpose",
    "start_date",
    "end_date",
    "type_of_leave",
    "number_of_leaves",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createLeaveDetailsStart({
        ...values,
        start_date: dayjs(values.start_date).format('MM-DD-YYYY'),
        end_date: dayjs(values.end_date).format('MM-DD-YYYY')
}));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadLeaveDetailsStart()) }, 500);
    } else {
      dispatch(updateLeaveDetailsStart({
        id, 
        ...values,
        start_date: dayjs(values.start_date).set('hour', 11).format('MM-DD-YYYY'),
        end_date: dayjs(values.end_date).set('hour', 11).format('MM-DD-YYYY') }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadLeaveDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  } 
  const handlePageChange = (event, page) => {
    dispatch(loadLeaveDetailsStart(page));
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={leavesData}
        showRemoveRedEyeIcon={true}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        showModal={showModal}
      />
    </Suspense>
  ), [columns, leavesData, editHandler, deleteHandler,showModal]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Leaves Details"
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
              startIcon={<AddIcon />}
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
                    Leaves Details
                  </Controls.Typography>  
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }} 
                    margin="dense"
                    label="Purpose of Leave"
                    id="leave_purpose"
                    name="leave_purpose"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.leave_purpose}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.leave_purpose && Boolean(formik.errors.leave_purpose)}
                    helperText={formik.touched.leave_purpose && formik.errors.leave_purpose}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker 
                      InputProps={{
                        disableUnderline: true,
                      }}
                      renderInput={(params) => {
                        return <Controls.TextField
                          fullWidth
                          variant='filled'
                          margin="dense"
                          name="start_date"
                          value={formik.values.start_date}
                          {...params}
                          error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                          helperText={formik.touched.start_date && formik.errors.start_date}
                        />
                      }}
                      name="start_date"
                      value={dayjs(formik.values.start_date)}
                      onBlur={() => { formik.handleBlur('start_date') }}
                      // onBlur={formik.handleBlur}
                      onChange={(startDate) => {
                        formik.setFieldValue('start_date', startDate);
                      }}
                      placeholder="DD-MM-YYYY"
                      label="Start Date"
                    />
                  </LocalizationProvider>
{/* 
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
                        name="start_date"  // Changed name to "event_date"
                        {...params}
                        error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                        helperText={formik.touched.start_date && formik.errors.start_date}
                      />
                    )}
                    name="start_date"  // Changed name to "event_date"
                    value={formik.values.start_date} // Update value field to match the new name
                    onBlur={formik.handleBlur}
                    onChange={(startDate) => {
                      formik.setFieldTouched("start_date");
                      formik.setFieldValue("start_date", startDate ? startDate.toString() : '');
                    }}
                    inputFormat="DD-MM-YYYY"
                    placeholder="DD-MM-YYYY"
                    type="date"
                    label="Start Date"  // Changed label to "Holiday Date"
                  />
                </LocalizationProvider> */}
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
                          name="end_date"
                          {...params}
                          error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                          helperText={formik.touched.end_date && formik.errors.end_date}
                        />
                      )}
                      name="end_date"
                      value={formik.values.end_date}
                      // onBlur={() => { formik.handleBlur('end_date') }}
                      onBlur={formik.handleBlur}
                      onChange={(endDate) => {
                        formik.setFieldValue('end_date', endDate);
                      }}
                      format="dd/MM/yyyy"
                      placeholder="DD-MM-YYYY"
                      label="End Date"
                      type="date"
                    />
                  </LocalizationProvider>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Number of Leaves"
                    id="number_of_leaves"
                    name="number_of_leaves"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={formik.values.number_of_leaves}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.number_of_leaves && Boolean(formik.errors.number_of_leaves)}
                    helperText={formik.touched.number_of_leaves && formik.errors.number_of_leaves}
                  />
                  <Controls.TextField
                    sx={{ marginTop: '9px' }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    select                
                    fullWidth
                    variant='filled'
                    defaultValue=""
                    name='type_of_leave'
                    label="Type of Leave"
                    placeholder='Select Leave'
                    value={formik.values.type_of_leave}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.type_of_leave && Boolean(formik.errors.type_of_leave)}
                    helperText={formik.touched.type_of_leave && formik.errors.type_of_leave}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value='Sick'>Sick</MenuItem>
                    <MenuItem value='Casual'>Casual Leave</MenuItem>
                    <MenuItem value='others'>Others</MenuItem>
                  </Controls.TextField>
                  <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Controls.ReusableButton
                      buttonVariant="contained"
                      buttonColor="info"
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
        {leavesData?.length >= 0 && leavesData
          ? (memoizedTable)
          : null}
      </Controls.Paper>
      <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            onChange={handlePageChange}
            count={20} color="primary" />
        </Controls.Grid>
    <ViewLeaveDetails show={show} closeModal={closeModal} data={data}/>
      <Controls.Container maxWidth='xlg' sx={{
        "&.MuiContainer-root": {
          paddingLeft: 0,
          paddingRight: 0
        },
}}>
        <Controls.Grid container rowSpacing={2} columnSpacing={3} my={1}>
          <Controls.Grid item xs={12} sm={12}  md={4}>
            <Controls.Card elevation={1} sx={{
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
              }}>
                <Controls.CardContent>
                  <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 20 }} color="orange" gutterBottom>
                    Total Leaves &ensp;&ensp;{cLeaves + sLeaves}
                  </Controls.Typography>
                  <Controls.Divider variant="fullWidth" color="orange" sx={{ mt: 2, height: 2 }} />
                <Controls.Typography sx={{ mb: 1.5, mt: 3, fontWeight: 'bold', fontSize: 18 }} color="orange">
                    Casuals &ensp;&ensp;{cLeaves}
                  </Controls.Typography>
                <Controls.Typography variant="body2" sx={{ mt: 3, fontWeight: 'bold', fontSize: 15 }} color="orange">
                    Sicks  &ensp;&ensp;{sLeaves}
                  </Controls.Typography>
                </Controls.CardContent>
              </Controls.Card>
          </Controls.Grid>
          <Controls.Grid item xs={12} sm={12}  md={4}>
            <Controls.Card elevation={1} sx={{
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
              }}>
                <Controls.CardContent>
                  <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 20 }} color="blue" gutterBottom>
                  Taken Leaves &ensp;&ensp;{tCLeaves + tSLeaves}
                  </Controls.Typography>
                  <Controls.Divider variant="fullWidth" color="blue" sx={{ mt: 2, height: 2 }} />
                <Controls.Typography sx={{ mb: 1.5, mt: 3, fontWeight: 'bold', fontSize: 18 }} color="blue">
                  Casuals  &ensp;&ensp;{tCLeaves}
                  </Controls.Typography>
                <Controls.Typography variant="body2" sx={{ mt: 3, fontWeight: 'bold', fontSize: 15 }} color="blue">
                  Sicks  &ensp;&ensp;{tSLeaves}
                  </Controls.Typography>
                </Controls.CardContent>
              </Controls.Card>
          </Controls.Grid>
          <Controls.Grid item xs={12} sm={12}  md={4}>
            <Controls.Card elevation={1} sx={{
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
              }}>
                <Controls.CardContent>
                  <Controls.Typography sx={{ fontWeight: 'bold', fontSize: 20 }} color="green" gutterBottom>
                  Remaining Leaves &ensp;&ensp;{rCLeaves + rSLeaves}
                  </Controls.Typography>
                  <Controls.Divider variant="fullWidth" color="green" sx={{ mt: 2, height: 2 }} />
                <Controls.Typography sx={{ mb: 1.5, mt: 3, fontWeight: 'bold', fontSize: 18 }} color="green">
                  Casuals  &ensp;&ensp;{rCLeaves}
                  </Controls.Typography>
                <Controls.Typography variant="body2" sx={{ mt: 3, fontWeight: 'bold', fontSize: 15 }} color="green">
                  Sicks  &ensp;&ensp;{rSLeaves}
                  </Controls.Typography>
                </Controls.CardContent>
              </Controls.Card>
          </Controls.Grid>
        </Controls.Grid>
      </Controls.Container>
    </>
  )
}
export default Leaves;