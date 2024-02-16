import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import { red } from '@mui/material/colors';
import { Table, TableRow, TableHead, TableBody, TableContainer } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react'

import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ReusableButton from '../components/Button';
import ResuableHeaderTypo from '../components/Header';
import AddIcon from '@mui/icons-material/Add';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Link, Box, Grid, Paper, Typography, TextField, Button, MenuItem, TextareaAutosize } from '@mui/material';
import {createFamilyDetailsStart, loadFamilyDetailsStart, updateFamilyDetailsStart, deleteFamilyDetailsStart,
} from '../redux/actions/familyDetailsActions';

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
  borderRadius:'10px',
  // boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
  // bgcolor: 'background.paper',
  backgroundColor: (theme) =>
    theme.palette.common.white,        
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
const FamilyDetails = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {setOpen(true);}
  const handleClose = () => { setOpen(false); formik.resetForm();setUserInfo({});};
  const familyData = useSelector((state) => state.familydata.data); 
  useEffect(() => {
    dispatch(loadFamilyDetailsStart());
  }, [])
  const handleDelete = (id) => {
    if (window.confirm('confirm to delete')) {
      dispatch(deleteFamilyDetailsStart(id));
      setTimeout(() => { dispatch(loadFamilyDetailsStart()) }, 500);
    }
  }
  let id = userInfo.id;
  useEffect(() => {
    if (id) {
      setEditMode(true);
      formik.setValues(userInfo);
      handleOpen();
    } else {
      setEditMode(false);
    }
  }, [userInfo]);

  const handleEdit = (id) => {
    console.log("user", id);
    setUserInfo(id);
    formik.setFieldValue(id);
  }
  const initialValues = {
    name: '',
    email: '',
    mobile_number: '',
    relationship: '',
    address: '',
  };
  const validationSchema = Yup.object({
    name: Yup
      .string()
      .min(2, "Name is Short!")
      .max(50, "Name is Long!")
      .required('Name is required'),
    email: Yup
      .string()
      .email("Invalid email address format")
      .required("Email is required"),
    mobile_number: Yup
      .string()
      .required("Mobile Number is required")
      .matches(
        /^[0-9]{10}$/,
        "Invalid mobile number"
      ),
    relationship: Yup
      .string()
      .min(3, "Relationship is Short!")
      .max(50, "Relationship is Long!")
      .required('Relationship is required'),
    address: Yup
      .string()
      .min(5, "Address is Short!")
      .max(100, "Address is Long!")
      .required('Address is required'),
  });
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createFamilyDetailsStart(values));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadFamilyDetailsStart()) }, 500);
    } else {
      dispatch(updateFamilyDetailsStart({id,values}));
      toast.success('Data Updated Successfully');            
      setTimeout(() => { dispatch(loadFamilyDetailsStart()) }, 500);
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
        <Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',bgcolor:'#fff',borderRadius:'10px' }} >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',  }}>
            <ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{fontSize:'23px' ,mt: 0.5, ml: 2 }}
              typographyText="Family Details"
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
            startIcon={<AddIcon/>}
            // onClick={handleOpen}
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
                    Family Details
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
                  <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ReusableButton
                    buttonVariant="contained"
                    buttonColor="info"
                    buttonText="Close" 
                    onClick={() => {handleClose();}} 
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
                        bgcolor:'info',
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
        <Table aria-label="customized table">
          <TableHead>
            <TableRow >
              <StyledTableCell align="center">S.No</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Relationship&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Mobile&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Address&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Actions&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {familyData?.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center" component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="center">{item.email}</StyledTableCell>
                <StyledTableCell align="center">{item.relationship}</StyledTableCell>
                <StyledTableCell align="center">{item.mobile_number}</StyledTableCell>
                <StyledTableCell align="center">{item.address}</StyledTableCell>
                <StyledTableCell align="center" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Link spacing={10}> <ModeEditIcon sx={{ cursor: 'pointer' }} onClick={() => handleEdit(item)} /></Link>
                  <Link> <DeleteIcon onClick={() => handleDelete(item.id)} sx={{ color: 'red', cursor: 'pointer' }} /></Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </>
  );
};
export default FamilyDetails;