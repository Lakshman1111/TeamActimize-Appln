import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createProfileStart, createUserStart } from '../redux/actions/createUserActions';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AvatarEditor from 'react-avatar-editor';
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import { useRef } from 'react';
import Controls from "../components/Controls";
import { loadUsersStart } from '../redux/actions/UserActions';
const PersonalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const personalData = useSelector((state) => state.data.data);
  const id = personalData?.id;
  const isAddMode = !id;
  const formFields = [
    "first_name",
    "last_name",
    "date_of_birth",
    "gender",
    "nationality",
    "marital_status",
    "aadhar_card_number",
    "pan_card_number",
    "mobile_number",
    "company_email",
    "personal_email",
    "permanent_address",
    "present_address",
    "profile_pic",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createUserStart(values));
      resetForm();
      Controls.toast.success('Data Added Successfully');
    } else {
      dispatch(createUserStart(values));
      Controls.toast.success('Data Updated Successfully');
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  useEffect(() => {
    if (id) {
      setEditMode(true);
      formik.setValues(personalData);
    }
  }, [personalData]);
  const [base64String, setBase64String] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const handleZoomIn = () => {
    setScale(prevScale => prevScale * 1.1);
  };
  const handleZoomOut = () => {
    setScale(prevScale => prevScale * 0.9);
  };
  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setShowModal(true);
  };
  const handleSave = () => {
    if (editorRef && editorRef.current) {
      const canvas = editorRef.current.getImage();
      setShowModal(false);
      // Create a new canvas element with reduced size
      const smallerCanvas = document.createElement('canvas');
      const smallerCanvasContext = smallerCanvas.getContext('2d');
      // Set the new canvas dimensions
      smallerCanvas.width = canvas.width * 0.5; // Adjust this factor as needed
      smallerCanvas.height = canvas.height * 0.5; // Adjust this factor as needed
      // Draw the original image onto the smaller canvas
      smallerCanvasContext.drawImage(
        canvas,
        0,
        0,
        smallerCanvas.width,
        smallerCanvas.height
      );
      const base64String = smallerCanvas.toDataURL('image/jpeg', 0.5); // Adjust the quality (0.5 is 50% quality)
      const formData = {
        profile_pic: base64String, // Adding the Base64 string to your form data
      };
      // Dispatching the action with the form data
      dispatch(createProfileStart(formData));
      // Log the Base64 string to the console
      setDecodedProfilePic(base64String);
      setCroppedImage(base64String);
      setBase64String(base64String);
    }
  };
  const editorRef = useRef();
  const users = useSelector((state) => state.data.data);
  const [decodedProfilePic, setDecodedProfilePic] = useState('');
  useEffect(() => {
    if (users && users.profile_pic) {
      const base64Image = users.profile_pic;
      const base64String = base64Image.split(';base64,').pop();
      const cleanedBase64 = base64String.replace(/[^A-Za-z0-9+/]/g, '');
      try {
        const binaryString = window.atob(cleanedBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setDecodedProfilePic(imageUrl);
      } catch (error) {
        console.error('Error decoding base64 string:', error);
      }
    }
  }, [users]);
  useEffect(() => {
    dispatch(loadUsersStart());
  }, [])
  return (
    <Controls.Box component="div">
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Personal Details"/>
            <Controls.ReusableButton
              buttonType="submit"
              buttonColor={!editMode ? "info" : "success"}
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)'
              }}
              buttonVariant="contained"
              buttonText={!editMode ? "Add" : "Update"}
              startIcon={!editMode ? <Controls.AddIcon /> : <Controls.WifiProtectedSetupIcon />} />
          </Controls.Box>
        </Controls.Paper>
        <Controls.Container maxWidth='xlg' sx={{
          my: 2, "&.MuiContainer-root": {
            paddingLeft: 0,
            paddingRight: 0 }, }}>
          <Controls.Paper sx={{ width: '100%', height: '100%', padding: '15px', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} elevation={2}>
            <Controls.Grid rowSpacing={2} columnSpacing={2} container p={3}>
              <Controls.Grid item xs={12} sm={6} md={4}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    fullWidth
                    type='text'
                    margin="dense"
                    name='first_name'
                    autoComplete="off"
                    variant='outlined'
                    label='First Name'
                    onBlur={formik.handleBlur}
                    placeholder='Your first name'
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    helperText={formik.touched.first_name && formik.errors.first_name}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}/>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={6} md={4}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    fullWidth
                    type='text'
                    margin="dense"
                    name='last_name'
                    label='Last Name'
                    variant='outlined'
                    onBlur={formik.handleBlur}
                    placeholder='Your last name'
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    helperText={formik.touched.last_name && formik.errors.last_name} />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={6} md={4}>
                <Controls.Box p={1} >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      renderInput={(params) => (
                        <Controls.TextField
                          fullWidth
                          {...params}
                          margin="dense"
                          variant='outlined'
                          name="date_of_birth"
                          helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                          error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}/>)}
                      name="date_of_birth"
                      onBlur={formik.handleBlur}
                      value={formik.values.date_of_birth}
                      onChange={
                        (birthDate) => {
                          formik.setFieldTouched("birthDate");
                          formik.handleChange({ target: { name: 'date_of_birth', value: birthDate.toString() } }); }}
                      type="date"
                      label="Date of Birth"
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY" />
                  </LocalizationProvider>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={6} md={4}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    select
                    fullWidth
                    name='gender'
                    variant='outlined'
                    label="Select Gender"
                    placeholder='Select gender'
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    helperText={formik.touched.gender && formik.errors.gender}
                    error={formik.touched.gender && Boolean(formik.errors.gender)} >
                    <Controls.MenuItem value=''>Select</Controls.MenuItem>
                    <Controls.MenuItem value='male'>Male</Controls.MenuItem>
                    <Controls.MenuItem value='female'>Female</Controls.MenuItem>
                  </Controls.TextField>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={6} md={4}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    fullWidth
                    variant='outlined'
                    name='nationality'
                    label='Nationality'
                    placeholder='Nationality'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.nationality}
                    helperText={formik.touched.nationality && formik.errors.nationality}
                    error={formik.touched.nationality && Boolean(formik.errors.nationality)} />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12} sm={6} md={4}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    select
                    fullWidth
                    variant='outlined'
                    name='marital_status'
                    label='Marital Status'
                    onBlur={formik.handleBlur}
                    placeholder='Your nationality'
                    onChange={formik.handleChange}
                    value={formik.values.marital_status}
                    helperText={formik.touched.marital_status && formik.errors.marital_status}
                    error={formik.touched.marital_status && Boolean(formik.errors.marital_status)}>
                    <Controls.MenuItem value=''>Select</Controls.MenuItem>
                    <Controls.MenuItem value='single'>Single</Controls.MenuItem>
                    <Controls.MenuItem value='married'>Married</Controls.MenuItem>
                  </Controls.TextField>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Paper>
        </Controls.Container>
        <Controls.Container maxWidth='xlg' sx={{
          my: 2, "&.MuiContainer-root": {
            paddingLeft: 0,
            paddingRight: 0 },}}>
          <Controls.Grid rowSpacing={2} columnSpacing={4} container my={2}>
            <Controls.Grid item xs={12} sm={12} md={3.5} >
              <Controls.Paper sx={{ width: '100%', height: '100%', padding: '25px', boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} elevation={1}>
                <Controls.Grid rowSpacing={2} columnSpacing={2} >
                  <Controls.Grid item xs={12} md={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 8 }}>
                    <Controls.Box  >
                    <Controls.Avatar
  key={decodedProfilePic} // Add a unique key to force rerender
  src={decodedProfilePic}
  sx={{ width: 190, height: 190, overflow: 'hidden', marginTop: '28px', boxShadow: '0 0 0 5px #fff' }}
