import React from 'react';
import { useState, useEffect } from 'react';
import {Container,Paper } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { useSelector, useDispatch } from 'react-redux';
import { loadDashboardDetailsStart } from '../redux/actions/dashboardDetailsActions';
const ColumnChart = () => {
    const dispatch = useDispatch();
    // const dashboardDetails = useSelector((state) => state.dashboardData.data);
     const dashboardDetails = useSelector((state) => {
        // setLoading(true);
        return state.dashboardData.data;
    });
    let hours = dashboardDetails?.working_days;
    let leaves = Array.from(new Float32Array(hours?.length));
    let holidays = Array.from(new Float32Array(hours?.length));
    let sundays = Array.from(new Float32Array(hours?.length));
    let workingHours = Array.from(new Float32Array(hours?.length));
    let days = Array.from(new Float32Array(hours?.length));
    hours?.map((item, index) => {
        days[index] = index+1;
        if (item === "Leave") {
            leaves[index] = 8;
        } else if (item === "Holiday") {
            holidays[index] = 8;
        } else if (item === "Sunday") {
            sundays[index] = 8;
        } else {
            workingHours[index] = item;
        }
    });
   

    // if (isLoading) {
    //     return (<div>Replace me with a loading component...</div>);
    // }
    const [state, setState] = useState({
        series: [
            {
                name: 'Active Hours',
                data: workingHours,
            },
            {
                name: 'Sunday',
                data: sundays,
            },
            {
                name: 'Leave',
                data: leaves,
            },
            {
                name: 'Holiday',
                data: holidays,
            },
        ],

        options: {
            chart: {
                type: 'bar',
                // height:350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '80%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 15,
                colors: ['transparent']
            },
            xaxis: {
                categories: days,
            },
            yaxis: {
                title: {
                    text: 'hours'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val === 0 ? "sunday" : val + "hours"
                    }
                }
            }
        },
    });
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            dispatch(loadDashboardDetailsStart());
            setLoading(false);
            // window.dispatchEvent(new Event('resize'));
        }, 2000);
    }, []);
    const CustomColumnChart = () => {
        return (
            <div>
                <Container
                    maxWidth='xlg' sx={{
                        "&.MuiContainer-root": {
                            paddingLeft: 0,
                            paddingRight: 0
                        },
                    }}>
                    <Paper sx={{ pr: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                        <ReactApexChart options={state.options} series={state.series} type="bar" height={300} />
                    </Paper>
                </Container >
            </div>
        );
    };
    if (isLoading) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>Loading the data...{console.log("loading state")}</div>
        );
    }
    return (
        <>
             <CustomColumnChart />
        </>
    );
};

export default ColumnChart