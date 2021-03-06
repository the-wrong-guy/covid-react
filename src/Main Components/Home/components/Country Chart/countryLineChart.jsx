import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2'
import { ChartData } from '../../api/api';
import {Card} from '@material-ui/core'
import ChartSkeleton from '../skeletons/ChartSkeleton'
import numeral from "numeral";
import styles from './countryLineChart.module.css'

function Chart() {

    const [dailyData , setDailyData] = useState([]); 

    useEffect(()=>{
        const fetchAPI = async () => {
            setDailyData(await ChartData());
        }
        fetchAPI();
        // console.log(dailyData);
    },[]);


    const lineChart = (
      <Line
            data={{
                labels : dailyData.map(({date}) => date ),
                datasets : [{
                    data : dailyData.map(({confirmed}) => confirmed),
                    borderColor : '#3333ff',
                    backgroundColor:'rgba(51,51,255, 0.6)',
                    label : 'Infected',
                    fill : true,
                    pointRadius : 1,
                },{
                    data : dailyData.map(({deaths}) => deaths),
                    borderColor : 'red',
                    backgroundColor : 'rgba(255, 0 , 0 , 0.6)',
                    label : 'Deaths',
                    fill : true,
                    pointRadius : 1
                },{
                    data : dailyData.map(({recovered}) => recovered),
                    borderColor : '	#32CD32',
                    backgroundColor:'rgba(2, 242, 34, 0.6)',
                    label : 'Recovered',
                    fill : true,
                    pointRadius : 1
                }],
                
            }}
            options = {{
                responsive :true,
                maintainAspectRatio: false,
                legend: {
                    position: 'top',
                    labels: {
                       usePointStyle: true
                    }
                 },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display:false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display:true
                        },
                        ticks: {
                            callback: function (value, index, values) {
                              return numeral(value).format("0a");
                            },
                            lineHeight: 2.2
                          },   
                    }]
                },
                
            }}
        />
    );

     return(
         <div className={styles.container}>
            <Card elevation={24} className={styles.Card}>
                    {lineChart}
          </Card>
         </div>
     );
 }

 export default Chart;