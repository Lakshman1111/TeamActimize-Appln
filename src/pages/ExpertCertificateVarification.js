import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { red } from '@mui/material/colors';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReusableButton from '../components/Button';
import ResuableHeaderTypo from '../components/Header';
import { createCertificateDetailsStart, loadCertificateDetailsStart, updateCertificateDetailsStart } from '../redux/actions/expertCertificateActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import Pagination from '@mui/material/Pagination';
import Controls from "../components/Controls";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Name" },
  { id: "message", label: "Message" },
  { id: "note", label: "Note" },
  { id: "status", label: "Status" },
];
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
const ExpertCertificateVarification = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const initialValues = {
    expert_id: '',
    message: '',
    note: '',
    status: '',
  };
  const validationSchema = Yup.object({
    expert_id: Yup
      .string()
      .min(1, "Expert Name is Short!")
      .max(50, "Expert Name is Long!")
      .required('Expert Name is required!'),
    message: Yup
      .string()
      .test('is-not-empty', 'Message is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
      .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
      .matches(/^[A-Za-z\s]+$/, { message: 'Message must contain only alphabetic characters and spaces' }) // Allow spaces
      .min(2, 'Message is too short')
      .max(50, 'Message is too long')
      .required('Message is required'),
    note: Yup
      .string()
      .test('is-not-empty', 'Note is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
      .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
      .matches(/^[A-Za-z\s]+$/, { message: 'Note must contain only alphabetic characters and spaces' }) // Allow spaces
      .min(2, 'Note is too short')
      .max(50, 'Note is too long')
      .required('Note is required'),
    // status
    status: Yup
      .string()
      .min(2, "Relationship is Short!")
      .max(50, "Relationship is Long!")
      .required('Status is required'),
    // start_date: Yup
    // .date()
    // .required('Joining Date is required'),
    // end_date: Yup
    // .date()
    // .required('Ending Date is required'),
  });
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createCertificateDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadCertificateDetailsStart()) }, 500);
    } else {
      dispatch(updateCertificateDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadCertificateDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadCertificateDetailsStart(page));
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const expertcertificate = useSelector((state) => state.certificatedata.data || []);
  useEffect(() => {
    dispatch(loadCertificateDetailsStart());
  }, [])
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
  const editHandler = (id) => {
    const user = expertcertificate.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
  };
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertcertificate}
        hideDeleteIcon={true}
        editHandler={editHandler}
        allUsersData={allusersnamedata}
      />
    </Suspense>
  ), [columns, expertcertificate,
    editHandler
  ]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Certificate Verfication"
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
              startIcon={<Controls.AddIcon />}
              onClick={() => { handleOpen(); }}
            />
          </Controls.Box>
        </Controls.Paper>
        <Controls.Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
            <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
              <Controls.Grid>
                <Controls.Box sx={style}>
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                    Certificate Verfication
                  </Controls.Typography>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="expert_id"
                    variant="filled"
                    label="Expert Name"
                    name="expert_id"
                    onBlur={formik.handleBlur}
                    value={formik.values.expert_id}
                    onChange={formik.handleChange}
                    error={formik.touched.expert_id && Boolean(formik.errors.expert_id)}
                    helperText={formik.touched.expert_id && formik.errors.expert_id}
                    select // Use 'select' for dropdown/select functionality
                  >
                    <Controls.MenuItem value="">Select</Controls.MenuItem>
                    {allusersnamedata.map((user) => (
                      <Controls.MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </Controls.MenuItem>
                    ))}
                  </Controls.TextField>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Message"
                    id="message"
                    name='message'
                    type="text"
                    fullWidth
                    variant="filled"
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Note "
                    id="note"
                    name='note'
                    type="text"
                    fullWidth
                    variant="filled"
                    onBlur={formik.handleBlur}
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    error={formik.touched.note && Boolean(formik.errors.note)}
                    helperText={formik.touched.note && formik.errors.note}
                  />
                  <Controls.TextField
                    sx={{ marginTop: '9px' }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    select
                    fullWidth
                    variant='filled'
                    defaultValue=""
                    name='status'
                    label="Status Type"
                    id="status"
                    placeholder='merit type'
                    value={formik.values.status}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                  >
                    <Controls.MenuItem value="">Select</Controls.MenuItem>
                    <Controls.MenuItem value='pending'>Pending</Controls.MenuItem>
                    <Controls.MenuItem value='Completed'>Completed</Controls.MenuItem>
                  </Controls.TextField>
                  <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ReusableButton
                      buttonVariant="contained"
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
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </form>
        </Controls.Modal>
      </Controls.Box>
      <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
        {expertcertificate?.length >= 0 && expertcertificate
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
export default ExpertCertificateVarification;