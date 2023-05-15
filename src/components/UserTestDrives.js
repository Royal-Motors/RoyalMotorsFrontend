import React from 'react';
import axios from 'axios';
import './AdminTestDrives.css';
import { useState, useEffect } from 'react';
import TableRowTestDrives2 from './TableRowTestDrives2';
import { getUserToken } from '../pages/localStorage';

const AdminTestDrives = () => {
  const [testDrives, setTestDrives] = useState([]);
  const [filteredTestDrives, setFilteredTestDrives] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const [sortSwitch, setSortSwitch] = useState(false);

  useEffect(() => {
    fetch('https://royalmotors.azurewebsites.net/testdrive', {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data_all) => {
        setTestDrives(data_all);
      });
  }, [sortSwitch]);

  useEffect(() => {
    if (selectedSortOption !== '') {
      let sortedTestDrives = [...testDrives];

      switch (selectedSortOption) {
        case 'alphab':
          sortedTestDrives.sort((a, b) =>
            a.car.name.localeCompare(b.car.name)
          );
          break;
        case 'DT':
          sortedTestDrives.sort((a, b) => a.time - b.time);
          break;
        default:
          break;
      }

      setTestDrives(sortedTestDrives);
    }
  }, [selectedSortOption, testDrives]);

  function handleSortChange(event) {
    setSelectedSortOption(event.target.value);
  }

  function handleSortReset(event) {
    if (sortSwitch === false) {
      setSortSwitch(true);
    } else {
      setSortSwitch(false);
    }
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
    handleSearchDisplayedCars();
  }

  function handleSearchDisplayedCars() {
    const filteredDrives = testDrives.filter((drive) =>
      drive.car.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTestDrives(filteredDrives);
  }

  const checkIfTimePassed = (unixTime) => {
    const currentTime = new Date().getTime() / 1000;

    if (unixTime < currentTime) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    handleSearchDisplayedCars();
  }, [searchQuery]);

  return (
    <div>
      <div className="kitkat"></div>
      <div className="SFS">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search car name..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />

          <div className="butt3">
            <select
              className="sort"
              value={selectedSortOption}
              onChange={handleSortChange}
            >
              <option value="" onClick={handleSortReset}>
                No Sort
              </option>
              <option value="alphab">Car</option>
              <option value="DT">Date/Time</option>
            </select>
          </div>
        </div>
      </div>
    {/* Table */}
    <table>
      <tbody>
        <tr>
          <td></td>
          <td id="top">Date/Time</td>
        </tr>
        {searchQuery !== '' ? (
  filteredTestDrives.length > 0 ? (
    filteredTestDrives.map((obj, i) => {
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
    <tr>
      <td colSpan="3">
        <p>No matching test drives found</p>
      </td>
    </tr>
)) : (
  testDrives.length > 0 ? (
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
    <tr>
      <td colSpan="3">
        <p>No test drives scheduled</p>
      </td>
    </tr>
  )
)}  
      </tbody>
    </table>
    </div>
  )
}

export default AdminTestDrives
