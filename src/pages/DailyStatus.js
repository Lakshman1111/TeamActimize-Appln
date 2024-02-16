import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect,useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { createStatusDetailsStart, deleteStatusDetailsStart, loadStatusDetailsStart, updateStatusDetailsStart, } from '../redux/actions/dailyStatusActions';
import Controls from "../components/Controls";
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "created_at", label: "Date" },
  { id: "daily_status", label: "Status/Update" },
  { id: "task_name", label: "Task Name" },
  { id: "description", label: "Description" },
  { id: "task_progress", label: "Task Progress" },
  { id: "total_hours", label: "Total Hours" },
  { id: "worked_hours", label: "Worked Hours" },
];
const formFields = [
  "daily_status",
  "task_progress",
  "task_name",
  "description",
  "total_hours",
  "worked_hours",
];
const validationSchema = generateValidationSchema(formFields);
const style = {
  pr: 2,
  pb: 2,
  pt: 2,
  top: '45%',
  left: '50%',
  width: 650,
  boxShadow: 24,
  maxHeight: '100%',
  maxWidth: '100vw',
  overflowY: 'auto',
  position: 'absolute',
  backgroundColor: (theme) =>
    theme.palette.common.white,
  transform: 'translate(-50%, -50%)',
};
const DailyStatus = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [modalType, setModalType] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const dailyStatusData = useSelector((state) => state.statusdata.data);
  useEffect(() => {
    dispatch(loadStatusDetailsStart());
  }, [])
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteStatusDetailsStart(id));
      setTimeout(() => {
        dispatch(loadStatusDetailsStart());
      }, 500);
    }
  };
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
  const editHandler = (id) => {
    const user = dailyStatusData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
};
  const showModal = (data) => {
    setShow(true);
    setData(data);
  }
  const closeModal = () => {
    setShow(false);
  }
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createStatusDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadStatusDetailsStart()) }, 500);
    } else {
      dispatch(updateStatusDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadStatusDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadStatusDetailsStart(page));
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
        data={dailyStatusData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, dailyStatusData, editHandler, deleteHandler]);
  return (
    <>
      <Controls.Box>
        <Controls.ReusablePaper elevation={1}>
          <Controls.Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Controls.ResuableHeaderTypo typographyText="Daily Status" />
            <Controls.ReusableButton
              startIcon={<Controls.AddIcon />}
              onClick={() => {
                handleOpen();
              }}
            />
          </Controls.Box>
        </Controls.ReusablePaper>
        <Controls.Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
            <Controls.Grid rowSpacing={0} columnSpacing={2} container my={3} sx={style}>
              <Controls.Grid item xs={12}>
                <Controls.Box>
                  <Controls.Typography sx={{ ml: 1 }} id="modal-modal-title" variant="h5" component="h2">
                    {!editMode ? 'Add Daily Status' : 'Edit Daily Status'}
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    select
                    variant='filled'
                    placeholder='Select Status'
                    name='daily_status'
                    label="Select Status"
                    value={formik.values.daily_status}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.daily_status && Boolean(formik.errors.daily_status)}
                    helperText={formik.touched.daily_status && formik.errors.daily_status} >
                    <Controls.MenuItem value=''>Select</Controls.MenuItem>
                    <Controls.MenuItem value='status'>Status</Controls.MenuItem>
                    <Controls.MenuItem value='update'>Update</Controls.MenuItem>
                  </Controls.TextField>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    select
                    variant='filled'
                    placeholder='Select Progress'
                    name='task_progress'
                    label="Select Progress"
                    value={formik.values.task_progress}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.task_progress && Boolean(formik.errors.task_progress)}
                    helperText={formik.touched.task_progress && formik.errors.task_progress}>
                    <Controls.MenuItem value=''>Select</Controls.MenuItem>
                    <Controls.MenuItem value='completed'>Completed</Controls.MenuItem>
                    <Controls.MenuItem value='inprogress'>In Progress</Controls.MenuItem>
                    <Controls.MenuItem value='incomplete'>InComplete</Controls.MenuItem>
                    <Controls.MenuItem value='juststarted'>Just Started</Controls.MenuItem>
                  </Controls.TextField>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12}>
                <Controls.Box p={1}>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    disabled={modalType === 'view' ? true : false}
                    label="Task Name"
                    margin="dense"
                    id="task_name"
                    name="task_name"
                    type="text"
                    variant="filled"
                    value={formik.values.task_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.task_name && Boolean(formik.errors.task_name)}
                    helperText={formik.touched.task_name && formik.errors.task_name}/>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12}>
                <Controls.Box p={1}>
                  <Controls.TextField
                    InputProps={{ disableUnderline: true,}}
                    fullWidth
                    disabled={modalType === 'view' ? true : false}
                    label="Description"
                    multiline
                    maxRows={2}
                    margin="dense"
                    id="description"
                    name="description"
                    type="text"
                    variant="filled"
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    label="Total Hours"
                    margin="dense"
                    id="total_hours"
                    name="total_hours"
                    type="number"
                    variant="filled"
                    value={formik.values.total_hours}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.total_hours && Boolean(formik.errors.total_hours)}
                    helperText={formik.touched.total_hours && formik.errors.total_hours}
                  />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    label="Active Hours"
                    margin="dense"
                    id="worked_hours"
                    name="worked_hours"
                    type="number"
                    variant="filled"
                    value={formik.values.worked_hours}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.worked_hours && Boolean(formik.errors.worked_hours)}
                    helperText={formik.touched.worked_hours && formik.errors.worked_hours} />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12}>
                <Controls.Box p={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Controls.ReusableButton
                    buttonVariant="contained"
                    buttonColor="info"
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
                        bgcolor: Controls.red[500], },}} />
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
                      boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',}} />
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </form>
        </Controls.Modal>
      </Controls.Box>
            <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
        {dailyStatusData?.length >= 0 && dailyStatusData
          ? (memoizedTable)
          : null}
      </Controls.Paper>
      <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            onChange={handlePageChange}
            count={20} color="primary" />
        </Controls.Grid>
    </>
  )
}
export default DailyStatus;