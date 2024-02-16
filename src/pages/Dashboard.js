import React, { useEffect } from 'react';
import ImageSlider from './ImageSlider';
import HolidaysSlider from './HolidaysSlider';
import ColumnChart from '../dashboardUtils/ColumnChart';
import PieChart from '../dashboardUtils/PieChart';
import { useDispatch } from 'react-redux';
import { loadDashboardDetailsStart } from '../redux/actions/dashboardDetailsActions';
import Controls from "../components/Controls";
const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDashboardDetailsStart());
  }, []);
  return (
    <>
      <Controls.Grid spacing={2} container rowSpacing={2} columnSpacing={3}>
        <Controls.Grid item xs={12} sm={12} md={12} lg={12} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
          <ColumnChart />
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={6} md={4} lg={4} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
                 <Controls.Card sx={{borderRadius:'15px'}}>
                  <ImageSlider />
                 </Controls.Card>
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={6} md={4} lg={4} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
                <Controls.Card sx={{ borderRadius: '15px' }}>
                <HolidaysSlider />
                </Controls.Card>
        </Controls.Grid>
        <Controls.Grid item xs={12} sm={12} md={4} lg={4} sx={{ boxShadow: '100px rgba(0, 0, 0, 0.1)' }}>
                <Controls.Card sx={{ borderRadius: '15px', height: "23rem" ,}}> 
                   <PieChart sx={{ height: '100%' }}/>
                </Controls.Card>
        </Controls.Grid>
      </Controls.Grid>
    </>
  );
};
export default Dashboard;