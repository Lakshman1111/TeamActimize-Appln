
import React from "react";
import { useFormik } from "formik";
import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import {
  createFamilyDetailsStart,
  loadFamilyDetailsStart,
  updateFamilyDetailsStart,
  deleteFamilyDetailsStart,
} from "../redux/actions/familyDetailsActions";
import { useSelector, useDispatch } from "react-redux";
import { initialValues, generateValidationSchema, } from "../components/Validations";
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
const FamilyDetails = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setUserInfo({});
  };
  const formFields = [
    "name",
    "email",
    "mobile_number",
    "relationship",
    "address",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const familyData = useSelector((state) => state.familydata?.data);
  useEffect(() => {
    dispatch(loadFamilyDetailsStart());
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteFamilyDetailsStart(id));
      setTimeout(() => {
        dispatch(loadFamilyDetailsStart());
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
    const user = familyData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user);
      handleOpen(); 
    }
  };
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createFamilyDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success("Data Added Successfully");
      setTimeout(() => {
        dispatch(loadFamilyDetailsStart());
      }, 500);
    } else {
      dispatch(updateFamilyDetailsStart({ id, values }));
      Controls.toast.success("Data Updated Successfully");
      setTimeout(() => {
        dispatch(loadFamilyDetailsStart());
      }, 500);
      resetForm();
      handleClose();
    }
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
        data={familyData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, familyData, editHandler, deleteHandler]);
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
            <Controls.ResuableHeaderTypo typographyText="Family Details" />
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
                    Family Details
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
        {familyData?.length >= 0 && familyData
          ? (memoizedTable)
          : null}
      </Controls.Paper>
    </>
  );
};
export default FamilyDetails;