import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDmeritsDetailsStart, loadDmeritsDetailsStart, updateDmeritsDetailsStart } from '../redux/actions/expertDmeritsActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import { initialValues, generateValidationSchema, } from "../components/Validations";
import Pagination from '@mui/material/Pagination';
import Controls from "../components/Controls";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Expert Name" },
  { id: "company_email_id", label: "Company Mail" },
  { id: "merit_type", label: "Merit Type" },
  { id: "reason", label: "Reasons" },
  { id: "seviority", label: "Severity" },
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
const ExpertDmerits = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const formFields = [
    "expert_id",
    "company_email_id",
    "reason",
    "seviority",
    "merit_type",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createDmeritsDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      dispatch(loadDmeritsDetailsStart())
      setTimeout(() => { dispatch(loadDmeritsDetailsStart()) }, 500);
    } else {
      dispatch(updateDmeritsDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadDmeritsDetailsStart()) }, 100);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadDmeritsDetailsStart(page));
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const expertmeritdata = useSelector((state) => state.dmeritsdata.data || []);
  useEffect(() => {
    dispatch(loadDmeritsDetailsStart());
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
    const user = expertmeritdata.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); 
      handleOpen(); 
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
        data={expertmeritdata}
        hideDeleteIcon={true}
        editHandler={editHandler}
        allUsersData={allusersnamedata}
      />
    </Suspense>
  ), [columns, expertmeritdata,
    editHandler
  ]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Expert Merits and Demerits"
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
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
            <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
              <Controls.Grid>
                <Controls.Box sx={style}>
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 1 }}>
                    Merits and Demerits
                  </Controls.Typography>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Expert Name"
                    id="expert_id"
                    name="expert_id"
                    select 
                    fullWidth
                    variant="filled"
                    onBlur={formik.handleBlur}
                    value={formik.values.expert_id}
                    onChange={formik.handleChange}
                    error={formik.touched.expert_id && Boolean(formik.errors.expert_id)}
                    helperText={formik.touched.expert_id && formik.errors.expert_id}
                  >
                    <Controls.MenuItem value="">Select</Controls.MenuItem>
                    {allusersnamedata.map((user) => (
                      <Controls.MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </Controls.MenuItem>
                    ))}
                  </Controls.TextField>
                  <Controls.TextField
                    sx={{ marginTop: '9px' }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    select
                    fullWidth
                    variant='filled'
                    defaultValue=""
                    name='merit_type'
                    label="Merit type"
                    id="merit_type"
                    placeholder='merit type'
                    value={formik.values.merit_type}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.merit_type && Boolean(formik.errors.merit_type)}
                    helperText={formik.touched.merit_type && formik.errors.merit_type}
                  >
                    <Controls.MenuItem value="">Select</Controls.MenuItem>
                    <Controls.MenuItem value='Merits'>Merits</Controls.MenuItem>
                    <Controls.MenuItem value='Demerits'>Demerits</Controls.MenuItem>
                  </Controls.TextField>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="company_email_id"
                    variant="filled"
                    label="Company Email"
                    name="company_email_id"
                    onBlur={formik.handleBlur}
                    value={formik.values.company_email_id}
                    onChange={formik.handleChange}
                    error={formik.touched.company_email_id && Boolean(formik.errors.company_email_id)}
                    helperText={formik.touched.company_email_id && formik.errors.company_email_id}
                  />
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Reasons"
                    id="reason"
                    name='reason'
                    type="text"
                    fullWidth
                    variant="filled"
                    onBlur={formik.handleBlur}
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    error={formik.touched.reason && Boolean(formik.errors.reason)}
                    helperText={formik.touched.reason && formik.errors.reason}
                  />
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Seviority"
                    id="seviority"
                    name='seviority'
                    type="text"
                    fullWidth
                    variant="filled"
                    onBlur={formik.handleBlur}
                    value={formik.values.seviority}
                    onChange={formik.handleChange}
                    error={formik.touched.seviority && Boolean(formik.errors.seviority)}
                    helperText={formik.touched.seviority && formik.errors.seviority}
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
      </Controls.Box>
      <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
        {expertmeritdata?.length >= 0 && expertmeritdata
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
export default ExpertDmerits;