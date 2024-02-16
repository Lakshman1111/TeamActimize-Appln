import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import {TableRow ,TableFooter} from '@mui/material';
import {useState,useEffect,useRef} from 'react'
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ReusableButton from '../components/Button';
import ResuableHeaderTypo from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {createEmergencyDetailsStart,loadEmergencyDetailsStart,updateEmergencyDetailsStart,
  deleteEmergencyDetailsStart} from '../redux/actions/emergencyDetailsActions';

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
const EmergencyDetails = () => {
  const [userInfo,setUserInfo]= useState({});
  const [editMode,setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true);}
  const handleClose = () => { setOpen(false);formik.resetForm();setUserInfo({});};
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    mobile_number: '',
    relationship: '',
    address: '',

  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters')
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address format')
      .required('Email is required'),
    mobile_number: Yup.string()
      .required('Mobile Number is required')
      .matches(
        /^[0-9]{10}$/,
        'Invalid mobile Number'
      ),
    relationship: Yup.string()
    .matches(/^[A-Za-z]+$/, { message: 'Name must contain only alphabetic characters' })
    .min(2, 'Relationship is too short')
    .max(50, 'Relationship is too long')
    .required('Relationship is required'),
    address: Yup.string()
      .min(3, 'Address is too short')
      .max(100, 'Address is too long')
      .required('Address is required'),
  });
  
  
  const handleSubmit = (values, { setStatus, resetForm }) => {
    console.log('add Emergency Data', values);
    setStatus();
    if (!editMode) {
      dispatch(createEmergencyDetailsStart(values));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadEmergencyDetailsStart()) }, 500);
    } else {
      dispatch(updateEmergencyDetailsStart({ id, values }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadEmergencyDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
const emergencyData = useSelector((state) => state.emergnecydata.data || []);
  useEffect(() => {
    dispatch(loadEmergencyDetailsStart());
   }, [])
  const handleDelete =(id)=> {
    // alert(id);
    if (window.confirm('confirm to delete')) {
       dispatch(deleteEmergencyDetailsStart(id));
       setTimeout(()=>{dispatch(loadEmergencyDetailsStart())},500);
    }
 }
  let id = userInfo.id;
  console.log(userInfo,'146');
  if(!userInfo){
    console.log(userInfo,'147');
    setEditMode(false);
  }
  useEffect(() => {
    console.log('userInfo', userInfo);
    if (id) {
  
      setEditMode(true);
      formik.setValues(userInfo);
      handleOpen();
    }
    else{
      setEditMode(false);
    }
  }, [userInfo]);
 const handleEdit = (item)=>{
   console.log("user item", item);
  setUserInfo(item);
  formik.setFieldValue(item);
}
  return (
<>
    <Box>
        <Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Emergency Details"
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
              onClick={() => { handleOpen();}}
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
                    Emergency Details
                  </Typography>
                  <TextField
                    InputProps={{
                      disableUnderline: true,
                    }} 
                    margin="dense"
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    InputProps={{
                      disableUnderline: true,
                    }} 
                    margin="dense"
                    label="Email"
                    id="email"
                    name='email'
                    type="email"
                    fullWidth
                    variant="filled"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    InputProps={{
                      disableUnderline: true,
                    }} 
                    label="Mobile Number"
                    margin="dense"
                    id="mobile_number"
                    name="mobile_number"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.mobile_number}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.mobile_number && Boolean(formik.errors.mobile_number)}
                    helperText={formik.touched.mobile_number && formik.errors.mobile_number}
                  />

                  <TextField
                    InputProps={{
                      disableUnderline: true,
                    }} 
                    label="Relationship"
                    margin="dense"
                    id="relationship"
                    name="relationship"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.relationship}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.relationship && Boolean(formik.errors.relationship)}
                    helperText={formik.touched.relationship && formik.errors.relationship}
                  />
                  <TextField
                    InputProps={{
                      disableUnderline: true,
                    }} 
                    label="Address"
                    margin="dense"
                    id="address"
                    name="address"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.address}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                  {/* <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button onClick={handleClose} sx={{ width: 10, height: 30, mt: 2, bgcolor: red[500] }} variant="contained">close</Button>
                    <Button type="submit" sx={{ width: 10, height: 30, mt: 2 }} variant="contained">{!editMode ? "Add" : "Update"}</Button>
                  </Typography> */}
                  <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ReusableButton
                      buttonVariant="contained"
                      // buttonColor="info"
                      buttonText="Close"
                      onClick={()=>{handleClose();}}
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
                      // onClick={handleClose}
                      sx={{
                        width: 20,
                        height: 35,
                        mt: 2,
                        bgcolor: 'info',
                        textTransform: 'none',
                        borderRadius: '20px',
                        boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                        // '&:hover': {
                        // },
                      }}
                    />
                  </Typography>
                  </Box>  
              </Grid>
            </Grid>
          </form>
      </Modal>
      </Box>
      <Paper sx={{ mt: 2, borderRadius: '10px', }}>
        <TableContainer component={Paper} sx={{ borderRadius: '10px', }}>
        <Table sx={{ minWidth: 100}} aria-label="customized table">
         <TableHead>
           <TableRow>
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Mobile&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Address&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Actions&nbsp;</StyledTableCell>
           </TableRow>
         </TableHead>
        <TableBody>
        {emergencyData.length > 0 ? (
  emergencyData.map((item, index) => (
    <StyledTableRow  key={index}>
              <StyledTableCell align="center" component="th" scope="item">
              {index+1}
              </StyledTableCell>
              <StyledTableCell align="center">{item.name}</StyledTableCell>
              <StyledTableCell align="center">{item.email}</StyledTableCell>
              <StyledTableCell align="center">{item.mobile_number}</StyledTableCell>
              <StyledTableCell align="center">{item.address}</StyledTableCell>
              <StyledTableCell align="center" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Link spacing={10}> <ModeEditIcon sx={{ cursor: 'pointer' }} onClick={()=>handleEdit(item)} /></Link>
                <Link> <DeleteIcon onClick={() => handleDelete(item.id)} sx={{ color: 'red', cursor: 'pointer'}}/></Link>
              </StyledTableCell>
            </StyledTableRow>
  ))
) : (
  <TableFooter>
  <TableRow>
    <TableCell align="center" colSpan={12}>
      No Data is available
    </TableCell>
  </TableRow>
</TableFooter>
)}
        </TableBody>
      </Table>
    </TableContainer>
   </Paper>
    </>
    
  )
}

export default EmergencyDetails;