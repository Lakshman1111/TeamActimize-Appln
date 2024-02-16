import React from 'react'
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  createEmergencyDetailsStart, loadEmergencyDetailsStart, updateEmergencyDetailsStart,
  deleteEmergencyDetailsStart
} from '../redux/actions/emergencyDetailsActions';
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import Controls from "../components/Controls";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "relationship", label: "Relationship" },
  { id: "mobile_number", label: "Mobile" },
  { id: "address", label: "Address" },
];
const EmergencyDetails = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const editHandler = (id) => {
    const user = emergencyData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); 
      handleOpen();
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteEmergencyDetailsStart(id));
      setTimeout(() => {
        dispatch(loadEmergencyDetailsStart());
      }, 500);
    }
  };
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createEmergencyDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadEmergencyDetailsStart()) }, 500);
    } else {
      dispatch(updateEmergencyDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadEmergencyDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const formFields = [
    "name",
    "email",
    "mobile_number",
    "relationship",
    "address",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const emergencyData = useSelector((state) => state.emergnecydata.data || []);
  useEffect(() => {
    dispatch(loadEmergencyDetailsStart());
  }, [])

  let id = userInfo.id;
  if (!userInfo) {
    setEditMode(false);
  }
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
        data={emergencyData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, emergencyData, editHandler, deleteHandler]);
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
            <Controls.ResuableHeaderTypo typographyText="Emergency Details" />
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
          aria-describedby="modal-modal-description"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            autoComplete="off"
          >
            <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
              <Controls.Grid>
                <Controls.Box sx={Controls.formBoxStyle}>
                  <Controls.Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Emergency Details
                  </Controls.Typography>
                  <Controls.ResuableFormTextField
                    textFieldLabel="Name"
                    textFieldName="name"
                    textFieldValue={formik.values.name}
                    textFieldOnBlur={formik.handleBlur}
                    textFieldOnChange={formik.handleChange}
                    textFieldError={
                      formik.touched.name && Boolean(formik.errors.name)
                    }
                    textFieldHelperText={
                      formik.touched.name && formik.errors.name
                    }
                  />
                  <Controls.ResuableFormTextField
                    textFieldLabel="Email"
                    textFieldName="email"
                    textFieldType="email"
                    textFieldValue={formik.values.email}
                    textFieldOnBlur={formik.handleBlur}
                    textFieldOnChange={formik.handleChange}
                    textFieldError={
                      formik.touched.email && Boolean(formik.errors.email)
                    }
                    textFieldHelperText={
                      formik.touched.email && formik.errors.email
                    }
                  />
                  <Controls.ResuableFormTextField
                    textFieldLabel="Mobile Number"
                    textFieldName="mobile_number"
                    textFieldValue={formik.values.mobile_number}
                    textFieldOnBlur={formik.handleBlur}
                    textFieldOnChange={formik.handleChange}
                    textFieldError={
                      formik.touched.mobile_number &&
                      Boolean(formik.errors.mobile_number)
                    }
                    textFieldHelperText={
                      formik.touched.mobile_number &&
                      formik.errors.mobile_number
                    }
                  />
                  <Controls.ResuableFormTextField
                    textFieldLabel="Relationship"
                    textFieldName="relationship"
                    textFieldValue={formik.values.relationship}
                    textFieldOnBlur={formik.handleBlur}
                    textFieldOnChange={formik.handleChange}
                    textFieldError={
                      formik.touched.relationship &&
                      Boolean(formik.errors.relationship)
                    }
                    textFieldHelperText={
                      formik.touched.relationship && formik.errors.relationship
                    }
                  />
                  <Controls.ResuableFormTextField
                    textFieldLabel="Address"
                    textFieldName="address"
                    textFieldValue={formik.values.address}
                    textFieldOnBlur={formik.handleBlur}
                    textFieldOnChange={formik.handleChange}
                    textFieldError={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    textFieldHelperText={
                      formik.touched.address && formik.errors.address
                    }
                  />
                  <Controls.Typography
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Controls.ResuableFormButton
                      buttonText="Close"
                      onClick={() => {
                        handleClose();
                      }}
                      sx={{
                        bgcolor: Controls.red[500],
                        "&:hover": { bgcolor: Controls.red[500] },
                      }}
                    />
                    <Controls.ResuableFormButton
                      buttonType="submit"
                      buttonText={!editMode ? "Add" : "Update"}
                      sx={{ bgcolor: "info" }}
                    />
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
            </Controls.Grid>
          </form>
        </Controls.Modal>
      </Controls.Box>
      <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
        {emergencyData?.length >= 0 && emergencyData
          ? (memoizedTable)
          : null}
      </Controls.Paper>
    </>
  )
}
export default EmergencyDetails;