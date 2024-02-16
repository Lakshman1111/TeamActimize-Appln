import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import Controls from "../components/Controls";
import Pagination from '@mui/material/Pagination';
import { createGadgetDetailsStart, deleteGadgetDetailsStart, loadGadgetDetailsStart, updateGadgetDetailsStart } from '../redux/actions/expertGadgetsActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
const ResuableTable = lazy(() => import("../components/Table"));
const style = {
  p: 4,
  top: '52%',
  left: '50%',
  width: 800,
  boxShadow: 30,
  maxHeight: '100%',
  maxWidth: '500vw',
  overflowY: 'auto',
  position: 'absolute',
  backgroundColor: (theme) =>
    theme.palette.common.white,
  transform: 'translate(-50%, -50%)',
};
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Expert Name" },
  { id: "email_id", label: "Email Id" },
  { id: "mobile_number", label: "Contact Number" },
];
const Gadgetsmangement = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const formFields = [
    "expert_id",
    "employee_id",
    "designation",
    "department",
    "reporting_to",
    "email_id",
    "mobile_number",
    "working_location",
    "serial_number",
    "model",
    "color",
    "charger",
    "keyboard",
    "mouse",
    "bag",
    "made_by"
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createGadgetDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadGadgetDetailsStart()) }, 500);
    }
    else {
      dispatch(updateGadgetDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadGadgetDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadGadgetDetailsStart(page));
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const expertsGadgetsData = useSelector((state) => state.expertGadgetdata.data || []);
  useEffect(() => {
    dispatch(loadGadgetDetailsStart());
  }, [])
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])
 
  const editHandler = (id) => {
    const user = expertsGadgetsData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteGadgetDetailsStart(id));
      setTimeout(() => {
        dispatch(loadGadgetDetailsStart());
      }, 500);
    }
  };
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
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertsGadgetsData}
        allUsersData={allusersnamedata}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
      </Suspense>
  ), [columns, expertsGadgetsData,
     editHandler,
     deleteHandler
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
              typographyText="Expert Gadgets"
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
            <Controls.Grid rowSpacing={5} columnSpacing={1} container my={1}>
              <Controls.Grid>
                <Controls.Box sx={style}>
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2" >
                    Employee/Vendor Details
                  </Controls.Typography>
                  <Controls.Grid container rowSpacing={-1} columnSpacing={1} my={1}>
                    <Controls.Grid item xs={6}>
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
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="employee_id"
                        variant="filled"
                        label="Employee Id"
                        name="employee_id"
                        onBlur={formik.handleBlur}
                        value={formik.values.employee_id}
                        onChange={formik.handleChange}
                        error={formik.touched.employee_id && Boolean(formik.errors.employee_id)}
                        helperText={formik.touched.employee_id && formik.errors.employee_id}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="designation"
                        variant="filled"
                        label="Designation "
                        name="designation"
                        onBlur={formik.handleBlur}
                        value={formik.values.designation}
                        onChange={formik.handleChange}
                        error={formik.touched.designation && Boolean(formik.errors.designation)}
                        helperText={formik.touched.designation && formik.errors.designation}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="department"
                        variant="filled"
                        label="Department "
                        name="department"
                        onBlur={formik.handleBlur}
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        error={formik.touched.department && Boolean(formik.errors.department)}
                        helperText={formik.touched.department && formik.errors.department}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="reporting_to"
                        variant="filled"
                        label="Reporting To "
                        name="reporting_to"
                        onBlur={formik.handleBlur}
                        value={formik.values.reporting_to}
                        onChange={formik.handleChange}
                        error={formik.touched.reporting_to && Boolean(formik.errors.reporting_to)}
                        helperText={formik.touched.reporting_to && formik.errors.reporting_to}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="email_id"
                        variant="filled"
                        label="Email Id "
                        name="email_id"
                        onBlur={formik.handleBlur}
                        value={formik.values.email_id}
                        onChange={formik.handleChange}
                        error={formik.touched.email_id && Boolean(formik.errors.email_id)}
                        helperText={formik.touched.email_id && formik.errors.email_id}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="mobile_number"
                        variant="filled"
                        label="Mobile Number"
                        name="mobile_number"
                        onBlur={formik.handleBlur}
                        value={formik.values.mobile_number}
                        onChange={formik.handleChange}
                        error={formik.touched.mobile_number && Boolean(formik.errors.mobile_number)}
                        helperText={formik.touched.mobile_number && formik.errors.mobile_number}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="working_location"
                        variant="filled"
                        label="Working Location"
                        name="working_location"
                        onBlur={formik.handleBlur}
                        value={formik.values.working_location}
                        onChange={formik.handleChange}
                        error={formik.touched.working_location && Boolean(formik.errors.working_location)}
                        helperText={formik.touched.working_location && formik.errors.working_location}
                      />
                    </Controls.Grid>
                  </Controls.Grid>
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2" >
                    Device&Accessories
                  </Controls.Typography>

                  <Controls.Grid container rowSpacing={-1} columnSpacing={1} my={1}>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="made_by"
                        variant="filled"
                        label="Made By"
                        name="made_by"
                        onBlur={formik.handleBlur}
                        value={formik.values.made_by}
                        onChange={formik.handleChange}
                        error={formik.touched.made_by && Boolean(formik.errors.made_by)}
                        helperText={formik.touched.made_by && formik.errors.made_by}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField sx={{ marginTop: '9px' }}
                        select
                        fullWidth
                        variant='filled'
                        defaultValue=""
                        name='charger'
                        label="Charger"
                        placeholder='Select Leave'
                        value={formik.values.charger}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          const isCharger = selectedValue === 'true'; // Convert string to boolean
                          formik.setFieldValue('charger', isCharger);
                        }}
                        error={formik.touched.charger && Boolean(formik.errors.charger)}
                        helperText={formik.touched.charger && formik.errors.charger}
                      >
                        <Controls.MenuItem value="">Select</Controls.MenuItem>
                        <Controls.MenuItem value='true'>Yes</Controls.MenuItem>
                        <Controls.MenuItem value='false'>No</Controls.MenuItem>
                      </Controls.TextField>
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="serial_number"
                        variant="filled"
                        label="Serial Number "
                        name="serial_number"
                        onBlur={formik.handleBlur}
                        value={formik.values.serial_number}
                        onChange={formik.handleChange}
                        error={formik.touched.serial_number && Boolean(formik.errors.serial_number)}
                        helperText={formik.touched.serial_number && formik.errors.serial_number}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField sx={{ marginTop: '9px' }}
                        select
                        fullWidth
                        variant='filled'
                        defaultValue=""
                        name='keyboard'
                        label="Keyboard"
                        placeholder=''
                        value={formik.values.keyboard}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          const iskeyboard = selectedValue === 'true'; 
                          formik.setFieldValue('keyboard', iskeyboard);
                        }}
                        error={formik.touched.keyboard && Boolean(formik.errors.keyboard)}
                        helperText={formik.touched.keyboard && formik.errors.keyboard}
                      >
                        <Controls.MenuItem value="">Select</Controls.MenuItem>
                        <Controls.MenuItem value='true'>Yes</Controls.MenuItem>
                        <Controls.MenuItem value='false'>No</Controls.MenuItem>
                      </Controls.TextField>
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="model"
                        variant="filled"
                        label="Model/Type"
                        name="model"
                        onBlur={formik.handleBlur}
                        value={formik.values.model}
                        onChange={formik.handleChange}
                        error={formik.touched.model && Boolean(formik.errors.model)}
                        helperText={formik.touched.model && formik.errors.model}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField sx={{ marginTop: '9px' }}
                        select
                        fullWidth
                        variant='filled'
                        defaultValue=""
                        name='mouse'
                        label="Mouse"
                        placeholder=''
                        value={formik.values.mouse}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          const ismouse = selectedValue === 'true'; 
                          formik.setFieldValue('mouse', ismouse);
                        }}
                        error={formik.touched.mouse && Boolean(formik.errors.mouse)}
                        helperText={formik.touched.mouse && formik.errors.mouse}
                      >
                        <Controls.MenuItem value="">Select</Controls.MenuItem>
                        <Controls.MenuItem value='true'>Yes</Controls.MenuItem>
                        <Controls.MenuItem value='false'>No</Controls.MenuItem>
                      </Controls.TextField>
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField
                        InputProps={{
                          disableUnderline: true,
                        }}
                        fullWidth
                        type="text"
                        margin="dense"
                        id="color"
                        variant="filled"
                        label="Color "
                        name="color"
                        onBlur={formik.handleBlur}
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        helperText={formik.touched.color && formik.errors.color}
                      />
                    </Controls.Grid>
                    <Controls.Grid item xs={6}>
                      <Controls.TextField sx={{ marginTop: '9px' }}
                        select
                        fullWidth
                        variant='filled'
                        defaultValue=""
                        name='bag'
                        label="Bag"
                        placeholder=''
                        value={formik.values.bag}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          const isbag = selectedValue === 'true'; 
                          formik.setFieldValue('bag', isbag);
                        }}
                        error={formik.touched.bag && Boolean(formik.errors.bag)}
                        helperText={formik.touched.bag && formik.errors.bag}
                      >
                        <Controls.MenuItem value="">Select</Controls.MenuItem>
                        <Controls.MenuItem value='true'>Yes</Controls.MenuItem>
                        <Controls.MenuItem value='false'>No</Controls.MenuItem>
                      </Controls.TextField>
                    </Controls.Grid>
                  </Controls.Grid>
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
                          bgcolor:Controls.red[500],
                        },
                      }}
                    />
                    <Controls.ReusableButton
                      buttonType="submit"
                      buttonVariant="contained"
                      buttonColor="info"
                      buttonText={!editMode ? "Add" : "Update"}
                      // onClick={handleClose}
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
        {expertsGadgetsData?.length >= 0 && expertsGadgetsData
          ?(memoizedTable)
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

export default Gadgetsmangement;