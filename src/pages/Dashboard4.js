import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { getUserEmail, getUserToken } from './localStorage';

function MonthlyChart() {
  const [chartData, setChartData] = useState(null);
  const [token, setToken] = useState(getUserToken());
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const [dataDay, setDataDay] = useState([]);
  const [dataDayTimes, setDataDayTimes] = useState([]);

  async function fetchAllDays() {
    const newDataDay = [];
    const newDataDayTimes = [];

    for (let dayoffset = -12; dayoffset <=0; dayoffset++) {
      const unixTime = dayoffset * 3600 * 24 *30 + currentTime;
      const salesData = await fetchSalesDay(unixTime);
      newDataDay.push(salesData);
      newDataDayTimes.push(unixTime);
    }

    setDataDay(newDataDay);
    setDataDayTimes(newDataDayTimes);
  }

  function fetchSalesDay(unixTime) {
    return fetch(`https://royalmotors.azurewebsites.net/dashboard/cars/month/${unixTime}`, {
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
        return data; // Return the data from the response
      });
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    return date.toDateString(); // Use toDateString to get a formatted date string
  }

  useEffect(() => {
    fetchAllDays();
  }, []); // Run the fetchAllDays function only once on component mount

  const data = [
    ['Time', 'Cars Sold'],
    ...dataDay.map((number, index) => [formatDate(dataDayTimes[index]), number]),
  ];

  let chartComponent;

  if (data && data.length > 1) {
    chartComponent = (
      <Chart
        width={'800px'}
        height={'400px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          chart: {
            title: 'Total Sales by Day',
          },
        }}
      />
    );
  } else {
    chartComponent = <div>Loading chart data...</div>;
  }

  return (
    <div>
      <h2 style={{ color: 'white', fontSize: '20px' }}> Total Number of Cars by Month</h2>
      {chartComponent}
    </div>
  );
}

export default MonthlyChart;
