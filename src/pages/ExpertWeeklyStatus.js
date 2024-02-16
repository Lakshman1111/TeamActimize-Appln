import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadWeeklyDetailsStart, loadWeeklySelectDetailsStart } from '../redux/actions/expertWeeklyActions';
import Controls from "../components/Controls";
import Pagination from '@mui/material/Pagination';
const style = {
  p: 4,
  top: '45%',
  left: '50%',
  width: 300,
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
  { id: "name", label: "Name" },
  { id: "start_date", label: "Start Date " },
  { id: "end_date", label: "End Date" },
  { id: "total_hours", label: " Total Working  Hours " },
  { id: "total_working_hours", label: "Expect Working Hours" },
  { id: "total_non_worked_hours", label: " Expect Non-Working Hours" },
  { id: "total_hours_in_leave", label: " Expect Leave Hours" },
];
const ExpertWeeklyStatus = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const handleSubmit = (values, { setStatus, resetForm }) => {
  }
  const formik = useFormik({
    onSubmit: handleSubmit,
  });
  const expertcertificate = useSelector((state) => state.expertweeklydata.data || []);
  const expertSelectdata = useSelector((state) => state.expertWeeklySelectData.data || []);
  const [currentPage, setCurrentPage] = useState(10);
  useEffect(() => {
    dispatch(loadWeeklyDetailsStart());
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
  const handleEdit = (id) => {
    setUserInfo(id);
    formik.setFieldValue(id);
  }
  const handlePageChange = (event, page) => {
    dispatch(loadWeeklyDetailsStart(page));
  };
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertcertificate} hideActionsCell
      />
    </Suspense>
  ), [columns, expertcertificate,]);
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Expert Weekly Status"
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
                    Expert weekly Status
                  </Controls.Typography>
                  <Controls.Grid container rowSpacing={-1} columnSpacing={1} my={1}>
                    {expertSelectdata.daily_status && expertSelectdata.daily_status.length > 0 ? (
                      expertSelectdata.daily_status.map((status, index) => (
                        <Controls.Grid item xs={12} key={index} sx={{ justifyContent: "center" }}>
                          {/* Assuming 'status' contains the date or status information */}
                          <Controls.Typography variant="body1" component="div">
                            {status}
                          </Controls.Typography>
                        </Controls.Grid>
                      ))
                    ) : (
                      <p>No data available</p>
                    )}
                  </Controls.Grid>
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
export default ExpertWeeklyStatus;