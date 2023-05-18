import React from 'react'
import { getUserToken } from './localStorage';

const DashboardBox = () => {
    
  let [token, setToken] = React.useState(getUserToken());
  const [cars, setCars] = React.useState("");
  const [sales, setSales] = React.useState("");
  const [drives, setDrives] = React.useState("");
  const [costumers, setCostumers] = React.useState("");

  function fetchTotalSales() {
    return fetch(`https://royalmotors.azurewebsites.net/dashboard/totalsales`, {
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
        setSales(data);
      });
  }

  function fetchTotalCars() {
    return fetch(`https://royalmotors.azurewebsites.net/dashboard/totalcarssold`, {
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
        console.log(data)
        setCars(data);
      });
  }

  function fetchTotalTest() {
    return fetch(`https://royalmotors.azurewebsites.net/dashboard/totaltestdriverequested`, {
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
        setDrives(data);
      });
  }

  function fetchTotalCostumers() {
    return fetch(`https://royalmotors.azurewebsites.net/dashboard/totalcustomers`, {
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
        setCostumers(data);
      });
  }

  fetchTotalCars();
  fetchTotalCostumers();
  fetchTotalSales();
  fetchTotalTest();

  return (<main>
    <div className="dashboard">
      <h1 style={{color: 'black', fontSize: '30px'}}>Dashboard</h1>
      <br />
      <h3 style={{color: 'black', fontSize: '20px'}}>Total Sales (in $): {sales}</h3>
      <br />
      <h3 style={{color: 'black', fontSize: '20px'}}>Total Number of Cars Sold: {cars}</h3>
      <br />
      <h3 style={{color: 'black', fontSize: '20px'}}>Total Number of Testdrives: {drives} </h3>
      <br />
      <h3 style={{color: 'black', fontSize: '20px'}}>Total Number of Costumers: {costumers}</h3>
    </div>
  </main>
  )
}

export default DashboardBox