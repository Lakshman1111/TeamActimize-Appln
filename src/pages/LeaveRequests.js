import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import { useState, useEffect,} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import * as dayjs from 'dayjs';
import { loadLeaveRequestsDetailsStart, updateLeaveRequestsDetailsStart } from '../redux/actions/ExpertLeaveRequestsActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(Controls.TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const LeaveRequests = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const initialValues = {
    expert_id: '',
    exit_type: '',
    start_date: '',
    end_date: '',
  };
  const validationSchema = Yup.object({
    expert_id: Yup
      .string()
      .min(1, "Organization is Short!")
      .max(50, "Organization is Long!")
      .required('Organization is required'),
    exit_type: Yup
      .string()
      .min(2, "Relationship is Short!")
      .max(50, "Relationship is Long!")
      .required('Relationship is required'),
    start_date: Yup
      .date()
      .required('Joining Date is required'),
    end_date: Yup
      .date()
      .required('Ending Date is required'),
  });
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
  });
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])
  const handlePageChange = (event, page) => {
    dispatch(loadLeaveRequestsDetailsStart(page));
  };
  const expertLeaveRequestData = useSelector((state) => state.leaverequestdata.data || []);
  const leavesdata = expertLeaveRequestData?.all_leaves;
  const [checkedState, setCheckedState] = useState({});
  const handleSwitchChange = (event, id, currentApproval) => {
    const newApprovalStatus = event.target.checked;
    const dataToUpdate = {
      approve: newApprovalStatus,
    };
    dispatch(updateLeaveRequestsDetailsStart(id, dataToUpdate));
    setCheckedState(prevState => ({
      ...prevState,
      [id]: newApprovalStatus,
    }));
  };
  useEffect(() => {
    dispatch(loadLeaveRequestsDetailsStart());
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
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Leave Requests"
            />
          </Controls.Box>
        </Controls.Paper>
      </Controls.Box>
      <Controls.Paper sx={{ mt: 2, borderRadius: '10px', }}>
        <Controls.TableContainer component={Controls.Paper} sx={{ borderRadius: '10px', }}>
          <Controls.Table sx={{ minWidth: 100 }} aria-label="customized table">
            <Controls.TableHead>
              <Controls.TableRow >
                <StyledTableCell align="center">S.No</StyledTableCell>
                <StyledTableCell align="center">Expert Name </StyledTableCell>
                <StyledTableCell align="center">Leave Purpose&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Leave Type&nbsp;</StyledTableCell>
                <StyledTableCell align="center">No of Leaves&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Start Date &nbsp;</StyledTableCell>
                <StyledTableCell align="center">End Date &nbsp;</StyledTableCell>
                <StyledTableCell align="center">Approovals &nbsp;</StyledTableCell>
              </Controls.TableRow>
            </Controls.TableHead>
            <Controls.TableBody>
              {Array.isArray(leavesdata) && leavesdata.length > 0 ? (
                leavesdata.map((item, index) => (
                  <StyledTableRow key={index} >
                    <StyledTableCell align="center" component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {allusersnamedata.find(user => user.id === item.user_id)?.name || 'Unknown'}
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.leave_purpose}</StyledTableCell>
                    <StyledTableCell align="center">{item.type_of_leave}</StyledTableCell>
                    <StyledTableCell align="center">{item.number_of_leaves}</StyledTableCell>
                    <StyledTableCell align="center">{dayjs(item.start_date, "MM-DD-YYYY", true).isValid() ? dayjs(item.start_date, "MM-DD-YYYY").format("DD-MM-YYYY") : 'Invalid Date'
}</StyledTableCell>
                    <StyledTableCell align="center">{dayjs(item.end_date, "MM-DD-YYYY", true).isValid() ? dayjs(item.end_date, "MM-DD-YYYY").format("DD-MM-YYYY") : 'Invalid Date'
}</StyledTableCell>
<StyledTableCell sx={{ display: 'flex', alignItems: 'center' }}>
  <Controls.Switch
    checked={checkedState[item.id] !== undefined ? checkedState[item.id] : item.approval}
    onChange={(event) => handleSwitchChange(event, item.id, item.approval)}
    inputProps={{ 'aria-label': 'controlled' }}
  />
  <span>
    {checkedState[item.id] !== undefined ? (checkedState[item.id] ? 'Approved' : 'Not Approved') : (item.approval ? 'Approved' : 'Not Approved')}
  </span>
</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <Controls.Typography>No  data available</Controls.Typography>
              )}
            </Controls.TableBody>
          </Controls.Table>
        </Controls.TableContainer>
      </Controls.Paper>
      <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            onChange={handlePageChange}
            count={20} color="primary" />
        </Controls.Grid>
    </>
  )
}
export default LeaveRequests;