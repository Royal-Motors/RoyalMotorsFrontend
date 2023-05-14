import React from 'react'
import axios from 'axios';
import "./AdminTestDrives.css"
import { useState, useEffect } from 'react';
import TableRowTestDrives2 from './TableRowTestDrives2';
import { getUserEmail, getUserToken } from '../pages/localStorage';

const UserTestDrives = () => {
    const [testDrives, setTestDrives] = useState([]);
    const [testCars, setTestCars] = useState([]);
    const [testTime, setTestTime] = useState([]);
  
    //make sorted by time test drive array
  
    const [searchQuery, setSearchQuery] = useState(''); //user input in search bar
  
    useEffect(() => {
      fetch(`https://royalmotors.azurewebsites.net/testdrive/account/${getUserEmail()}`, {
        headers:{
          'Authorization': `Bearer ${getUserToken()}`,
        }
      })
        .then((response) => response.json())
        .then((data_all) => {
          setTestDrives(data_all); //stores all the test drive info
          setTestCars(data_all.map((obj) => obj.car.name)); //stores all the car names
          setTestTime(data_all.map((obj) => obj.time)); //stores all the times
        });
    }, []);
  
    //add function to sort by time when backend is ready
  
    function handleSearchInputChange(event) {
      setSearchQuery(event.target.value);
      // handleSearchDisplayedCars(event); I will add the function later
    };
  
    const checkIfTimePassed = (unixTime) => {
      const currentTime = new Date().getTime() / 1000; // Get current Unix time
  
      if (unixTime < currentTime) {
        return true; // Time has passed
      } else {
        return false; // Time has not passed
      }
    };
  
    return (
      <div>
        {/* Section break */}
      <div className="kitkat"></div>
      {/* Search Bar */}
      <div className="SFS">
        <div className="search-container">
          <input type="text" placeholder="Search car name..." value={searchQuery} onChange={handleSearchInputChange}/>
          {/* Sort Button */}
          <div className="butt3">
            <select className="sort"> 
              <option value="">No Sort</option>
              <option value="alphab">Alphabetically</option>
              <option value="DT">Date/Time</option>  
            </select>
          </div>
  
        </div>
      </div>
      {/* Table */}
      <table>
          <tr>
            <td> </td> {/* car name */}
            <td id="top">Date/Time</td>
          </tr>
          {/* Rows */}
          {testDrives.length > 0 ? (
            testDrives.map((obj, i) => {
              if (!checkIfTimePassed(obj.time)) {
                return (
                  <TableRowTestDrives2
                    key={i}
                    name={obj.car.name}
                    time={obj.time}
                    id={obj.id}
                  />
                );
              }
              return null;
            })
          ) : (
            <p>Loading data...</p>
          )}  
      </table>
      </div>
    )
  }

export default UserTestDrives