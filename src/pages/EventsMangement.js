import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
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
import { createEventmanDetailsStart, deleteEventmanDetailsStart, loadEventmanDetailsStart, updateEventmanDetailsStart } from '../redux/actions/expertEventmanActions';
const SquareCard = styled(Controls.Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'left',
  width: 360,
  height: 350,
  margin: 'auto',
  padding: '20px',
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
  },
});
const EventsMangement = () => {
  const dispatch = useDispatch();
  const expertEventsdata = useSelector((state) => state.expertEventmandata.data || []);
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const formFields = [
    "event_name",
    "event_date",
    "event_time",
    "venue",
    "view",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    values.event_date = dayjs(values.event_date).format('YYYY-MM-DD');
    setStatus();
    if (!editMode) {
      dispatch(createEventmanDetailsStart(values));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadEventmanDetailsStart()) }, 500);
    } else {
      dispatch(updateEventmanDetailsStart({ id, values }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadEventmanDetailsStart()) }, 500);
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
    dispatch(loadEventmanDetailsStart(page));
  };
  useEffect(() => {
    dispatch(loadEventmanDetailsStart());
  }, [])
  const handleDelete = (id) => {
    if (window.confirm('confirm to delete')) {
      dispatch(deleteEventmanDetailsStart(id));
      setTimeout(() => { dispatch(loadEventmanDetailsStart()) }, 500);
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
            typographyText="Schedules and Events"
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
                  Edit Events
                </Controls.Typography>
                <Controls.TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  type="text"
                  margin="dense"
                  id="event_name"
                  variant="filled"
                  label="Event Name"
                  name="event_name"
                  onBlur={formik.handleBlur}
                  value={formik.values.event_name}
                  onChange={formik.handleChange}
                  error={formik.touched.event_name && Boolean(formik.errors.event_name)}
                  helperText={formik.touched.event_name && formik.errors.event_name}
                />
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
                        name="event_date"  // Changed name to "event_date"
                        {...params}
                        error={formik.touched.event_date && Boolean(formik.errors.event_date)}
                        helperText={formik.touched.event_date && formik.errors.event_date}
                      />
                    )}
                    name="event_date"  // Changed name to "event_date"
                    value={formik.values.event_date} // Update value field to match the new name
                    onBlur={formik.handleBlur}
                    onChange={(eventDate) => {
                      formik.setFieldTouched("event_date");
                      formik.setFieldValue("event_date", eventDate ? eventDate.toString() : '');
                    }}
                    inputFormat="DD-MM-YYYY"
                    placeholder="DD-MM-YYYY"
                    type="date"
                    label="Event Date"  // Changed label to "Holiday Date"
                  />
                </LocalizationProvider>
                <Controls.TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  type="text"
                  margin="dense"
                  id="event_time"
                  variant="filled"
                  label="Event Time "
                  name="event_time"
                  onBlur={formik.handleBlur}
                  value={formik.values.event_time}
                  onChange={formik.handleChange}
                  error={formik.touched.event_time && Boolean(formik.errors.event_time)}
                  helperText={formik.touched.event_time && formik.errors.event_time}
                />
                <Controls.TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  type="text"
                  margin="dense"
                  id="venue"
                  variant="filled"
                  label="Event venue"
                  name="venue"
                  onBlur={formik.handleBlur}
                  value={formik.values.venue}
                  onChange={formik.handleChange}
                  error={formik.touched.venue && Boolean(formik.errors.venue)}
                  helperText={formik.touched.venue && formik.errors.venue}
                />
                <Controls.TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  type="text"
                  margin="dense"
                  id="view"
                  variant="filled"
                  label="Event view"
                  name="view"
                  onBlur={formik.handleBlur}
                  value={formik.values.view}
                  onChange={formik.handleChange}
                  error={formik.touched.view && Boolean(formik.errors.view)}
                  helperText={formik.touched.view && formik.errors.view}
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
      <Controls.Grid container spacing={3}>
        {expertEventsdata.map((item, index) => (
          <Controls.Grid item xs={12} sm={6} md={4} key={index} >
            <SquareCard elevation={3}>
              <Controls.Grid container spacing={2}>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    Event Name:
                  </Controls.Typography>
                </Controls.Grid>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    {item.event_name}
                  </Controls.Typography>
                </Controls.Grid>
              </Controls.Grid>
              <Controls.Grid container spacing={2}>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    Event Date :
                  </Controls.Typography>
                </Controls.Grid>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    {dayjs(item.event_date).format('MM-DD-YYYY')}
                  </Controls.Typography>
                </Controls.Grid>
              </Controls.Grid>
              <Controls.Grid container spacing={2}>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    Event Time :
                  </Controls.Typography>
                </Controls.Grid>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    {item.event_time}
                  </Controls.Typography>
                </Controls.Grid>
              </Controls.Grid>
              <Controls.Grid container spacing={2}>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    Event Venue :
                  </Controls.Typography>
                </Controls.Grid>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    {item.venue}
                  </Controls.Typography>
                </Controls.Grid>
              </Controls.Grid>
              <Controls.Grid container spacing={2}>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    Event View :
                  </Controls.Typography>
                </Controls.Grid>
                <Controls.Grid item xs={12} md={6}>
                  <Controls.Typography variant="h6" component="div">
                    {item.view}
                  </Controls.Typography>
                </Controls.Grid>
              </Controls.Grid>
              <Controls.Grid container spacing={2} mt={1}>
                <Controls.Grid item xs={6} sm={4} md={3}>
                  <Controls.Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleEdit(item)}
                    sx={{ height: '100%' }}
                  >
                    Edit
                  </Controls.Button>
                </Controls.Grid>
                <Controls.Grid item xs={6} sm={4} md={6}>
                </Controls.Grid>
                <Controls.Grid item xs={6} sm={4} md={3}>
                  <Controls.Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleDelete(item.id)}
                    sx={{ bgcolor: 'red', height: '100%' }} >
                    Delete
                  </Controls.Button>
                </Controls.Grid>
              </Controls.Grid>
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
export default EventsMangement;