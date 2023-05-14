import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getUserToken } from '../pages/localStorage';

const CarDisplayHPAdmin = (props) => {

  const headerAuth = {
    headers: {
      'Authorization': `Bearer ${getUserToken()}`
    }
  };

  function deleteTestDrive(id) {
    axios.delete(`https://royalmotors.azurewebsites.net/car/${props.name}`, headerAuth)
      .then((response) => {
        window.location.reload();
      });
  }
  
  const handleDelete = (event) => {
      deleteTestDrive(props.id);
  }

  const mainImage = props.image_id_list.split(",")[1] || props.image_id_list.split(",")[2] || props.image_id_list.split(",")[3] || props.image_id_list.split(",")[4] || props.image_id_list.split(",")[5] || props.image_id_list.split(",")[6] || props.image_id_list.split(",")[7] || props.image_id_list.split(",")[8] || props.image_id_list.split(",")[9] || props.image_id_list.split(",")[10]; 
  return (
    <div className="image-box">
      <Link to={`/${props.name}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
      <img id="GridPic" src={props.image_id_list ? "https://royalmotors.azurewebsites.net/image/" + mainImage : ""} alt="" />
      </Link>
        <div className="color-box">
          <p className="CarName">{props.name}</p>
          <p className="subText">Year: {props.year}</p>
          <p className="subText">Price: {props.price}$</p>
          <div className="button-group">
          <Link to={`/edit?id=${props.name}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <button className="Pen">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
            </Link>
            <button className="Trash">
              <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
            </button>
          </div>
        </div>

    </div>
  );
};

export default CarDisplayHPAdmin;
