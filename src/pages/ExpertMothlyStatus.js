import React from 'react';
import { useFormik } from 'formik';
import {Pagination} from '@mui/material';
import { styled } from '@mui/material/styles';
import {useState,useEffect,useMemo, lazy, Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { loadWeeklyDetailsStart } from '../redux/actions/expertWeeklyActions';
import { loadMonthlyDetailsStart } from '../redux/actions/ExpertMonthlyActions';
import Controls from "../components/Controls";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "name", label: " Expert Name" },
  { id: "total_working_hours", label: "Total Working Hours" },
  { id: "total_non_worked_hours", label: "Expect Working Hours" },
  { id: "total_hours", label: "Expect Non-Working Hours" },
  { id: "total_hours_in_leave", label: " Expect Leave Hours" },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const ExpertMothlyStatus = () => {
  const anchorRef = React.useRef(null);
  const [userInfo,setUserInfo]= useState({});
  const [editMode,setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
 
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  
  const handleDropdownChange = async (month) => {
    try {
       dispatch(loadMonthlyDetailsStart(month));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    handleOpen()
  };
  const formik = useFormik({
    // initialValues: initialValues,
    // onSubmit: handleSubmit,
    // validationSchema: validationSchema,
  });
  const expertmonthlydata = useSelector((state) => state.expertmonthlydata.data || []);
  const expertSelectdata = useSelector((state) => state.expertWeeklySelectData.data || []);
  const [currentPage, setCurrentPage] = useState(10);
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
const handlePageChange = (event, page) => {
  dispatch(loadWeeklyDetailsStart(page));
};
const memoizedTable = useMemo(() => (
  <Suspense fallback={<div>{''}</div>}>
    <ResuableTable
      columns={columns}
      data={expertmonthlydata} hideActionsCell
    />
  </Suspense>
), [columns, expertmonthlydata,]);

  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Expert Monthly Status"
            />
          </Controls.Box>
        </Controls.Paper>
       
      
      </Controls.Box> 
  <Controls.Paper sx={{ mt: 5, borderRadius: '10px', }}>
  <Controls.Grid container spacing={2}>
  <Controls.Grid item xs={10}>
    <Controls.Paper sx={{ borderRadius: "10px" }}>
        {expertmonthlydata?.length >= 0 && expertmonthlydata
          ? (memoizedTable)
          : null}
      </Controls.Paper>
    </Controls.Grid>
    <Controls.Grid item xs={2}>
    <div>
  <Controls.TableContainer component={Controls.Paper}>
    <Controls.Table aria-label="months-table">
      <Controls.TableBody>
        <Controls.TableRow sx={{ backgroundColor: 'black' }}>
          <StyledTableCell align="center">
            <Controls.Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{ color: 'white' }}
            >
              Months
            </Controls.Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Controls.Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <Controls.MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        {months.map((month, index) => (
                         <Controls.MenuItem key={index} onClick={() => handleDropdownChange(month)}>
                            {month}
                          </Controls.MenuItem>
                        ))}
                      </Controls.MenuList>
                    </ClickAwayListener>
                  </Controls.Paper>
                </Grow>
              )}
            </Popper>
          </StyledTableCell>
        </Controls.TableRow>
      </Controls.TableBody>
    </Controls.Table>
  </Controls.TableContainer>
</div>
    </Controls.Grid>
    </Controls.Grid>
    <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
  <Pagination
  onChange={handlePageChange}
   count={10} color="primary" />
</Controls.Grid>
      </Controls.Paper>
    </>
  )
}
export default ExpertMothlyStatus;