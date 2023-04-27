import React from 'react';
import { Link } from 'react-router-dom';

const CarDisplayHP = (props) => {
  return (
    <div className="image-box">
      <img id="GridPic" src={"Car pictures/3.jpg"} alt="" />
      <Link to={`/${props.name}`} style={{ cursor: 'pointer',textDecoration: 'none' }}>
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