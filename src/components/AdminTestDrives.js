import React from 'react'
import axios from 'axios';
import "./AdminTestDrives.css"
import { useState, useEffect } from 'react';
import TableRowTestDrives from './TableRowTestDrives';

const AdminTestDrives = () => {
  const [testDrives, setTestDrives] = useState([]);
  const [testCars, setTestCars] = useState([]);
  const [testName, setTestFirstName] = useState([]);
  const [testLastName, setTestLastName] = useState([]);
  const [testTime, setTestTime] = useState([]);
  const [testCompleted, setTestCompleted] = useState(["Yes", "No"]);

  //make sorted by time test drive array

  const [searchQuery, setSearchQuery] = useState(''); //user input in search bar

  useEffect(() => {
    fetch('https://royalmotors.azurewebsites.net/testdrive')
      .then((response) => response.json())
      .then((data_all) => {
        setTestDrives(data_all); //stores all the test drive info
        setTestCars(data_all.map((obj) => obj.car.name)); //stores all the car names
        setTestFirstName(data_all.map((obj) => obj.account.firstname)); //stores all the first names
        setTestLastName(data_all.map((obj) => obj.account.lastname)); //stores all the last names
        setTestTime(data_all.map((obj) => obj.time)); //stores all the times
        setTestid(data_all.map((obj) => obj.id)); //stores all the ids
      });
  }, []);

  //add function to sort by time when backend is ready

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
    // handleSearchDisplayedCars(event); I will add the function later
  };

  return (
    <div>
      {/* Section break */}
    <div class="kitkat"></div>
    {/* Search Bar */}
    <div className="SFS">
      <div className="search-container">
        <input type="text" placeholder="Search car name..." value={searchQuery} onChange={handleSearchInputChange}/>
      </div>
    </div>
    {/* Table */}
    <table>
        <tr>
          <td> </td> {/* car name */}
          <td id="top">Username</td>
          <td id="top">Time</td>
          <td id="top">Completed</td>
        </tr>
        {/* Rows */}
        {testDrives.length > 0 ? (
        <div>
          {testDrives.map((obj, i) => (
            <TableRowTestDrives key={i} name={obj.car.name} firstname={obj.account.firstname} lastname={obj.account.lastname} time={obj.time} id={obj.id}/>))}
        </div>
        ) : (
        <p>Loading data...</p>
        )}  
    </table>
    </div>
  )
}

export default AdminTestDrives
