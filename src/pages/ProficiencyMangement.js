import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import { loadProficiencyDetailsStart, loadProficiencySelectDetailsStart } from '../redux/actions/expertProficiencyActions';
import Controls from "../components/Controls";
import {
  initialValues,
} from "../components/Validations";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "name", label: "Expert Name" },
  { id: "employee_id_number", label: "Employee" },
  { id: "mobile_number", label: "Mobile Number" },
  { id: "email", label: "Email" },
  { id: "designation", label: "Designation" },
];
const ProficiencyMangement = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const [selectedSkill, setSelectedSkill] = useState("");
  const dispatch = useDispatch();
  const handleDropdownChange = async (skill_name) => {
    try {
      setSelectedSkill(skill_name);
      dispatch(loadProficiencySelectDetailsStart(skill_name));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
  });
  const expertProficiencydata = useSelector((state) => state.expertProficiencydata.data || []);
  const expertProficiencydataone = useSelector((state) => state.expertproficiencyselectdata.data || []);
  const skills = expertProficiencydata?.skills;
  useEffect(() => {
    dispatch(loadProficiencyDetailsStart());
  }, [])
  const handlePageChange = (event, page) => {
    dispatch(loadProficiencySelectDetailsStart(selectedSkill,page));
  };
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertProficiencydataone} hideActionsCell 
      />
      </Suspense>
  ), [columns, expertProficiencydataone,]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Experts Proficiency"  />
            <Controls.TextField
              sx={{ marginTop: '9px', width: '25%' }}
              InputProps={{
                disableUnderline: true,
              }}
              select
              fullWidth
              variant='filled'
              defaultValue=""
              name='type_of_leave'
              label="Technologies"
              placeholder='Select Leave'
              // value={formik.values.type_of_leave}
              onBlur={formik.handleBlur}
              onChange={(event) => handleDropdownChange(event.target.value)}
              // error={formik.touched.type_of_leave && Boolean(formik.errors.type_of_leave)}
              // helperText={formik.touched.type_of_leave && formik.errors.type_of_leave} 
               >
              {Array.isArray(skills) && skills.length > 0 ? (
                skills.map((item, index) => (
                  <Controls.MenuItem key={index} value={item}>{item}</Controls.MenuItem>
                ))
              ) : (
                <p>No data available</p>
              )}
            </Controls.TextField>
          </Controls.Box>
        </Controls.Paper>
      </Controls.Box>
      <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
        {expertProficiencydataone?.length >= 0 && expertProficiencydataone
          ?(memoizedTable)
          : null}
      </Controls.Paper>
      <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            onChange={handlePageChange}
            // onChange={(event) => handleDropdownChange(event.target.value)}
            count={20} color="primary" />
        </Controls.Grid>
    </>
  )
}
export default ProficiencyMangement;