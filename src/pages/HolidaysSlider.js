import React from 'react';
import Carousel4d from "../dashboardUtils/Carousel4d";
import HolidaysCard from "../dashboardUtils/HolidaysCard";
import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
const HolidaysSlider = () => {
    const [holidays, setHolidays] = useState([]);
    let dashboardDetails = useSelector((state) => state.dashboardData.data);
    useEffect(() => {
        if (dashboardDetails){
            let dashboard_holidays = dashboardDetails?.holidays;
            dashboard_holidays = dashboard_holidays?.map((item, index) => ({ id: index + 1, ...item }));
            setHolidays(dashboard_holidays);
        }
    }, [dashboardDetails]);
    return (
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
            <div style={{ width: '100%', maxWidth: '60%', height: "23rem", }}>
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
    );
};
export default HolidaysSlider;