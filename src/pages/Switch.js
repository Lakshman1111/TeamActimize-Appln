import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { loadCurrentWeekDetailsStart } from '../redux/actions/currentWeekActions';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box, Paper, Switch, TextField, Button, MenuItem, Typography } from '@mui/material';
const HoursEntry = () => {
    const [checked, setChecked] = React.useState(false);
    const [editMode, setEditMode] = useState(false);
    let [weekData, setWeekData] = useState([]);
    const [addHoursData, setAddHoursData] = useState([]);
    const dispatch = useDispatch();
    let currentWeekData = useSelector((state) => state.weekdata?.data);
    useEffect(() => {
        dispatch(loadCurrentWeekDetailsStart());
    }, []);
    currentWeekData = currentWeekData?.map(obj => ({ ...obj, checked: false }));
    useEffect(() => {
        setWeekData(currentWeekData);
    }, []);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const initialValues = {
        Hours: '',
        TaskName: '',
        leave: '',
    }
    const validationSchema = Yup.object({
        Hours: Yup
            .string()
            .min(1, 'One digit 2-8 only')
            .required("Hours required")
            .matches(
                /^[2-8]{1}$/,
                "Invalid number"
            ),
        TaskName: Yup
            .string()
            .max(30)
            .required('Task Name is required'),
        leave: Yup
            .string()
            .required("Leave type is required"),
    });

    const handleSubmit = (values,) => {
    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });
    return (
        <>
            <Box>
                <Paper sx={{ padding: '10px' }} elevation={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography
                            component="span"
                            variant="h5"
                            sx={{ fontSize: 29, mt: 0.5, ml: 2 }}>
                            Hours Entry Details
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <TableContainer component={Paper} sx={{ mt: 2 }} >
                <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                    <Table sx={{ minWidth: 50 }} aria-label="customized table">
                        <TableHead>
                            <TableRow >
                                <StyledTableCell align="center">S.No</StyledTableCell>
                                <StyledTableCell align="center">Day</StyledTableCell>
                                <StyledTableCell align="center">Date</StyledTableCell>
                                <StyledTableCell align="center">Task Name&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Hours/Leave&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Switch&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currentWeekData?.map((item, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="center" scope="row" component="th">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{item.day}</StyledTableCell>
                                    <StyledTableCell align="center">{item.date}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <TextField
                                            type="text"
                                            name="TaskName"
                                            placeholder='Task Name'
                                            size="small"
                                            value={formik.values.TaskName}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            error={formik.touched.TaskName && Boolean(formik.errors.TaskName)}
                                            helperText={formik.touched.TaskName && formik.errors.TaskName}
                                        />
                                    </StyledTableCell>
                                    {!item.checked ?
                                        <StyledTableCell align="center">
                                            <TextField
                                                type="text"
                                                name="Hours"
                                                placeholder='Hours'
                                                size="small"
                                                value={formik.values.Hours}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={formik.touched.Hours && Boolean(formik.errors.Hours)}
                                                helperText={formik.touched.Hours && formik.errors.Hours}
                                            />
                                        </StyledTableCell>
                                        : <StyledTableCell align="center">
                                            <TextField
                                                size="small"
                                                name="leave"
                                                select
                                                // defaultValue="Select"
                                                value={formik.values.leave}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={formik.touched.leave && Boolean(formik.errors.leave)}
                                                helperText={formik.touched.leave && formik.errors.leave}
                                                sx={{ width: 210, height: 40 }}
                                            >
                                                <MenuItem value="Select">Select</MenuItem>
                                                <MenuItem value='holiday'>Holiday</MenuItem>
                                                <MenuItem value='leave'>Leave</MenuItem>
                                                <MenuItem value='others'>Others</MenuItem>
                                            </TextField>
                                        </StyledTableCell>
                                    }
                                    {/* switch code */}
                                    <StyledTableCell align="center" sx={{ width: 30 }} component="th" scope="row" >
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={() => setChecked(checked === false ? true : false)} />}
                                            label="Show"
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button sx={{ width: 13, height: 32, ml: 10, mt: 5, mb: 3 }} variant="contained">Update</Button>
                        <Button type="submit" sx={{ width: 13, height: 32, mr: 10, mt: 5, mb: 3 }} variant="contained">Save</Button>
                        {/* onClick={() => handleSubmit()} */}
                    </Typography>
                </form>
            </TableContainer>
        </>
    );
};

export default HoursEntry