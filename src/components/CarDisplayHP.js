import React from 'react';
import { Link } from 'react-router-dom';

const CarDisplayHP = (props) => {
  const mainImage = props.image_id_list.split(",")[1] || props.image_id_list.split(",")[2] || props.image_id_list.split(",")[3] || props.image_id_list.split(",")[4] || props.image_id_list.split(",")[5] || props.image_id_list.split(",")[6] || props.image_id_list.split(",")[7] || props.image_id_list.split(",")[8] || props.image_id_list.split(",")[9] || props.image_id_list.split(",")[0]; 
  return (
    <div className="image-box">
      <Link to={`/${props.name}`} style={{ cursor: 'pointer',textDecoration: 'none' }}>
      <img id="GridPic" src={props.image_id_list ? "https://royalmotors.azurewebsites.net/image/" + mainImage : ""} alt="" />
        <div className="color-box">
          <p className="CarName">{props.name}</p>
          <p className="subText">Year: {props.year}</p>
          <p className="subText">Price: {props.price}$</p>
        </div>
      </Link>
    </div>
  )
}

export default CarDisplayHP;