import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsersStart } from '../redux/actions/UserActions';
  // const dispatch = useDispatch();
  // const users= useSelector((state)=>state.data.data);
  //  useEffect(() => {
  //   dispatch(loadUsersStart());
  //  }, [])


class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [{
              name: 'Net Profit',
              data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
              name: 'Revenue',
              data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
              name: 'Free Cash Flow',
              data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 350
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded'
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
              xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
              },
              yaxis: {
                title: {
                  text: '$ (thousands)'
                }
              },
              fill: {
                opacity: 1
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return "$ " + val + " thousands"
                  }
                }
              }
            },
          
          
          };
        }

      

        render() {
          return (
            

      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
      </div>
      );
  }
}



<Paper elevation={2}>
  <Grid item xs={12} md={6} lg={4}>
    <Grid item xs={4}>
      <Box>

        {/* <CardHeader /> */}
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </Box>
    </Grid>
  </Grid>
</Paper>















<Box>
          <Box>
          <Card >
           <CardHeader />
             <ReactApexChart options={state.options} series={state.series} type="bar" height={350}/>
          </Card>
        </Box>
     
       
          <Box>
          <Card >
           <CardHeader />
              <ReactApexChart options={pieChart.options} series={pieChart.series} type="pie" height={350}/>
          </Card>
        </Box>
        </Box>








<Grid item rowSpacing={2} columnSpacing={3} container my={1} sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <Grid item xs={8}>
          <Box>
          <Card >
           <CardHeader />
             <ReactApexChart options={state.options} series={state.series} type="bar" height={350}/>
          </Card>
        </Box>
       </Grid> 
        <Grid item xs={4}>
          <Box>
          <Card >
           <CardHeader />
              <ReactApexChart options={pieChart.options} series={pieChart.series} type="pie" height={362}/>
          </Card>
        </Box>
       </Grid> 
      </Grid> 