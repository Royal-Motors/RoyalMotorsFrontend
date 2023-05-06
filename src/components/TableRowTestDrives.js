import React from 'react'
import axios from 'axios';

function TableRowTestDrives(props) {

    function deleteTestDrive(id) {
        axios.delete(`https://royalmotors.azurewebsites.net/testdrive/${id}`)
          .then((response) => {
            console.log(response);
            window.location.reload();
          });
      }

    const handleDelete = (event) => {
        deleteTestDrive(props.id);
    }

  return (
    <tr>
      <td>{props.name}</td>
      <td>{`${props.firstname} ${props.lastname}`}</td>
      <td>{props.time}</td>
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
