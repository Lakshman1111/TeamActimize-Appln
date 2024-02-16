import React from 'react';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector} from 'react-redux';
import Controls from "../components/Controls";
const PieChart = () => {
    const dashboard_PieChart = useSelector((state) => state.dashboardData.data);
    const [pieChart, setPieChart] = useState({
        series: [[], [], []],
        options: {
            chart: {
                width: '100%',
                height: 350,
                type: 'pie',
            },
            labels: ['Active', 'InActive', 'Leave'],
            theme: {
                polychrome: {
                    enabled: true,
                }
            },
            dataLabels: {
                formatter(val, opts) {
                    const name = opts.w.globals.labels[opts.seriesIndex]
                    return [name, val.toFixed(1) + '%']
                }
            },
            responsive: [{
                breakpoint: 0,
                options: {
                    chart: {
                        width: '100%',
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%',
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                breakpoint: 768,
                options: {
                    chart: {
                        width: '100%',
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                breakpoint: 1024,
                options: {
                    chart: {
                        width: '100%',
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                breakpoint: 1280,
                options: {
                    chart: {
                        width: '100%',
                    },
                    legend: {
                        position: 'bottom'
                    }
                },
                breakpoint: 1440,
                options: {
                    chart: {
                        width: '100%',
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    });

    useEffect(() => {
        let leaveHours = dashboard_PieChart?.total_hours_in_leave;
        let nonWorkingHours = dashboard_PieChart?.total_non_worked_hours;
        let totalWorkingHours = dashboard_PieChart?.total_working_hours;
        setPieChart(
            {
            series: [totalWorkingHours, nonWorkingHours, leaveHours,],
            options: {
                chart: {
                    width: '100%',
                    height: 350,
                    type: 'pie',
                },
                labels: ['Active', 'InActive', 'Leave'],
                theme: {
                    polychrome: {
                        enabled: true,
                    }
                },
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        return [name, val.toFixed(1) + '%']
                    }
                },
                responsive: [{
                    breakpoint: 0,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    breakpoint: 768,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    breakpoint: 1024,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    breakpoint: 1280,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom'
                        }
                    },
                    breakpoint: 1440,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
        }
        );
    }, [dashboard_PieChart]);

    return (
        <>
            <Controls.Box sx={{ mt: 3, }}>
                <ReactApexChart options={pieChart?.options} series={pieChart?.series} type="pie" height={350} width='100%' />
            </Controls.Box>
        </>
    );
};

export default PieChart