import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect,useMemo, lazy, Suspense  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createSkillDetailsStart, loadSkillDetailsStart,
  updateSkillDetailsStart, deleteSkillDetailsStart,
} from '../redux/actions/skillActions';
import Pagination from '@mui/material/Pagination';
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import Controls from "../components/Controls";
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
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "skill_name", label: "Type of Skill" },
  { id: "rating", label: "Rating" },
];
const formFields = [
  "skill_name",
  "rating",
];
const validationSchema = generateValidationSchema(formFields);
const Skills = () => {
  const [hover, setHover] = React.useState(-1);
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteSkillDetailsStart(id));
      setTimeout(() => {
        dispatch(loadSkillDetailsStart());
      }, 500);
    }
  };
  const editHandler = (id) => {
    const user = skillData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
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
  const skillData = useSelector((state) => state.skilldata.data);
  useEffect(() => {
    dispatch(loadSkillDetailsStart());
  }, [])

  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createSkillDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadSkillDetailsStart()) }, 500);
    } else {
      dispatch(updateSkillDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadSkillDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadSkillDetailsStart(page));
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
        data={skillData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, skillData, editHandler, deleteHandler]);
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
            <Controls.ResuableHeaderTypo typographyText="Skills Details" />
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
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
            <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
              <Controls.Grid>
                <Controls.Box sx={style}>
                  <Controls.Typography id="modal-modal-title" variant="h6" component="h2">Skills Details</Controls.Typography>
                  <Controls.TextField
                    InputProps={{ disableUnderline: true, }}
                    margin="dense"
                    label="Type of Skill"
                    name="skill_name"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.skill_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.skill_name && Boolean(formik.errors.skill_name)}
                    helperText={formik.touched.skill_name && formik.errors.skill_name} />
                  <Controls.Typography component="legend" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
                    <Controls.Typography component="legend" sx={{ fontSize: 20, fontWeight: 'bold' }}>Rating</Controls.Typography>
                    {/* <Controls.Rating
                      sx={{ mr: 4 }}
                      name="rating"
                      precision={0.5}
                      size="large"
                      type="number"
                      defaultValue={1}
                      value={formik.values.rating}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.rating && Boolean(formik.errors.rating)}
                      helperText={formik.touched.rating && formik.errors.rating} /> */}
<Controls.Rating
  sx={{ mr: 4 }}
  name="rating"
  precision={0.5}
  size="large"
  type="number"
  defaultValue={1}
  value={parseInt(formik.values.rating)} // Convert string to number
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  error={formik.touched.rating && Boolean(formik.errors.rating)}
  helperText={formik.touched.rating && formik.errors.rating} />




                  </Controls.Typography>
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
                        '&:hover': { bgcolor: Controls.red[500], },
                      }} />
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
                      }} />
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </form>
        </Controls.Modal>
      </Controls.Box>
        <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
        {skillData?.length >= 0 && skillData
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
export default Skills;





