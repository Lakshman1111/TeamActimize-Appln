import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllExpertsStart } from '../redux/actions/allExpertsActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResuableHeaderTypo from '../components/Header';
import Controls from "../components/Controls";
import Pagination from '@mui/material/Pagination';

const ExpertPage = () => {
  const dispatch = useDispatch();
  const allexperts = useSelector((state) => state.allExpertsData.data || []);
  const handlePageChange = (event, page) => {
    dispatch(loadAllExpertsStart(page));
  };
  useEffect(() => {
    dispatch(loadAllExpertsStart());
  }, []);
  const navigate = useNavigate();
  const handleCardClick = (expertId) => {
    navigate(`/hr/experts/expertpage/personaldetails/${expertId}`);
  };
  const decodeProfilePic = (base64Image) => {
    if (!base64Image) return null;
    const base64String = base64Image.split(';base64,').pop();
    const cleanedBase64 = base64String.replace(/[^A-Za-z0-9+/]/g, '');
    try {
      const binaryString = window.atob(cleanedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error decoding base64 string:', error);
      return null; 
    }
  };
  const getAvatarByGender = (expert) => {
    if (expert && expert.gender) {
      if (expert.gender === 'male') {
        // Return male avatar image URL or component
        return 'https://png.pngtree.com/png-clipart/20210604/ourmid/pngtree-gray-male-avatar-png-image_3416112.jpg';
      } else if (expert.gender === 'female') {
        // Return female avatar image URL or component
        return 'https://cdn.vectorstock.com/i/preview-1x/23/93/person-gray-photo-placeholder-woman-vector-23522393.jpg';
      }
    }
    return 'URL_OR_COMPONENT_FOR_DEFAULT_AVATAR';
  };
  return (
    <Controls.Container>
      <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
        <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
          <ResuableHeaderTypo
            typographyComponent="span"
            typographyVariant="h6"
            sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
            typographyText=" Experts Page"
          />
        </Controls.Box>
      </Controls.Paper>
      <Controls.Grid container spacing={3}>
        {allexperts.map((expert, index) => (
          <Controls.Grid item xs={12} sm={6} md={4} key={index}>
            <Controls.Card onClick={() => handleCardClick(expert.id)}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', fontWeight: 'bold', color: 'black' }}>
                <Controls.Avatar
                  alt={expert.username}
                  src={
                    expert.profile_pic
                      ? decodeProfilePic(expert.profile_pic)
                      : getAvatarByGender(expert)
                  }
                  sx={{ width: 156, height: 156 }}
                />
              </div>
              <Controls.CardContent>
                <Controls.Typography variant="body2" color="textSecondary" align="center" style={{ marginBottom: '8px', fontWeight: 'bold', color: 'black' }}>
                  <strong>UserName:</strong>&nbsp;
                  <span style={{ fontWeight: 'bold', color: 'black' }}>{expert.name}</span>
                </Controls.Typography>
                <Controls.Typography variant="body2" color="textSecondary" align="center" style={{ marginBottom: '8px', fontWeight: 'bold', color: 'black' }}>
                  <strong>Designation:</strong>&nbsp;
                  <span style={{ fontWeight: 'bold', color: 'black' }}>{expert.designation}</span>
                </Controls.Typography>
                <Controls.Typography variant="body2" color="textSecondary" align="center" style={{ marginBottom: '8px', fontWeight: 'bold', color: 'black' }}>
                  <strong>Email:</strong>&nbsp;
                  <span style={{ fontWeight: 'bold', color: 'black' }}>{expert.email}</span>
                </Controls.Typography>
              </Controls.CardContent>
            </Controls.Card>
          </Controls.Grid>
        ))}
   <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
<Pagination
            onChange={handlePageChange}
            count={20} color="primary" />
            </Controls.Grid>
      </Controls.Grid>
      
        
    </Controls.Container>
  );
};
export default ExpertPage;
