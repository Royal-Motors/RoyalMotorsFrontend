import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserToken } from '../pages/localStorage';
import "./AdminTestDrives.css"


const TableRowTestDrives = (props) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const formatted = convertToMilitaryTime(props.time);
    setFormattedTime(formatted);
  }, []);

  const headerAuth = {
    headers: {
      'Authorization': `Bearer ${getUserToken()}`
    }
  };

    //delete car from backend
    function deleteTestDrive(id) {
        axios.delete(`https://royalmotors.azurewebsites.net/testdrive/${id}`, headerAuth)
          .then((response) => {
            window.location.reload();
          });
      }

    //converting to military timing
    const convertToMilitaryTime = (unixTime) => {
      const dateObj = new Date(unixTime * 1000);
      const options = { month: 'long', day: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      const hours = dateObj.getUTCHours().toString().padStart(2, '0');
      const realH = parseInt(hours)+3;
      const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
      const formattedTime = `${formattedDate}, ${realH}:${minutes}`;
      return formattedTime;
    };
    
    //handle delete button
    const handleDelete = (event) => {
        deleteTestDrive(props.id);
    }

  return (
    <tr>
      <td>{props.name}</td>
      <td>{`${formattedTime}`}</td>
      <td>
        <div className="delButton">
            <button onClick={handleDelete} id="HA">
                <p>Delete</p>
            </button>
        </div>
      </td>
    </tr>
  )
}

export default TableRowTestDrives
