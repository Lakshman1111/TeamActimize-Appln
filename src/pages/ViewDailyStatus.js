import React from 'react'
import {useState,useEffect,useRef} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import {useLocation,useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ViewDailyStatus = ({show,closeModal,data}) => {
    // console.log('showdata',data);
    const {state} = useLocation();
    // console.log('state',state);
  const [modalType,setModalType] = useState('');
  const [open, setOpen] =  useState(show);

//   console.log('open',open);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);


  return (
    <>
    <Box sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',ml:5,mr:5}}>
        {/* <Typography variant="h4">{state}</Typography> */}
        {/* <Button variant="contained"  onClick={handleOpen}>Add</Button> */}
        <Modal
        open={show}
        // show={show}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      <Typography sx={{mb:2}} id="modal-modal-title" variant="h6" component="h2">
          View Daily Status
        </Typography>
        <Box sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:250}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Task Date</InputLabel>
               <Typography sx={{color:'blue'}} component="span">{dayjs(data.created_at).format('DD-MM-YYYY')}</Typography>
           </Box>
           <Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:300,mb:3}}>
               <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Task Name</InputLabel>
                <Typography sx={{color:'#9c27b0'}} component="span">{data.task_name}</Typography>
           </Box>
        </Box>
        <Box sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:250}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Daily Status</InputLabel>
               <Typography sx={{
                      'color': data.daily_status === 'update' ? 'green':
                      data.daily_status === 'status' ? '#ff5722':null
                  }} component="span">{data.daily_status}</Typography>
           </Box>
           <Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:300,mb:3}}>
               <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Task Progress</InputLabel>
                <Typography sx={{
                'color': data.task_progress === 'completed' ? 'green':
                         data.task_progress === 'incomplete' ? 'red':
                         data.task_progress === 'inprogress' ? 'blue':
                         data.task_progress === 'juststarted' ? '#ff5722':null
                         ,
                         }} component="span">{data.task_progress}</Typography>
           </Box>
        </Box>

        <Box sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:250}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Total Hours</InputLabel>
             <Typography  component="span">{data.total_hours}</Typography>
           </Box>
           <Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:300,mb:3}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Working Hours</InputLabel>
             <Typography sx={{mr:11}} component="span">{data.worked_hours}</Typography>
           </Box>
        </Box>
        <Box>
           <Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black',textJustify:'auto',}}>Description</InputLabel>
             {/* <TextField
             sx={{ml:10,width:550}}
             align="justify"
            //  fullWidth
             multiline
            //  variant="standard"
             value={data.description}
             >
             
             </TextField> */}
             {/* <Typography sx={{ml:20}} component="span"></Typography> */}
             <Typography  sx={{whiteSpace: 'pre-line',mr:20}} component="span">{data.description}</Typography>
           </Box>
          
        </Box>
          <Typography sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
          
          <Button onClick={closeModal}  sx={{width:10,height:30,mt:2,bgcolor: red[500]}}variant="contained">close</Button>
          </Typography>
        </Box>
      </Modal>
      </Box>
    </>
  )
}
export default ViewDailyStatus;