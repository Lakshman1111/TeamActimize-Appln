import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { createHolidayDetailsStart, deleteHolidayDetailsStart, loadHolidayDetailsStart, updateHolidayDetailsStart } from '../redux/actions/expertHolidaysActions';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import Controls from "../components/Controls";
const SquareCard = styled(Controls.Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  width: 300,
  height: 350,
  margin: 'auto',
  padding: '16px',
});
const HolidaysMangement = () => {
  const dispatch = useDispatch();
  const expertholidaydata = useSelector((state) => state.expertHolidaydata.data || []); 
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const formFields = [
    "title",
    "date",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    const { date } = values;
    const parsedDate = dayjs(date);
    const formattedDate = parsedDate.format('DD-MM-YYYY'); // Format the date for logging
    const day = parsedDate.format('dddd');
    values.date = formattedDate
    setStatus();
    if (!editMode) {
      dispatch(createHolidayDetailsStart(values));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadHolidayDetailsStart()) }, 500);
    }
    else {
      dispatch(updateHolidayDetailsStart({ id, values }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadHolidayDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
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
  const handleEdit = (id) => {
    setUserInfo(id);
    formik.setFieldValue(id);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const handlePageChange = (event, page) => {
    dispatch(loadHolidayDetailsStart(page));
  };
  useEffect(() => {
    dispatch(loadHolidayDetailsStart());
  }, [])
  const handleDelete = (id) => {
    if (window.confirm('confirm to delete')) {
      dispatch(deleteHolidayDetailsStart(id));
      setTimeout(() => { dispatch(loadHolidayDetailsStart()) }, 500);
    }
  }
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
  return (
    <div>
      <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
        <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
          <Controls.ResuableHeaderTypo
            typographyComponent="span"
            typographyVariant="h6"
            sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
            typographyText="Experts Holidays List"
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
        aria-describedby="modal-modal-description">
        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
          <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
            <Controls.Grid>
              <Controls.Box sx={style}>
                <Controls.Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                  Holiday 
                </Controls.Typography>
                <Controls.TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  type="text"
                  margin="dense"
                  id="title"
                  variant="filled"
                  label="Holiday Name"
                  name="title"
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}/>
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
                        name="date"  // Changed name to "event_date"
                        {...params}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                      />
                    )}
                    name="date"  // Changed name to "event_date"
                    value={formik.values.date} // Update value field to match the new name
                    onBlur={formik.handleBlur}
                    onChange={(date) => {
                      formik.setFieldTouched("date");
                      formik.setFieldValue("date", date ? date.toString() : '');
                    }}
                    inputFormat="DD-MM-YYYY"
                    placeholder="DD-MM-YYYY"
                    type="date"
                    label=" Holiday Date"  // Changed label to "Holiday Date"
                  />
                </LocalizationProvider>
                <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.ReusableButton
                    buttonVariant="contained"
                    // buttonColor="info"
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
      <Controls.Grid container spacing={3}>
        {expertholidaydata.map((item) => (
          <Controls.Grid item xs={4} sm={12} md={4} key={item.id}>
            <SquareCard elevation={3}>
              <Controls.CardContent>
                <Controls.Paper elevation={10} sx={{ p: 2, mt: 2 }}>
                  <Controls.Typography variant="h6" component="div">
                    Holiday Name:
                  </Controls.Typography>
                  <Controls.Typography variant="h6" component="div">
                    {item.title}
                  </Controls.Typography>
                </Controls.Paper>
                <Controls.Paper elevation={4} sx={{ p: 2, mt: 2 }}>
                  <Controls.Typography variant="h6" component="div">
                  {dayjs(item.date).format('MM-DD-YYYY')}
                  </Controls.Typography>
                  <Controls.Typography variant="h6" component="div">
                    {item.day}
                  </Controls.Typography>
                </Controls.Paper>
                <Controls.Grid container spacing={2} justifyContent="center" mt={5}>
                  <Controls.Grid item>
                    <Controls.Link spacing={10}>
                      <Controls.Button variant="contained" color="primary" sx={{ width: '100%' }}
                        onClick={() => handleEdit(item)}>
                        Edit
                      </Controls.Button>
                    </Controls.Link>
                  </Controls.Grid>
                  <Controls.Grid item>
                    <Controls.Link>  <Controls.Button variant="contained" color="secondary"
                      onClick={() => handleDelete(item.id)} sx={{ width: '100%', bgcolor: 'red' }}>
                      Delete
                    </Controls.Button></Controls.Link>
                  </Controls.Grid>
                </Controls.Grid>
              </Controls.CardContent>
            </SquareCard>
          </Controls.Grid>
        ))}
        <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}> 
        <Pagination
            onChange={handlePageChange}
            count={20} color="primary" />
        </Controls.Grid>
      </Controls.Grid>
    </div>
  );
};
export default HolidaysMangement;