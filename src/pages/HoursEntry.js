import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import  { tableCellClasses } from '@mui/material/TableCell';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import { createHoursEntryDetailsStart, loadHoursEntryDetailsStart } from '../redux/actions/hoursEntryActions';
import { updateHoursEntryDetailsStart } from '../redux/actions/hoursEntryActions';
import * as Yup from 'yup';
import {
  loadCurrentWeekDetailsStart,
} from '../redux/actions/currentWeekActions';
import Controls from "../components/Controls";
const StyledTableCell = styled(Controls.TableCell)(({ theme }) => ({
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
const HoursEntry = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [addHoursData, setAddHoursData] = useState([]);
  let [weekData, setWeekData] = useState([]);
  let [weekdataone, setweekdataone] = useState();
  let [userid, setuserid] = useState();
  const [flag1, setFlag] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [input, setInput] = useState(false);
  const [on, setOn] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true);
  const shouldDisplaySaveButton = !weekdataone || Object.keys(weekdataone.weekly_status).length === 0;
  const shouldDisplayUpdateButton = !weekdataone || (Object.keys(weekdataone.weekly_status).length === 0 && !currentWeekDataone.approval);
  let currentWeekData = useSelector((state) => state.weekdata?.data);
  let currentWeekDataone = useSelector((state) => state?.hoursentrydata?.data);
    const initialValues = {
      TaskName: '',
      Hours: '',
      leave:'',
    };
    const validationSchema = Yup.object({
      TaskName: Yup.string()
      .max(30, 'Task Name must be at most 30 characters')
      .required('Task Name is required'),
      Hours: Yup .array()
      .required('Hours required'),
        leave: Yup .array()
     .required("Leave type is required")
   
    });
  useEffect(() => {
    dispatch(loadCurrentWeekDetailsStart());
    dispatch(loadHoursEntryDetailsStart());
  }, []);
  if (!flag1) {
  }
  useEffect(() => {
    if (weekdataone && Object.keys(weekdataone).length > 0) {
      setUpdateButtonDisabled(false);
    } else {
      setUpdateButtonDisabled(true);
    }
  }, [weekdataone]);
  let allData = useSelector((state) => state.hoursentrydata.data);
  useEffect(() => {
    if (allData) {
      setuserid(allData.id);
     
    }
  }, [allData]);
  useEffect(() => {
    if (currentWeekData) {
      currentWeekData = currentWeekData?.map((i) => i?.date === currentWeekDataone?.weekly_status[i?.day]?.Date ? { ...i, checked: currentWeekDataone?.weekly_status[i.day]?.Day ? true : false } : i)
      setWeekData(currentWeekData);
    }
  }, [currentWeekData]);
  useEffect(() => {
    if (currentWeekDataone) {
      setweekdataone(currentWeekDataone);
    }
  }, [currentWeekDataone]);
  useEffect(() => {
    if (typeof weekdataone === 'undefined') {
      setUpdateButtonDisabled(false);
    } else {
      setUpdateButtonDisabled(true);
    }
  }, [weekdataone]);
  const inputHandler = (index, event, item) => {
    let checkedWeekData = weekData.map((x) => x.id === item.id ? ({ ...x, checked: event.target.checked }) : x)
    setWeekData(checkedWeekData)
    let check = event.target.checked;
    setInput(check);
    setOn(index);
  };
  const onInputChange = (index, event, item, item2) => {
    setChecked((prev) => !prev);
    let arry = [...addHoursData];
    const { name, value } = event.target;
    // Update the item in the array
    if (arry[index]) {
      arry[index] = {
        day: item?.day || arry[index]?.day,
        Date: item?.date || arry[index]?.Date,
        TaskName: name === 'TaskName' ? value : arry[index]?.TaskName || '',
        Hours: item.checked ? '' : (name === 'Hours' ? value : arry[index]?.Hours || ''),
        Day: !item.checked ? '' : (name === 'leave' ? value : arry[index]?.Day || ''), // Update Day if checked is true
        checked: item.checked, // Preserve the checked status
      };
    }if (arry?.find(i => i.day === item.day)?.day) {
      arry = arry?.map(j => {
          if (j.day === item.day) {
              return {
                  ...j,
                  [name]: value,
                  TaskName: name === 'TaskName' ? value : j.TaskName, // Update TaskName if it's 'TaskName' field being updated
                  day: item.day,
                  Date: item.date,
                  Hours: item.checked ? '' : (name === 'Hours' ? value : j.Hours),
                  Day: !item.checked ? '' : (name === 'leave' ? value : j.Day),
                  checked: item.checked,
              };
          }
          return j;
      });
  } else {
      // If the item with the specified day doesn't exist, create a new entry
      let a = {
          [name]: value,
          day: item?.day,
          Date: item?.date,
          TaskName: name === 'TaskName' ? value : item2?.TaskName || '',
          Hours: item.checked ? '' : (name === 'Hours' ? value : item2?.Hours || ''),
          Day: !item.checked ? '' : (name === 'leave' ? value : item2?.Day || ''),
          checked: item.checked,
      };
      arry.push(a);
  }
    // Update holiday status separately for all records
    if (name === 'Hours' && (value === 'holiday' || value === 'leave' || value === 'others')) {
      arry.forEach((record) => {
        if (record.day === item.day) {
          record.TaskName = ''; // Clear TaskName if 'holiday', 'leave', or 'others' is selected
          record.Day = value; // Update the Day to the selected value
        }
      });
    }
    setAddHoursData([...arry]);
  };
    function withoutProperty(obj, property) {
    const { [property]: unused, ...rest } = obj
    return rest
  };
  const handleSubmit = (e) => {
    const checkEmptyInput = !Object.values(addHoursData).every(res => res === "");
    const allFieldsProvided = addHoursData.every(entry => entry.TaskName && (entry.Hours || entry.Day) && !(entry.Hours && entry.Day)); // Modified condition
    const allDaysFilled = addHoursData.length === 6 && addHoursData.every(entry => entry.Hours || entry.Day); // Unchanged condition
  weekData = weekData?.map(i=>{
    let j =addHoursData?.find(j=>j.day == i.day)
    if(j?.day){
      if(j.TaskName == ''){
        i = {...i, isTaskname: true}
      } else {
        i = {...i, isTaskname: false}
      }
      if(j.Day == ''){
        i = {...i, isDay: true}
      } else {
        i = {...i, isDay: false}
      }
      if(j.Hours == ''){
        i = {...i, isHours: true}
      } else {
        i = {...i, isHours: false}
      }
      return {...i, isActivate: false}
    } else {
      return {...i, isActivate: true}
    }
  })
  setWeekData([...weekData])
    if (checkEmptyInput && allFieldsProvided && allDaysFilled) {
      let submitData = addHoursData.reduce(function (map, obj) {
        map[obj.day] = withoutProperty(obj, 'day');
        return map;
      }, {});
      let hash = {}
      hash["weekly_status"] = {};
      hash["weekly_status"] = submitData;
      let testData = hash;
      if (!editMode) {
        dispatch(createHoursEntryDetailsStart(testData));
        Controls.toast.success('Data Added Successfully');
        setTimeout(() => { dispatch(loadHoursEntryDetailsStart()) }, 500);
        setAddHoursData({
          Hours: '',
          TaskName: '',
          leave: '',
        });
      }
    } else {
      if (!allDaysFilled) {
        Controls.toast.error('Please provide details for all days of the week.');
      } else if (!allFieldsProvided) {
        Controls.toast.error('Please provide task name and either hours or leave (not both) for all fields.');
      } else {
        Controls.toast.error('Please provide data for all days of the week and ensure task name and either hours or leave (not both) are provided for all fields.');
      }
    }
  };
  const handleUpdate = (id) => {
    const isTaskNameCleared = addHoursData.some(entry => entry.TaskName === '');
    const isHoursCleared = addHoursData.some(entry => entry.Hours === '');
    const allFieldsFilled = addHoursData.every(entry => entry.TaskName && (entry.Hours || entry.Day) && !(entry.Hours && entry.Day));
    weekData = weekData?.map(i=>{
      let j =addHoursData?.find(j=>j.day == i.day)
      if(j?.day){
        if(j.TaskName == ''){
          i = {...i, isTaskname: true}
        } else {
          i = {...i, isTaskname: false}
        }
        if(j.Day == ''){
          i = {...i, isDay: true}
        } else {
          i = {...i, isDay: false}
        }
        if(j.Hours == ''){
          i = {...i, isHours: true}
        } else {
          i = {...i, isHours: false}
        }
        return {...i, isActivate: false}
      } else {
        return {...i, isActivate: false}
      }
    })
      setWeekData([...weekData])
    if (!allFieldsFilled) {
      Controls.toast.error('Please provide task name and either hours or leave (not both) for all fields.');
      return; // Prevent update action
    }
    const updatedData = {
      id: id,
      updatedDay: addHoursData?.map(item => ({
        Date: item.Date,
        day: item.day,
        TaskName: item.TaskName || '',
        Hours: item.Hours || '',
        Day: item.Day || '',
        checked: item.checked || ''
      }))
    };
   
    let submitData = updatedData.updatedDay.reduce(function (map, obj) {
      map[obj.day] = withoutProperty(obj, 'day');
      return map;
    }, {});
    let hash = {}
    hash["weekly_status"] = {}
    let finalData = {}
    Object.keys(weekdataone.weekly_status).forEach((i) => {
      if (submitData[i]) {
        finalData[i] = submitData[i]
      } else {
        finalData[i] = weekdataone.weekly_status[i]
      }
    })
    hash["weekly_status"] = finalData;
    let testData = hash;
    dispatch(updateHoursEntryDetailsStart({ ...testData, id: updatedData.id }));
    Controls.toast.success('Data Updated  Successfully');
    setTimeout(() => { dispatch(loadHoursEntryDetailsStart()) }, 500);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
 
  return (
    <>
      <Controls.Box>
        <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.ResuableHeaderTypo
              typographyComponent="span"
              typographyVariant="h6"
              sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
              typographyText="Hours Entry Details"
            />
          </Controls.Box>
        </Controls.Paper>
        <Controls.TableContainer component={Controls.Paper} sx={{ mt: 3, borderRadius: '10px', }} >
          <Controls.Table sx={{ minWidth: 50 }} aria-label="customized table">
            <Controls.TableHead>
              <Controls.TableRow >
                <StyledTableCell align="center">S.No</StyledTableCell>
                <StyledTableCell align="center">Day</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Task Name&nbsp;</StyledTableCell>
                <StyledTableCell align="center">Hours/Leave&nbsp;</StyledTableCell>
                <StyledTableCell align="center">&nbsp;</StyledTableCell>
              </Controls.TableRow>
            </Controls.TableHead>
            <Controls.TableBody>
              {weekData?.length > 0 && weekData.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    align="center"
                    component="th"
                    scope="row" >
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center"  >{item.day}</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    onChange={(event) => onInputChange(index, event, item.date)}>
                    {item.date}
                  </StyledTableCell>
                  <StyledTableCell align="center" >
                    <OutlinedInput
                      type='text'
                      sx={{ width: 300, height: 40 , borderColor:"red"}}
                      placeholder="task name"
                      name="TaskName"
                      defaultValue={weekdataone?.weekly_status?.[item.day]?.TaskName || ''}
                      onChange={(event) => onInputChange(index, event, item, weekdataone?.weekly_status?.[item.day])}
                      error={item?.isActivate || item?.isTaskname}
                    />
                        {/* {item?.isActivate || item?.isTaskname ? (
                      <div style={{ color: 'red', margin: "5px" }}>Task Name is required</div>
                    ) : null} */}
                  </StyledTableCell>
                  {!item.checked ?
                    <StyledTableCell align="center" sx={{ width: 100 }}>
                      <OutlinedInput
                        type='number'
                        sx={{ width: 200, height: 40 }}
                        placeholder="hours"
                        name='Hours'
                        error={item?.isActivate || item?.isHours}
                        defaultValue={weekdataone?.weekly_status?.[item.day]?.Hours || weekdataone?.weekly_status?.[item.day]?.Day || ''}
                        onChange={(event) => onInputChange(index, event, item, weekdataone?.weekly_status?.[item.day])}
                      />
                              {/* {item?.isActivate || item?.isHours ? (
                        <div style={{ color: 'red', margin: "5px" }}>Please provide Hours/Leave  </div>
                      ) : null} */}
                    </StyledTableCell>
                    :
                    <StyledTableCell align="center" sx={{ width: 100 }}>
                      <FormControl>
                        <Select
                          variant='outlined'
                          name='leave'
                          sx={{ width: 200, height: 40 }}
                          inputProps={{ 'aria-label': 'Without label' }}
                          placeholder='Select Leave'
                          error={item?.isActivate || item?.isDay}
                          defaultValue={weekdataone?.weekly_status?.[item.day]?.Day || ''}
                          onChange={(event) => onInputChange(index, event, item, weekdataone?.weekly_status?.[item.day])}
                        >
                          <Controls.MenuItem value="" >Select</Controls.MenuItem>
                          <Controls.MenuItem value='holiday'>Holiday</Controls.MenuItem>
                          <Controls.MenuItem value='leave'>Leave</Controls.MenuItem>
                          <Controls.MenuItem value='others'>Others</Controls.MenuItem>
                        </Select>
                        {/* {item?.isActivate || item?.isDay ? (
                        <div style={{ color: 'red', margin: "5px" }}>Please provide Hours/Leave  </div>
                      ) : null} */}
                      </FormControl>
                    </StyledTableCell>}
                  <StyledTableCell align="center" sx={{ width: 30 }} component="th" scope="row" >
                    <FormControlLabel
                      control={<Switch key={index} checked={item.checked} onClick={(event) => inputHandler(index, event, item)} />}
                      id={index}
                      label="Show"
                    />
                  </StyledTableCell>
                </StyledTableRow >
              ))}
            </Controls.TableBody>
          </Controls.Table>
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0px 30px 20px 30px' }}>
            {!shouldDisplayUpdateButton && !currentWeekDataone.approval && (
              <Controls.ReusableButton
                buttonVariant="contained"
                buttonColor="success"
                buttonText="Update"
                onClick={() => handleUpdate(userid)}
                sx={{
                  width: 20,
                  height: 35,
                  mt: 2,
                  textTransform: 'none',
                  borderRadius: '20px',
                  boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                }}
              />
            )}
            {shouldDisplaySaveButton && (
              <Controls.ReusableButton
                buttonVariant="contained"
                buttonColor="info"
                buttonText="Save"
                onClick={() => handleSubmit()}
                sx={{
                  width: 20,
                  height: 35,
                  mt: 2,
                  bgcolor: 'info',
                  textTransform: 'none',
                  borderRadius: '20px',
                  boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                  marginLeft: 'auto'
                }}
              />
            )}
          </Controls.Box>
        </Controls.TableContainer>
      </Controls.Box>
      
    </>
  );
};
export default HoursEntry;