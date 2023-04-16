import React from 'react';
import { Link } from 'react-router-dom';

const CarDisplayHP = (props) => {
  return (
    <div className="image-box">
      <img id="GridPic" src={"Car pictures/3.jpg"} alt="" />
      <Link to={`/${props.name}`} style={{ cursor: 'pointer' }}>
        <div className="color-box">
          <p className="CarName">{props.name}</p>
        </div>
      </Link>
    </div>
  )
}

export default CarDisplayHP;