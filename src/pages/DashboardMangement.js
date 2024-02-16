import React, { useEffect } from 'react';
import Carousel4d from "../dashboardUtils/Carousel4d";
import HolidaysCard from "../dashboardUtils/HolidaysCard";
import { useSelector, useDispatch } from 'react-redux';
import { loadDashboardMangementDetailsStart } from '../redux/actions/dashboardMangementActions';
import Carousel3d from "../dashboardUtils/Carousel3d";
import CarouselCard from "../dashboardUtils/CarouselCard";
import Controls from "../components/Controls";
const DashboardMangement = () => {
  const dispatch = useDispatch();
  const dashboardmangment = useSelector((state) => state.dashboardMangementData.data);
  const holidays = dashboardmangment?.holidays;
  const birthdays = dashboardmangment?.birthdays;
  const birthdayCards = (birthdays || []).map((birthday, index) => ({
    key: index,
    content: (
      <CarouselCard
        age={birthday.date_of_birth}
        designation={birthday.designation}
        title={`${birthday.first_name} ${birthday.last_name}`}
        image={birthday.profile_pic}/>)}));
  useEffect(() => {
    dispatch(loadDashboardMangementDetailsStart());
  }, []);
  return (
    <>
      <Controls.Grid spacing={2} container rowSpacing={2} columnSpacing={5}>
        <Controls.Grid item xs={12} sm={6} md={4} lg={6} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
          <Controls.Card sx={{ borderRadius: '15px', textAlign: 'center' }}>
            <Controls.Typography variant="h6">Upcoming Holidays</Controls.Typography>
            <div
              className="App"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ width: '100%', maxWidth: '80%', height: "23rem", }}>
                {holidays?.length > 0 && (<Carousel4d
                  cards={holidays?.map((item, index) => (
                    {
                      key: index,
                      content: <HolidaysCard title={item?.title} date={item?.date} />
                    }
                  ))}
                  offset={2}
                />)}
              </div>
            </div>
          </Controls.Card>
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={6} md={4} lg={6} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
          <Controls.Card sx={{ borderRadius: '15px', textAlign: 'center' }}>
            <Controls.Typography variant="h6">Upcoming Birthdays</Controls.Typography>
            <Controls.Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)' }}>
              <Controls.Box style={{ width: '100%', maxWidth: '60%', height: "23rem" }}>
                {birthdayCards.length > 0 && (
                  <Carousel3d cards={birthdayCards} offset={2} /> )}
              </Controls.Box>
            </Controls.Box>
          </Controls.Card>
        </Controls.Grid>
      </Controls.Grid>
    </>
  );
};
export default DashboardMangement;