import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createLeaveBankStart, loadLeaveBankStart, updateLeaveBankStart, deleteLeaveBankStart } from '../redux/actions/leaveBankActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import Pagination from '@mui/material/Pagination';
import Controls from "../components/Controls";
import { initialValues, generateValidationSchema, } from "../components/Validations";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Expert" },
  { id: "casual_leaves", label: "Casual Leaves" },
  { id: "sick_leaves", label: "Sick Leaves" },
  { id: "taken_casual_leaves", label: " Taken Casual Leaves" },
  { id: "taken_sick_leaves", label: "Taken Sick Leaves" },
  { id: "remaining_casual_leaves", label: "Remaining Casual Leaves" },
  { id: "remaining_sick_leaves", label: "Remaining Sick Leaves" },
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

const Leaves = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    if (window.confirm('confirm to delete')) {
      dispatch(deleteLeaveBankStart(id));
      setTimeout(() => { dispatch(loadLeaveBankStart()) }, 500);
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
  const handleEdit = (id) => {
    setUserInfo(id);
    console.log('data', id);
    formik.setFieldValue(id);
  }
  const allleaveBankData = useSelector((state) => state.leaveBankData.data);
  useEffect(() => {
    dispatch(loadLeaveBankStart());
  }, []);
  const showModal = (data) => {
    setShow(true);
    setData(data);
  }
  const closeModal = () => {
    setShow(false);
  }
  const leavesBank = useSelector((state) => state.leavedata.data?.leave_bank);
  const formFields = [
    "expert_id",
    "sick_leaves",
    "casual_leaves",
    "year",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, }) => {
    console.log('values', values);
    setStatus();
    if (!editMode) {
      console.log('values',);
      dispatch(
        createLeaveBankStart({
          ...values,
          expert_id: String(values.expert_id),
          sick_leaves: String(values.sick_leaves),
          casual_leaves: String(values.casual_leaves),
          year: String(values.year),
        })
      );
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadLeaveBankStart()) }, 500);
    }
    else {
      dispatch(updateLeaveBankStart({
        id,
        ...values,
      })
      );
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadLeaveBankStart()) }, 500);
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadLeaveBankStart(page));
  };
  const editHandler = (id) => {
    const user = allleaveBankData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user);
      handleOpen(); 
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteLeaveBankStart(id));
      setTimeout(() => {
        dispatch(loadLeaveBankStart());
      }, 500);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={allleaveBankData}
        allUsersData={allusersnamedata}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, allleaveBankData, editHandler, deleteHandler]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0,0,0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Leaves Bank"
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
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2">
                    Leave Bank
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
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Sick Leaves"
                    id="sick_leaves"
                    name="sick_leaves"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={formik.values.sick_leaves}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.sick_leaves && Boolean(formik.errors.sick_leaves)}
                    helperText={formik.touched.sick_leaves && formik.errors.sick_leaves}
                  />
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Casual Leaves"
                    id="casual_leaves"
                    name="casual_leaves"
                    type="number"
                    fullWidth
                    variant="filled"
                    value={formik.values.casual_leaves}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.casual_leaves && Boolean(formik.errors.casual_leaves)}
                    helperText={formik.touched.casual_leaves && formik.errors.casual_leaves}
                  />
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Year"
                    id="year"
                    name="year"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.year}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                  />
                  <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
        {allleaveBankData?.length >= 0 && allleaveBankData
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

export default Leaves;