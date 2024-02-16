import React from 'react';
import { useFormik } from 'formik';  
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {createBankDetailsStart,loadBankDetailsStart,} from '../redux/actions/bankDetailsActions';
import Controls from "../components/Controls";
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
const BankDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState('');
  const dispatch = useDispatch();
  const formFields = [
    "bank_name",
    "account_number",
    "ifsc_code",
    "branch_name",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    console.log('addBankData', values);
    setStatus();
    if (!editMode) {
      dispatch(createBankDetailsStart(values));
      toast.success('Data Added Successfully');
      dispatch(loadBankDetailsStart())
    } else {
      dispatch(createBankDetailsStart(values));
      toast.success('Data Updated Successfully');
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const bankData = useSelector((state) => state.bankdata.data);
  useEffect(() => {
    dispatch(loadBankDetailsStart());
  }, []);
  let id = bankData?.id;
  const isAddMode = !id;
  useEffect(() => {
    if (id) {
      setEditMode(true);
      formik.setValues(bankData);
    }
  }, [bankData]);
  return (
    <> 
      <Controls.Paper elevation={1} sx={{
        padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
                  <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Controls.ResuableHeaderTypo
                        typographyComponent="span"
                        typographyVariant="h6"
                        sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
                        typographyText="Bank Details"
                      />
                  </Controls.Box>
                </Controls.Paper>
           <form onSubmit={formik.handleSubmit}>
        <Controls.Container maxWidth='md' sx={{
          my: 11, "&.MuiContainer-root": {
            paddingLeft: 0,
            paddingRight: 0
          },}}>
          <Controls.Paper sx={{ padding: '15px', boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)',borderRadius:'20px'}} elevation={2}>
              <Controls.Grid rowSpacing={1} columnSpacing={2} container my={2}>
                <Controls.Grid item xs={12} sm={12} md={6}>
                  <Controls.Box p={2}>
                      <Controls.TextField 
                          fullWidth
                          autoComplete='off'
                          label="Bank Name"
                          placeholder='Bank Name'
                          variant="outlined"
                          name="bank_name"
                          type="text"
                          value={formik.values.bank_name}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.bank_name && Boolean(formik.errors.bank_name)}
                          helperText={formik.touched.bank_name && formik.errors.bank_name}
                        />
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={6}>
                  <Controls.Box p={2} >
                        <Controls.TextField 
                          fullWidth
                          autoComplete='off'
                          label="Account Number"
                          placeholder='Account Number'
                          name="account_number"
                          type="number"
                          variant="outlined"
                          value={formik.values.account_number}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.account_number && Boolean(formik.errors.account_number)}
                          helperText={formik.touched.account_number && formik.errors.account_number}
                        />
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={6}>
                  <Controls.Box p={2} >
                        <Controls.TextField 
                          fullWidth
                          autoComplete='off'
                          label="IFSC Code"
                          placeholder='IFSC Code'
                          name="ifsc_code"
                          type="text"
                          variant="outlined"
                          value={formik.values.ifsc_code}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.ifsc_code && Boolean(formik.errors.ifsc_code)}
                          helperText={formik.touched.ifsc_code && formik.errors.ifsc_code}
                        />
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={6}>
                  <Controls.Box p={2} >
                        <Controls.TextField 
                          fullWidth
                          autoComplete='off'
                          label="Branch Name"
                          placeholder='Branch Name'
                          name="branch_name"
                          type="text"
                          variant="outlined"
                          value={formik.values.branch_name}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.branch_name && Boolean(formik.errors.branch_name)}
                          helperText={formik.touched.branch_name && formik.errors.branch_name}
                        />
                  </Controls.Box>
                </Controls.Grid>
                <Controls.Grid item xs={12}>
                  <Controls.Box pr={2} sx={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                    <Controls.ReusableButton
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
                  </Controls.Box>
                </Controls.Grid>  
              </Controls.Grid>
              </Controls.Paper>
        </Controls.Container>
            </form> 
    </>
  )
}
export default BankDetails