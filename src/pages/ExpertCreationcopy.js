
import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Fab from '@mui/material/Fab';   
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { Box,Grid,Paper,Typography,TextField,Button,Container} from '@mui/material';
import {createBankDetailsStart,loadBankDetailsStart,} from '../redux/actions/bankDetailsActions';
import ReusableButton from '../components/Button';
import ResuableHeaderTypo from '../components/Header';
import { createExpertCreationStart } from '../redux/actions/ExpertCreationActions';

const ExpertCreation = () => {
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState('');
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    user_name:'',
    personal_email:'',
    user_Desgination:'',
    employee_Id:'',
    password:'',
    confirmPassword:'',
  }
  const validationSchema = Yup.object({

    name: Yup
      .string()
      .min(3, ' Name At least 3 characters ')
      .max(30)
      .required(' Name is required'),
      user_name: Yup
      .string()
      .min(3, 'User Name At least 3 characters ')
      .max(30)
      .required('User Name is required'),
      personal_email: Yup
      .string()
      .email("Invalid  email address format")
      .required(" Email  Id is required"),
      user_Roll: Yup
      .string()
      .min(3, 'Designation At least 3 characters ')
      .max(30)
      .required('Designation is required'),
      user_Desgination: Yup
      .string()
      .min(3, 'Designation At least 3 characters ')
      .max(30)
      .required('Designation is required'),
    employee_Id: Yup
      .number()
      .min(4, ' Id  At least 4 digits')
      .max(90000000000000, 'Please provided a valid id ')
      .required('employee id  is required'),
    
      password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!]).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=!)'
      )
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password cannot be longer than 20 characters')
      .required('Password is required'),
      confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
      
  
  });



  const handleSubmit = (values, { setStatus, resetForm }) => {
    console.log('add expert details', values);
    setStatus();
    if (!editMode) {
      dispatch(createExpertCreationStart(values));
      // resetForm();
      toast.success('Data Added Successfully');
    } 
    // else {
    //   dispatch(createBankDetailsStart(values));
    //   toast.success('Data Updated Successfully');
    // }
  }



  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  console.log('formik props', formik);

  // const bankData = useSelector((state) => state.bankdata.data);
  // useEffect(() => {
  //   dispatch(loadBankDetailsStart());
  // }, []);
  // console.log('getbankData', bankData);

  // let id = bankData?.id;
  // console.log('id', id);
  // const isAddMode = !id;
  // console.log(Boolean(isAddMode));
  // useEffect(() => {
  //   if (id) {
  //     setEditMode(true);
  //     formik.setValues(bankData);
  //   }
  // }, [bankData]);

  return (
    <>
         <Paper elevation={1} sx={{
        padding: '2px', mb: 1, mt: 1, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <ResuableHeaderTypo
                        typographyComponent="span"
                        typographyVariant="h6"
                        sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
                        typographyText="Expert Creation"
                      />  
                  </Box>
                </Paper>
           <form onSubmit={formik.handleSubmit}>
        <Container 
        // maxWidth='md' 
//         sx={{
//           my: 2, 
//           "&.MuiContainer-root": {
//             paddingLeft: 0,
//             paddingRight: 0
//           },
// }}
>
          <Paper sx={{ padding: '15px', boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)',borderRadius:'20px'}} elevation={2}>
              <Grid rowSpacing={0} columnSpacing={2} container my={1}>
              <Grid item xs={12} sm={12} md={12}>
              <Grid rowSpacing={0} columnSpacing={2} container my={1}>
              <Grid item xs={12} sm={12} md={3}>
                  <Box p={4}>
                  <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Name</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Box p={2}>
                  
                      <TextField 
                          fullWidth
                          autoComplete='off'
                          label="Name"
                          placeholder=''
                          variant="outlined"
                          name="name"
                          type="text"
                          value={formik.values.name}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                  </Box>
                </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
              <Grid columnSpacing={2} container >
              <Grid item xs={12} sm={12} md={3}>
                  <Box p={4}>
                  <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>UserName</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Box p={2}>
                  
                      <TextField 
                          fullWidth
                          autoComplete='off'
                          label="username"
                          placeholder=''
                          variant="outlined"
                          name="user_name"
                          type="text"
                        //   value={formik.values.bank_name}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                          helperText={formik.touched.user_name && formik.errors.user_name}
                        />
                  </Box>
                </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
              <Grid columnSpacing={2} container >
              <Grid item xs={12} sm={12} md={3}>
                  <Box p={4}>
                  <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Email</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Box p={2}>
                  
                      <TextField 
                          fullWidth
                          autoComplete='off'
                          label="Email"
                          placeholder=''
                          variant="outlined"
                          name="personal_email"
                          type="text"
                          value={formik.values.personal_email}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.personal_email && Boolean(formik.errors.personal_email)}
                          helperText={formik.touched.personal_email && formik.errors.personal_email}
                        />
                  </Box>
                </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
              <Grid columnSpacing={2} container >
              <Grid item xs={12} sm={12} md={3}>
                  <Box p={4}>
                  <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Role</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Box p={2}>
                  
                      <TextField 
                          fullWidth
                          autoComplete='off'
                          label="Roll"
                          placeholder=''
                          variant="outlined"
                          name="user_Roll"
                          type="text"
                          value={formik.values.user_Roll}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.user_Roll&& Boolean(formik.errors.user_Roll)}
                          helperText={formik.touched.user_Roll && formik.errors.user_Roll}
                        />
                  </Box>
                </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
              <Grid columnSpacing={2} container >
              <Grid item xs={12} sm={12} md={3}>
                  <Box p={4}>
                  <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Designation</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Box p={2}>
                      <TextField 
                          fullWidth
                          autoComplete='off'
                          label="Designation"
                          placeholder=''
                          variant="outlined"
                          name="user_Desgination"
                          type="text"
                          value={formik.values.user_Desgination}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.user_Desgination && Boolean(formik.errors.user_Desgination)}
                          helperText={formik.touched.user_Desgination && formik.errors.user_Desgination}
                        />
                  </Box>
                </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
              <Grid columnSpacing={2} container >
              <Grid item xs={12} sm={12} md={3}>
                  <Box p={4}>
                  <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Employee Id number</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Box p={2}>
                  
                      <TextField 
                          fullWidth
                          autoComplete='off'
                          label="employee id "
                          placeholder=''
                          variant="outlined"
                          name="employee_Id"
                          type="text"
                          value={formik.values.employee_Id}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.employee_Id && Boolean(formik.errors.employee_Id)}
                          helperText={formik.touched.employee_Id && formik.errors.employee_Id}
                        />
                  </Box>
                </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
              <Grid columnSpacing={2} container >
              <Grid item xs={12} sm={12} md={3}>
                  <Box p={4}>
                  <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>Password</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Box p={2}>
                  
                      <TextField 
                          fullWidth
                          autoComplete='off'
                          label="password"
                          placeholder=''
                          variant="outlined"
                          name="password"
                          type="text"
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                        />
                  </Box>
                </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
              <Grid columnSpacing={2} container >
              <Grid item xs={12} sm={12} md={3}>
                  <Box p={4}>
                  <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}> confirm Password</Typography>
                  </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <Box p={2}>
                  
                      <TextField 
                          fullWidth
                          autoComplete='off'
                          label="Name"
                          placeholder=''
                          variant="outlined"
                          name="confirmPassword"
                          type="text"
                          value={formik.values.confirmPassword}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                  </Box>
                </Grid>

                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box pr={2} sx={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                    <ReusableButton
                      sx={{
                        textTransform: 'none',
                        borderRadius: '20px',
                        boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)'
                      }}
                      buttonType="submit"
                      buttonVariant="contained"
                      buttonColor={!editMode ? "info" : "success"}
                      buttonText={!editMode ? "Add" : "Update"}
                    />  
                  </Box>
                </Grid>
                  
              </Grid>
              </Paper>
        </Container>
            </form> 
    </>
  )
}
export default ExpertCreation