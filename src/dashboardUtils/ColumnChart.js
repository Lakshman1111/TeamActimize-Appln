import React from 'react';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';  
import Controls from "../components/Controls";
const ColumnChart = () => {
    const dashboardDetails = useSelector((state) => state.dashboardData.data);
    const [data, updateData] = useState({
        series: [
            {
                name: 'Active Hours',
                data: [],
            },
            {
                name: 'Sunday',
                data: [],
            },
            {
                name: 'Leave',
                data: [],
            },
            {
                name: 'Holiday',
                data: [],
            },
        ],

        options: {
            chart: {
                width: '100%',
                type: 'bar',
                height: 'auto'
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
                categories: [],
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

    useEffect(() => {
        let hours = dashboardDetails?.working_days;
        let leaves = Array.from(new Float32Array(hours?.length));
        let holidays = Array.from(new Float32Array(hours?.length));
        let sundays = Array.from(new Float32Array(hours?.length));
        let workingHours = Array.from(new Float32Array(hours?.length));
        let days = Array.from(new Float32Array(hours?.length));
        hours?.map((item, index) => {
            days[index] = index + 1;
            days = days.toString()
            days = days.split(',')
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
        updateData(
            {
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
                        width:'100%',
                        type: 'bar',
                        height: 'auto'
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
            }
        );
    }, [dashboardDetails]);

    const CustomColumnChart = () => {
        return (
            <div>
                {/* <Container
                    maxWidth='lg' sx={{
                        "&.MuiContainer-root": {
                            paddingLeft: 0,
                            paddingRight: 0
                        },
                    }}>
                    <Paper sx={{ pr: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                        <ReactApexChart options={data?.options} series={data?.series} type="bar" height={300} />
                    </Paper>
                </Container > */}
                 <Controls.Container maxWidth='lg' sx={{ "&.MuiContainer-root": { paddingLeft: 0, paddingRight: 0 } }}>
            <Controls.Grid container justifyContent="center" alignItems="center">
                <Controls.Grid item xl={12} lg={12} md={12} sm={12}>
                    <Controls.Paper sx={{ pr: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                        <ReactApexChart
                            options={data?.options}
                            series={data?.series}
                            type="bar"
                            height={300}
                            width="100%" // Ensure width spans the container
                        />
                    </Controls.Paper>
                </Controls.Grid>
            </Controls.Grid>
        </Controls.Container>
            </div>
        );
    };

    return (
        <>
            <CustomColumnChart />
        </>
    );
};

export default ColumnChart