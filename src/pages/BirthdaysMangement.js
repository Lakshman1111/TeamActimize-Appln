import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadBirthdayDetailsStart } from '../redux/actions/expertBirthdayActions';
import Pagination from '@mui/material/Pagination';
import { loadUsersStart } from '../redux/actions/UserActions';
import Controls from "../components/Controls";
const SquareCard = styled(Controls.Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  width: 340,
  height: 350,
  margin: 'auto',
  padding: '16px',
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
  },
});
const RoundAvatar = styled(Controls.Avatar)({
  marginTop: -10,
  width: 180,
  height: 180,
});
const BirthdaysManagement = () => {
  const dispatch = useDispatch();
  const expertbirthdaydata = useSelector((state) => state.expertsBirthdaysdata.data || []);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = expertbirthdaydata.slice(indexOfFirstCard, indexOfLastCard);
  const handlePageChange = (event, page) => {
    dispatch(loadBirthdayDetailsStart(page));
  };
  useEffect(() => {
    dispatch(loadBirthdayDetailsStart());
  }, []);
  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);
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
      return null; // Return null in case of an error
    }
  };
  const PersonCard = ({ name, birthday, imageUrl, decodedImage }) => {
    return (
      <Controls.Grid item xs={12} sm={5} md={4} lg={3}>
        <SquareCard elevation={3}>
          <RoundAvatar alt={name} src={decodedImage} />
          <Controls.CardContent>
            <Controls.Typography variant="h6" component="div">
              {name}
            </Controls.Typography>
            <Controls.Typography variant="body1" component="div">
              Birthday: {birthday}
            </Controls.Typography>
          </Controls.CardContent>
        </SquareCard>
      </Controls.Grid>
    );
  };
  return (
    <>
      <Controls.Paper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', bgcolor: '#fff', borderRadius: '10px' }} >
        <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
          <Controls.ResuableHeaderTypo
            typographyComponent="span"
            typographyVariant="h6"
            sx={{ fontSize: '23px', mt: 0.5, ml: 2 }}
            typographyText="Experts Birthday List"
          />
        </Controls.Box>
      </Controls.Paper>
      <Controls.Grid container spacing={3} sx={{ overflowX: 'auto' }}>
        {currentCards.map((item, index) => (
          <Controls.Grid item xs={12} sm={6} md={4} key={index}>
            <PersonCard
              name={item.name}
              birthday={item.date_of_birth}
              imageUrl={item.profile_pic}
              decodedImage={decodeProfilePic(item.profile_pic)} />
          </Controls.Grid>
        ))}
       <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
  <Pagination
  onChange={handlePageChange}
   count={20} color="primary" />
</Controls.Grid> 
      </Controls.Grid>
    </>
  );
};
export default BirthdaysManagement;
