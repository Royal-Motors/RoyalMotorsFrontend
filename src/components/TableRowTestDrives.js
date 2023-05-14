import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TableRowTestDrives = (props) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const formatted = convertToMilitaryTime(props.time);
    setFormattedTime(formatted);
  }, []);

    //delete car from backend
    function deleteTestDrive(id) {
        axios.delete(`https://royalmotors.azurewebsites.net/testdrive/${id}`)
          .then((response) => {
            window.location.reload();
          });
      }

    //converting to military timing
    const convertToMilitaryTime = (unixTime) => {
      const dateObj = new Date(unixTime * 1000);
      const hours = dateObj.getUTCHours().toString().padStart(2, '0');
      const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      return formattedTime;
    };
    
    //handle delete button
    const handleDelete = (event) => {
        deleteTestDrive(props.id);
    }

  return (
    <tr>
      <td>{props.name}</td>
      <td>{`${props.firstname} ${props.lastname}`}</td>
      <td>{`${formattedTime}`}</td>
      <td>no</td>
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
