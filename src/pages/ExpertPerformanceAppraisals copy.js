
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {useState,useEffect} from 'react';
import { 
   Grid,
   Box, 
   Container,
   Typography, 
   Paper, 
   Link, 
   Modal, 
   TextField, 
   Divider, 
   CardContent, 
   Card 
  } from '@mui/material';
import { styled } from '@mui/material/styles';
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
import ReusableButton from '../components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import ResuableHeaderTypo from '../components/Header';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ConstructionOutlined } from '@mui/icons-material';
import { createLeaveBankStart, loadLeaveBankStart, updateLeaveBankStart,deleteLeaveBankStart } from '../redux/actions/leaveBankActions';
import { createPerformanceDetailsStart, loadPerformanceDetailsStart } from '../redux/actions/ExpertPerformanceActions';

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
  // bgcolor: 'background.paper',
  transform: 'translate(-50%, -50%)',
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Leaves = () => {
  const [show, setShow] = useState(false);
  const [data,setData] = useState('');
  const [userInfo,setUserInfo]= useState({});
  const [editMode,setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const handleDelete =(id)=> {
  if (window.confirm('confirm to delete')) {
     dispatch(deleteLeaveBankStart(id));
     setTimeout(()=>{dispatch(loadLeaveBankStart())},500);
  }   
}
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
 const handleEdit = (id)=>{
  setUserInfo(id);
   console.log('data', id);
  formik.setFieldValue(id);
}
 const performancedata = useSelector((state) => state.performancedata.data); 
 console.log('performancedata', performancedata);
 useEffect(() => {
   dispatch(loadPerformanceDetailsStart());
 }, []) 
console.log('allleaveBankData for ui', performancedata);
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

  const initialValues = {
    // username: '',
    expert_id:'',
    sick_leaves:'',
    casual_leaves:'',
    // start_date: '',
    // end_date: '',
    // type_of_leave: '',
    // year: '',
  };
  const validationSchema = Yup.object().shape({
      expert_id: Yup
      .number()
      .required('Number of Leaves is required'),
      sick_leaves: Yup
      .number()
      .required('Number of Leaves is required'),
      casual_leaves: Yup
      .number()
      .required('Number of Leaves is required'),
    // type_of_leave: Yup
    //   .string()
    //   .min(2, "Relationship is Short!")
    //   .max(50, "Relationship is Long!")
    //   .required('Relationship is required'),
    
    // start_date: Yup
    //   .date()
    //   .required('Start Date is required'),
    // end_date: Yup
    // .date()
    //   .required('End Date is required'),
      // .min(
      //   Yup.ref('start_date'),
      //   'End Date should be greater than or equal to Start Date'
      // ),
      // year: Yup
      // .number()
      // .required('Number of Leaves is required'),
  });

  
  // start_date: dayjs(values.start_date).set('hour', 11).format('DD-MM-YYYY'),
  //   end_date: dayjs(values.end_date).set('hour', 11).format('DD-MM-YYYY')
  const handleSubmit = (values, { setStatus, }) => {
    console.log('values',values);
    setStatus();
    // if (!editMode) {
    //   console.log('values',);
    //   // console.log(dayjs(values.start_date), 'dddddddddddd'),
    //   // dispatch(
    //   //   createLeaveBankStart({
    //   //     ...values,
    //   //     expert_id: String(values.expert_id),
    //   //     sick_leaves: String(values.sick_leaves),
    //   //     casual_leaves: String(values.casual_leaves),
    //   //     year: String(values.year),
    //   //   })
    //   // );
    //   // resetForm();
    //   handleClose();
    //   toast.success('Data Added Successfully');
    //   setTimeout(() => { dispatch(loadLeaveBankStart()) }, 500);
    // }
    //  else {
    //   // dispatch(updateLeaveDetailsStart({ id, values }));
    //   dispatch(updateLeaveBankStart({
    //     id, 
    //     ...values,
    //     // start_date: dayjs(values.start_date).set('hour', 11).format('DD-MM-YYYY'),
    //     // end_date: dayjs(values.end_date).set('hour', 11).format('DD-MM-YYYY') 
    //   })
    //     );
    //   toast.success('Data Updated Successfully');
    //   setTimeout(() => { dispatch(loadLeaveBankStart()) }, 500);
    //   // resetForm();
    //   handleClose();
    // }
  }
 
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  return (
    <>
  <Box>
        <Paper elevation={1} sx={{ padding: '10px', mb:2, mt:2, boxShadow: '0px 10px 80px rgba(0, 0,0,0.1)',bgcolor:'#fff',borderRadius:'10px' }} >
          <Box sx={{ display:'flex',flexDirection: 'row', justifyContent: 'space-between',}}>
            <ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px',mt:0.5,ml:2}}
              typographyText="Performance Appraisals"
            />
            <ReusableButton
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
          </Box>
        </Paper>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
            <Grid rowSpacing={2} columnSpacing={1} container my={2}> 
              <Grid>
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Leave Bank
                  </Typography>  
                  <TextField
                    InputProps={{
                      disableUnderline: true,
                    }} 
                    margin="dense"
                    label="Expert"
                    id="expert_id"
                    name="expert_id"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={formik.values.expert_id}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.expert_id && Boolean(formik.errors.expert_id)}
                    helperText={formik.touched.expert_id && formik.errors.expert_id}
                  />
                     <TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Sick Leaves"
                    id="sick_leaves"
                    name="sick_leaves"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={formik.values.sick_leaves}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.sick_leaves && Boolean(formik.errors.sick_leaves)}
                    helperText={formik.touched.sick_leaves && formik.errors.sick_leaves}
                  />
                   <TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Casual Leaves"
                    id="casual_leaves"
                    name="casual_leaves"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={formik.values.casual_leaves}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.casual_leaves && Boolean(formik.errors.casual_leaves)}
                    helperText={formik.touched.casual_leaves && formik.errors.casual_leaves}
                  />
                
              
                  {/* <TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="year"
                    id="year"
                    name="year"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.year}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                  /> */}
                 
                  <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ReusableButton
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

                    <ReusableButton
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
                  </Typography>
                </Box>
              </Grid>
            </Grid>
        </form>
      </Modal>
      </Box>
      <Paper sx={{ mt: 3, borderRadius: '10px', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', }}>
    <TableContainer component={Paper} sx={{ borderRadius: '10px', }}>
      <Table sx={{ minWidth: 100}} aria-label="customized table">
        <TableHead>
          <TableRow >
          <StyledTableCell align="center">Expert Name </StyledTableCell>
             <StyledTableCell align="center">Apprecation Date</StyledTableCell>
             <StyledTableCell align="center">Message &nbsp;</StyledTableCell>
            <StyledTableCell align="center">Actions&nbsp;</StyledTableCell>
          <StyledTableCell align="center">  <ReusableButton
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
             />&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {performancedata?.length > 0 && performancedata?.map((item,index) => (
            <StyledTableRow  key={index}>
              <StyledTableCell align="center" component="th" scope="row">
                {index+1}
              </StyledTableCell>
                  <StyledTableCell align="center"sx={{whiteSpace:'pre-line !important',wordWrap:'break-word'}}>{item.expert_id}</StyledTableCell>
              {/* <StyledTableCell align="center">{dayjs(item.start_date).format('DD-MM-YYYY')}</StyledTableCell> */}      
                  <StyledTableCell align="center">{item.appreciation_date}</StyledTableCell>
              {/* <StyledTableCell align="center">{dayjs(item.end_date).format('DD-MM-YYYY')}</StyledTableCell> */}
                  <StyledTableCell align="center">{item.message}</StyledTableCell>
              <StyledTableCell align="center" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {/* <Link spacing={1}> <RemoveRedEyeIcon onClick={()=>{showModal(item)}} /></Link>&nbsp; */}
              {/* <Link spacing={1}> <ModeEditIcon onClick={()=>handleEdit(item)}/></Link> */}
              {item.approval ? (
    <Link spacing={1} style={{ pointerEvents: 'none', opacity: 0.5 }}>
      <ModeEditIcon />
    </Link>
  ) : (
    <Link spacing={1} onClick={!item.approval ? () => handleEdit(item) : null}>
      <ModeEditIcon style={{ cursor: !item.approval ? 'pointer' : 'not-allowed' }} />
    </Link>
  )}
           {item.approval ? (
    <Link spacing={1} style={{ pointerEvents: 'none', opacity: 0.5 }}>
      <DeleteIcon style={{ color: 'rgba(255, 0, 0, 0.5)' }} />
    </Link>
  ) : (
    <Link spacing={1} >
     <DeleteIcon onClick={()=>handleDelete(item.id)} sx={{color:'red'}}/>
    </Link>
  )}
              {/* <Link> <DeleteIcon onClick={()=>handleDelete(item.id)} sx={{color:'red'}}/></Link> */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        
    
      </Table>
    </TableContainer>
  </Paper>
    {/* <ViewLeaveDetails show={show} closeModal={closeModal} data={data}/> */}
      <Container maxWidth='xlg' sx={{
        "&.MuiContainer-root": {
          paddingLeft: 0,
          paddingRight: 0
        },
}}>
        
      </Container>
    </>
  )
}

export default Leaves;









[15:26] Lakshmi Rao Chimmiti
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {useState,useEffect} from 'react';
import {
   Grid,
   Box,
   Container,
   Typography,
   Paper,
   Link,
   Modal,
   TextField,
   Divider,
   CardContent,
   Card
  } from '@mui/material';
  import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
 
import * as dayjs from 'dayjs';    
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import ViewLeaveDetails from './ViewLeaveDetails';
import ReusableButton from '../components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import ResuableHeaderTypo from '../components/Header';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  createLeaveDetailsStart,
  loadLeaveDetailsStart,
  updateLeaveDetailsStart,
  deleteLeaveDetailsStart,
} from '../redux/actions/leaveDetailsActions';
import { ConstructionOutlined } from '@mui/icons-material';
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
  // bgcolor: 'background.paper',
  transform: 'translate(-50%, -50%)',
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
 
const ExpertMonthlyStatus = () => {
  const anchorRef = React.useRef(null);
  const [show, setShow] = useState(false);
  const [data,setData] = useState('');
  const [userInfo,setUserInfo]= useState({});
  const [editMode,setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
 
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  const handleDelete =(id)=> {
  if (window.confirm('confirm to delete')) {
     dispatch(deleteLeaveDetailsStart(id));
     setTimeout(()=>{dispatch(loadLeaveDetailsStart())},500);
  }  
}
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
 const handleEdit = (id)=>{
  setUserInfo(id);
   console.log('data', id);
  formik.setFieldValue(id);
}
const leavesData = useSelector((state)=>state.leavedata.data?.leaves);
console.log('leavesData', leavesData);
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
 
  const initialValues = {
    leave_purpose: '',
    start_date: '',
    end_date: '',
    type_of_leave: '',
    number_of_leaves: '',
  };
  const validationSchema = Yup.object().shape({
    leave_purpose: Yup
      .string()
      .min(2, "expert name is Short!")
      .max(50, "Leave Purpose is Long!")
      .required('expert is required'),
      leave_year: Yup
      .string()
      .min(2, "year is short!")
      .max(50, "year format is Long!")
      .required('Please provide year'),
    type_of_leave: Yup
      .string()
      .min(2, "Relationship is Short!")
      .max(50, "Relationship is Long!")
      .required('Relationship is required'),
   
    start_date: Yup
      .date()
      .required('Start Date is required'),
    end_date: Yup
    .date()
      .required('End Date is required'),
      // .min(
      //   Yup.ref('start_date'),
      //   'End Date should be greater than or equal to Start Date'
      // ),
    number_of_leaves: Yup
      .number()
      .required('Number of Leaves is required'),
      number_of_casualleaves: Yup
      .number()
      .required('Number of Leaves is required'),
  });
 
 
 
  // start_date: dayjs(values.start_date).set('hour', 11).format('DD-MM-YYYY'),
  //   end_date: dayjs(values.end_date).set('hour', 11).format('DD-MM-YYYY')
  const handleSubmit = (values, { setStatus, resetForm }) => {
    console.log('values',values);
    setStatus();
    if (!editMode) {
      console.log('values',values.start_date);
      // console.log(dayjs(values.start_date), 'dddddddddddd'),
      dispatch(createLeaveDetailsStart({
        ...values,
        start_date: dayjs(values.start_date).format('DD-MM-YYYY'),
        end_date: dayjs(values.end_date).format('DD-MM-YYYY')
}));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadLeaveDetailsStart()) }, 500);
    } else {
      // dispatch(updateLeaveDetailsStart({ id, values }));
      dispatch(updateLeaveDetailsStart({
        id,
        ...values,
        start_date: dayjs(values.start_date).set('hour', 11).format('DD-MM-YYYY'),
        end_date: dayjs(values.end_date).set('hour', 11).format('DD-MM-YYYY') }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadLeaveDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
 
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  return (
    <>
      <Box>
        <Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Monthly Status"
            />
            {/* <ReusableButton
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
            /> */}
          </Box>
        </Paper>
      </Box>
     
      <Paper sx={{ mt: 3, borderRadius: '10px', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', }}>
      <Grid rowSpacing={0} columnSpacing={2} container my={1}>
      <Grid item xs={12} sm={12} md={11}>
    <TableContainer component={Paper} sx={{ borderRadius: '10px', }}>
      <Table sx={{ minWidth: 100}} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">Expert</StyledTableCell>
            <StyledTableCell align="center">Month name </StyledTableCell>
            <StyledTableCell align="center">Total Workikng hours&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Expect Workikng hours&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Expect non-working hours&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Expect Leave hours&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {leavesData?.length > 0 && leavesData?.map((item,index) => (
            <StyledTableRow  key={index}>
              <StyledTableCell align="center" component="th" scope="row">
                {index+1}
              </StyledTableCell>
                  <StyledTableCell align="center"sx={{whiteSpace:'pre-line !important',wordWrap:'break-word'}}>{item.leave_purpose}</StyledTableCell>
              {/* <StyledTableCell align="center">{dayjs(item.start_date).format('DD-MM-YYYY')}</StyledTableCell> */}      
                  <StyledTableCell align="center">{item.start_date}</StyledTableCell>
              {/* <StyledTableCell align="center">{dayjs(item.end_date).format('DD-MM-YYYY')}</StyledTableCell> */}
                  <StyledTableCell align="center">{item.end_date}</StyledTableCell>
                  <StyledTableCell align="center">{item.number_of_leaves === null ? 0 : item.number_of_leaves}</StyledTableCell>
              <StyledTableCell align="center">{item.type_of_leave}</StyledTableCell>
              <StyledTableCell align="center">{item.approval===false? 'Not Approved':'Approved'}</StyledTableCell>
              <StyledTableCell align="center" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Link spacing={1}> <RemoveRedEyeIcon onClick={()=>{showModal(item)}} /></Link>&nbsp;
              {/* <Link spacing={1}> <ModeEditIcon onClick={()=>handleEdit(item)}/></Link> */}
              {item.approval ? (
    <Link spacing={1} style={{ pointerEvents: 'none', opacity: 0.5 }}>
      <ModeEditIcon />
    </Link>
  ) : (
    <Link spacing={1} onClick={!item.approval ? () => handleEdit(item) : null}>
      <ModeEditIcon style={{ cursor: !item.approval ? 'pointer' : 'not-allowed' }} />
    </Link>
  )}
           {item.approval ? (
    <Link spacing={1} style={{ pointerEvents: 'none', opacity: 0.5 }}>
      <DeleteIcon style={{ color: 'rgba(255, 0, 0, 0.5)' }} />
    </Link>
  ) : (
    <Link spacing={1} onClick={!item.approval ? () => handleEdit(item) : null}>
     <DeleteIcon onClick={()=>handleDelete(item.id)} sx={{color:'red'}}/>
    </Link>
  )}
              {/* <Link> <DeleteIcon onClick={()=>handleDelete(item.id)} sx={{color:'red'}}/></Link> */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    <Grid item xs={12} sm={12} md={1}>
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Months
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>jan</MenuItem>
                    <MenuItem onClick={handleClose}>feb</MenuItem>
                    <MenuItem onClick={handleClose}>mar</MenuItem>
                    <MenuItem onClick={handleClose}>apr</MenuItem>
                    <MenuItem onClick={handleClose}>may</MenuItem>
                    <MenuItem onClick={handleClose}>jun</MenuItem>
                    <MenuItem onClick={handleClose}>jul</MenuItem>
                    <MenuItem onClick={handleClose}>aug</MenuItem>
                    <MenuItem onClick={handleClose}>sep</MenuItem>
                    <MenuItem onClick={handleClose}>oct</MenuItem>
                    <MenuItem onClick={handleClose}>nov</MenuItem>
                    <MenuItem onClick={handleClose}>Dec</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
    </Grid>
    </Grid>
  </Paper>
 
    </>
  )
}
 
export default ExpertMonthlyStatus;