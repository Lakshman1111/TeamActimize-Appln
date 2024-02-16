import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import { createPayslipDetailsStart } from '../redux/actions/expertPayslipsActions';
import { createPaySlipDetailsApi } from '../redux/apis/expertPaySlipApi';
import {initialValues,  generateValidationSchema,} from "../components/Validations";
import Controls from "../components/Controls";
const PayslipMangement = (data) => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const formFields = [
    "salary",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const [storedResult, setStoredResult] = useState(null);
  const handleSubmit = async (values, { setStatus, resetForm }) => {
    setStatus();
    try {
      const result = await createPaySlipDetailsApi(values);
      setStoredResult(result); // Update storedResult state with the fetched result
      dispatch(createPayslipDetailsStart(values));
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const cellStyle = {
    border: '1px solid #dddddd',
    fontWeight: 'bold',
  };
  return (
    <>
      <Controls.Box>
        <Controls.Grid container spacing={2} justifyContent='center'>
          <Controls.Grid item xs={2.2}>
            <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Controls.ResuableHeaderTypo
                  typographyComponent="span"
                  typographyVariant="h6"
                  sx={{ fontSize: '23px', mt: 1.5, ml: 2, mb: 1.5 }}
                  typographyText="Expert PaySlip"
                />
              </Controls.Box>
            </Controls.Paper>
          </Controls.Grid>
          <Controls.Grid item xs={8}>
            <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                  }}
                  autoComplete="off"
                >
                  <Controls.TextField
                    sx={{ marginTop: '1px', width: '65%' }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="salary"
                    variant="filled"
                    label="Salary(CTC)"
                    name="salary"
                    onBlur={formik.handleBlur}
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    error={formik.touched.salary && Boolean(formik.errors.salary)}
                    helperText={formik.touched.salary && formik.errors.salary}
                  />
                  <Controls.ReusableButton
                    buttonType="submit"
                    buttonVariant="contained"
                    buttonColor="info"
                    buttonText={!editMode ? "Submit" : "Update"}
                    sx={{
                      width: 55,
                      height: 45,
                      mt: 1,
                      ml: 5,
                      bgcolor: 'info',
                      textTransform: 'none',
                      borderRadius: '20px',
                      boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </form>
              </Controls.Box>
            </Controls.Paper>
          </Controls.Grid>
          {storedResult && storedResult.data && (
            <Controls.Grid container spacing={2} justifyContent='center'>
              <Controls.Grid item xs={10}>
                <Controls.Paper>
                  <Controls.TableContainer>
                    <Controls.Table sx={{ minWidth: 650 }}>
                      <Controls.TableHead>
                        <Controls.TableRow>
                          <Controls.TableCell style={cellStyle}>Category</Controls.TableCell>
                          <Controls.TableCell style={cellStyle}>Amount</Controls.TableCell>
                        </Controls.TableRow>
                      </Controls.TableHead>
                      <Controls.TableBody>

                        <Controls.TableRow >
                          <Controls.TableCell style={cellStyle}>Basic</Controls.TableCell>
                          <Controls.TableCell style={cellStyle}>
                            {storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.Basic : 'Loading...'}
                          </Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow >
                          <Controls.TableCell style={cellStyle}>HRA</Controls.TableCell>
                          <Controls.TableCell style={cellStyle}>
                            {storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.HRA : 'Loading...'}
                          </Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow key="sampleKey3">
                          <Controls.TableCell style={cellStyle}>Conveyance</Controls.TableCell>
                          <Controls.TableCell style={cellStyle}>{storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.Conveyance : 'Loading...'}</Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow key="sampleKey4">
                          <Controls.TableCell style={cellStyle}>Medical</Controls.TableCell>
                          <Controls.TableCell style={cellStyle}>{storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.Medical : 'Loading...'}</Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow key="sampleKey5">
                          <Controls.TableCell style={cellStyle}>Other</Controls.TableCell>
                          <Controls.TableCell style={cellStyle}>{storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.Other : 'Loading...'}</Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow key="6">
                          <Controls.TableCell style={cellStyle}>Deductions(Monthly)</Controls.TableCell>
                          <Controls.TableCell>
                            <Controls.TableRow key="sampleKey7">
                              <TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }} style={{ paddingRight: '76px' }}>Deductions</TableCell>
                              <TableCell style={cellStyle}>Amount</TableCell>
                            </Controls.TableRow>
                            <Controls.TableRow key="sampleKey8">
                              <Controls.TableCell style={cellStyle}>professional Tax </Controls.TableCell>
                              <Controls.TableCell style={cellStyle}>
                                {storedResult?.data?.Deductions?.Professional_Tax ?? 'Loading...'}
                              </Controls.TableCell>
                            </Controls.TableRow>
                            <Controls.TableRow key="sampleKey">
                              <Controls.TableCell style={cellStyle}>TDS Monthly  </Controls.TableCell>
                              <Controls.TableCell style={cellStyle}>
                                <Controls.TableRow key="sampleKey5">
                                  <Controls.TableCell style={cellStyle}>Scheme</Controls.TableCell>
                                  <Controls.TableCell style={cellStyle}>Tax</Controls.TableCell>
                                </Controls.TableRow>
                                <Controls.TableRow key="sampleKey5">
                                  <Controls.TableCell style={cellStyle}>New</Controls.TableCell>
                                  <Controls.TableCell style={cellStyle}>
                                    {storedResult?.data?.Deductions?.['TDS_Monthly']?.New ?? 'Loading...'}
                                  </Controls.TableCell>
                                </Controls.TableRow>
                                <Controls.TableRow key="sampleKey5">
                                  <Controls.TableCell style={cellStyle}>old</Controls.TableCell>
                                  <Controls.TableCell style={cellStyle}>
                                    {storedResult?.data?.Deductions?.['TDS_Monthly']?.Old ?? 'Loading...'}
                                  </Controls.TableCell>
                                </Controls.TableRow>
                              </Controls.TableCell>
                            </Controls.TableRow>
                          </Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow key="sampleKey5">
                          <Controls.TableCell style={cellStyle}>Total Salary Monthly</Controls.TableCell>
                          <Controls.TableCell style={cellStyle}>
                            {storedResult?.data?.Total_Salary ?? 'Loading...'}
                          </Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow key="sampleKey5">
                          <Controls.TableCell style={cellStyle}>Net Salary Monthly</Controls.TableCell>
                          <Controls.TableCell>
                            <Controls.TableRow key="sampleKey5">
                              <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }} style={{ paddingRight: '76px' }}>Scheme</Controls.TableCell>
                              <Controls.TableCell style={cellStyle}>Amount
                              </Controls.TableCell>
                            </Controls.TableRow>
                            <Controls.TableRow key="sampleKey5">
                              <Controls.TableCell style={cellStyle}>New
                              </Controls.TableCell>
                              <Controls.TableCell style={cellStyle}>
                                {storedResult?.data?.TDS_Yearly?.New ?? 'Loading...'}
                              </Controls.TableCell>
                            </Controls.TableRow>
                            <Controls.TableRow key="sampleKey5">
                              <Controls.TableCell style={cellStyle}>old
                              </Controls.TableCell>
                              <Controls.TableCell style={cellStyle}>
                                {storedResult?.data?.TDS_Yearly?.Old ?? 'Loading...'}
                              </Controls.TableCell>
                            </Controls.TableRow>
                          </Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow key="sampleKey1">
                          <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Total CTC</Controls.TableCell>
                          <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>
                            {storedResult?.data?.Total_CTC ?? 'Loading...'}
                          </Controls.TableCell>
                        </Controls.TableRow>
                        <Controls.TableRow key="sampleKey5">
                          <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>TDS Yearly</Controls.TableCell>
                          <Controls.TableCell>
                            <Controls.TableRow key="sampleKey5">
                              <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }} style={{ paddingRight: '76px' }}>Scheme</Controls.TableCell>
                              <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>Amount
                              </Controls.TableCell>
                            </Controls.TableRow>
                            <Controls.TableRow key="sampleKey5">
                              <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>New
                              </Controls.TableCell>
                              <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>
                                {storedResult?.data?.TDS_Yearly?.New ?? 'Loading...'}
                              </Controls.TableCell>
                            </Controls.TableRow>
                            <Controls.TableRow key="sampleKey5">
                              <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>old
                              </Controls.TableCell>
                              <Controls.TableCell sx={{ border: '1px solid #dddddd', fontWeight: 'bold' }}>
                                {storedResult?.data?.TDS_Yearly?.Old ?? 'Loading...'}
                              </Controls.TableCell>
                            </Controls.TableRow>
                          </Controls.TableCell>
                        </Controls.TableRow>
                      </Controls.TableBody>
                    </Controls.Table>
                  </Controls.TableContainer>
                </Controls.Paper>
              </Controls.Grid>
            </Controls.Grid>
          )}
        </Controls.Grid>
      </Controls.Box>
    </>
  )
}
export default PayslipMangement;