import React from 'react'
import {useState,useEffect,useRef} from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { red } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import Controls from "../components/Controls";
import * as dayjs from 'dayjs';
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
    bgcolor: 'background.paper',
    borderRadius: 8, // Adjust the value as needed
    boxShadow: 24,
    p: 4,
  };
const ViewLeaveDetails = ({show,closeModal,data}) => {
    const [open, setOpen] =  useState(show);
  return (
    <>
    <Controls.Box sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',ml:5,mr:5}}>
        <Modal
        open={show}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Controls.Box sx={style}>
      <Controls.Typography sx={{ mb: 2, fontWeight: 'bold' }} id="modal-modal-title" variant="h6" component="h2">
  View Leave Details
</Controls.Typography>
        
        <Controls.Box sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <Controls.Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:250}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Purpose of Leave</InputLabel>
             <Controls.Typography>{data.leave_purpose}</Controls.Typography>
           </Controls.Box>
           <Controls.Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:300,mb:3}}>
               <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Type of Leave</InputLabel>
               <Typography>{data.type_of_leave}</Typography>
           </Controls.Box>
        </Controls.Box>
        <Controls.Box sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <Controls.Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:250}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Start Date</InputLabel>
               <Typography component="span">{dayjs(data.start_date).format('DD-MM-YYYY')}</Typography>
           </Controls.Box>
           <Controls.Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:300,mb:3}}>
               <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>End Date</InputLabel>
                <Controls.Typography component="span">{dayjs(data.end_date).format('DD-MM-YYYY')}</Controls.Typography>
           </Controls.Box>
        </Controls.Box>

        <Controls.Box sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <Controls.Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:250}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Status</InputLabel>
             <Controls.Typography sx={{'color':data.approval===false?'red':'green'}} component="span">{data.approval===false? 'Not Approved':'Approved'}</Controls.Typography>
           </Controls.Box>
           <Controls.Box  sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between',width:300,mb:3}}>
             <InputLabel sx={{fontSize:16,fontWeight:'bold',color:'black'}}>Permission</InputLabel>
             <Controls.Typography sx={{'color':data.approval===false?'red':'green'}} component="span">{data.approval===false? 'Not Approved':'Approved'}</Controls.Typography>
           </Controls.Box>
        </Controls.Box>
          <Controls.Typography sx={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <Controls.Button onClick={closeModal} sx={{width:10,height:30,mt:2,bgcolor: red[500]}}variant="contained">close</Controls.Button>
          </Controls.Typography>
        </Controls.Box>
      </Modal>
      </Controls.Box>
    </>
  )
}

export default ViewLeaveDetails;