/>
                      <Controls.Box sx={{ position: 'relative', right: '-140px', bottom: '55px', lineHeight: 1, cursor: 'pointer', justifyContent: 'center' }}>
                        <Controls.Avatar sx={{ width: 50, height: 50, backgroundColor: '#e0e0e0' }}>
                          <label htmlFor="upload-button">
                            <Controls.LinkedCameraIcon sx={{ display: 'block', width: 30, height: 30, color: 'black' }} />
                          </label>
                        </Controls.Avatar>
                        <input
                          accept="image/jpeg, image/png, image/jpg"
                          multiple={false}
                          id={1}
                          name="profilePic"
                          type="file"
                          style={{ display: 'none' }}
                        />
                      </Controls.Box>
                    </Controls.Box>
                    <input
                      accept="image/jpeg, image/png, image/jpg"
                      type="file"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="upload-button"
                    />
                    <Controls.Modal open={showModal} onClose={() => setShowModal(false)}>
                      <Controls.Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          bgcolor: 'white',
                          boxShadow: 24,
                          p: 4,
                          borderRadius: 4,
                        }}>
                        <Controls.Grid container direction="column" alignItems="center" spacing={2}>
                          <Controls.Grid item>
                            <div style={{ position: 'relative' }}>
                              <AvatarEditor
                                ref={editorRef}
                                image={image}
                                width={250}
                                height={250}
                                border={50}
                                borderRadius={125}
                                color={[255, 255, 255, 0.6]}
                                scale={scale}
                              />
                              <Controls.IconButton
                                style={{ position: 'absolute', top: 10, right: 10 }}
                                onClick={handleZoomIn} >
                                <Controls.AddIcon />
                              </Controls.IconButton>
                              <Controls.IconButton
                                style={{ position: 'absolute', top: 10, left: 10 }}
                                onClick={handleZoomOut} >
                                <Controls.RemoveIcon />
                              </Controls.IconButton>
                            </div>
                          </Controls.Grid>
                          <Controls.Grid item>
                            <Controls.Button onClick={handleSave}>Save</Controls.Button>
                            <Controls.Button onClick={() => setShowModal(false)}>Close</Controls.Button>
                          </Controls.Grid>
                        </Controls.Grid>
                      </Controls.Box>
                    </Controls.Modal>
                  </Controls.Grid>
                </Controls.Grid>
              </Controls.Paper>
            </Controls.Grid>
            <Controls.Grid item xs={12} sm={12} md={8.5}>
              <Controls.Paper sx={{ width: '100%', height: '100%', padding: '15px', boxShadow: '0px 10px 80px  rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} elevation={2}>
                <Controls.Grid rowSpacing={2} columnSpacing={2} container p={3}>
                  <Controls.Grid item xs={12} sm={12} md={6}>
                    <Controls.Box p={1} >
                      <Controls.TextField
                        fullWidth
                        type='email'
                        variant='outlined'
                        name='personal_email'
                        label='Personal Email'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder='Your personal email'
                        value={formik.values.personal_email}
                        helperText={formik.touched.personal_email && formik.errors.personal_email}
                        error={formik.touched.personal_email && Boolean(formik.errors.personal_email)}
                      />
                    </Controls.Box>
                  </Controls.Grid>
                  <Controls.Grid item xs={12} sm={12} md={6}>
                    <Controls.Box p={1}>
                      <Controls.TextField
                        fullWidth
                        type='email'
                        variant='outlined'
                        name='company_email'
                        label='Company Email'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder='Your company email'
                        value={formik.values.company_email}
                        helperText={formik.touched.company_email && formik.errors.company_email}
                        error={formik.touched.company_email && Boolean(formik.errors.company_email)}
                      />
                    </Controls.Box>
                  </Controls.Grid>
                  <Controls.Grid item xs={12} sm={12} md={4}>
                    <Controls.Box p={1} >
                      <Controls.TextField
                        fullWidth
                        type='text'
                        variant='outlined'
                        label='Aadhar Number'
                        name='aadhar_card_number'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder='Your aadhar number'
                        value={formik.values.aadhar_card_number}
                        helperText={formik.touched.aadhar_card_number && formik.errors.aadhar_card_number}
                        error={formik.touched.aadhar_card_number && Boolean(formik.errors.aadhar_card_number)}
                      />
                    </Controls.Box>
                  </Controls.Grid>
                  <Controls.Grid item xs={12} sm={12} md={4}>
                    <Controls.Box p={1}>
                      <Controls.TextField
                        fullWidth
                        type='text'
                        label='PAN Number'
                        variant='outlined'
                        name='pan_card_number'
                        onBlur={formik.handleBlur}
                        placeholder='Your pan number'
                        onChange={formik.handleChange}
                        value={formik.values.pan_card_number}
                        helperText={formik.touched.pan_card_number && formik.errors.pan_card_number}
                        error={formik.touched.pan_card_number && Boolean(formik.errors.pan_card_number)}
                      />
                    </Controls.Box>
                  </Controls.Grid>
                  <Controls.Grid item xs={12} sm={12} md={4}>
                    <Controls.Box p={1}>
                      <Controls.TextField
                        fullWidth
                        type='text'
                        variant='outlined'
                        name='mobile_number'
                        label='Mobile Number'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder='Your mobile number'
                        value={formik.values.mobile_number}
                        helperText={formik.touched.mobile_number && formik.errors.mobile_number}
                        error={formik.touched.mobile_number && Boolean(formik.errors.mobile_number)}
                      />
                    </Controls.Box>
                  </Controls.Grid>
                  <Controls.Grid item xs={12} sm={12} md={6}>
                    <Controls.Box p={1}>
                      <Controls.TextField
                        fullWidth
                        type='text'
                        size='large'
                        multiline
                        rows={2}
                        // maxRows={1}
                        variant='outlined'
                        name='permanent_address'
                        label='Permanent Address'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder='Your permanent address'
                        value={formik.values.permanent_address}
                        error={formik.touched.permanent_address && Boolean(formik.errors.permanent_address)}
                        helperText={formik.touched.permanent_address && formik.errors.permanent_address}
                      />
                    </Controls.Box>
                  </Controls.Grid>
                  <Controls.Grid item xs={12} sm={12} md={6}>
                    <Controls.Box p={1}>
                      <Controls.TextField
                        fullWidth
                        multiline
                        rows={2}
                        size='large'
                        type='text'
                        variant='outlined'
                        name='present_address'
                        label='Current Address'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder='Your current address'
                        value={formik.values.present_address}
                        helperText={formik.touched.present_address && formik.errors.present_address}
                        error={formik.touched.present_address && Boolean(formik.errors.present_address)}
                      />
                    </Controls.Box>
                  </Controls.Grid>
                </Controls.Grid>
              </Controls.Paper>
            </Controls.Grid>
          </Controls.Grid>
        </Controls.Container>
      </form>
    </Controls.Box>
  )
}
export default PersonalDetails;     