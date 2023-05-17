import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { getUserEmail, getUserToken } from './localStorage';

export default function CarMonthlyChart() {
  const [chartData, setChartData] = useState(null);
  const [token, setToken] = useState(getUserToken());

  var currentTime = Math.floor((new Date()).getTime()/1000);
  var unixTime;
  var dataDay = [];
  var dataDayTimes = [];
  
  function fetchSalesDay(unixTime){
         return fetch(`https://royalmotors.azurewebsites.net/dashboard/sales/day/${unixTime}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
    }

    for (let dayoffset=-15; dayoffset<15; dayoffset++){
    unixTime = dayoffset*3600*24 + currentTime;
    dataDay.push(fetchSalesDay(unixTime));
    dataDayTimes.push(unixTime);
    }
    
  return (
    <div>
      {chartData ? (
        <Chart
          width={'800px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={dataDay}
          options={{
            chart: {
              title: 'Total Sales by Day',
            },
          }}
        />
      ) : (
        <div>Loading chart data...</div>
      )}
    </div>
  );
}
