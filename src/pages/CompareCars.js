import React from 'react';
import { useState, useEffect } from "react";

const CompareCars = () => {
  const carName1 = "test3";
    const [data1, setData] = useState([]);

    useEffect(() => {
        fetch(`https://royalmotors.azurewebsites.net/car/${carName1}`)
        .then((response) => response.json())
        .then((data1) => setData(data1));
    }, []);
  
    const carName2 = "test2";
    const [data2, setData2] = useState([]);

    useEffect(() => {
        fetch(`https://royalmotors.azurewebsites.net/car/${carName2}`)
        .then((response) => response.json())
        .then((data2) => setData2(data2));
    }, []);

  return (
    <div className='CompareTable'>
        <table className='ComparingTable'>
      <tr style={{borderRadius: '0px', boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0)'}}>
        <td style={{visibility: 'hidden'}}>Vehicle Type</td>
        <td id="firstCar"><img src="Car pictures/noBackground - flipped.png" alt="" /></td>
        <td id="secondCar"><img src="Car pictures/noBackground.png" alt="" /></td>
      </tr>
      <tr >
        <td>Make</td>
        <td>{data1.make}</td>
        <td>{data2.make}</td>
      </tr>
      <tr>
        <td>Model</td>
        <td>{data1.model}</td>
        <td>{data2.model}</td>
      </tr>
      <tr>
        <td>Capacity</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Fuel Consumption</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Color</td>
        <td>{data1.color}</td>
        <td>{data2.color}</td>
      </tr>
      <tr>
        <td>Transmission Type</td>
        <td>Row 3, Column 2</td>
        <td>Row 1, Column 2</td>
      </tr>
      <tr>
        <td>Model Year</td>
        <td>{data1.year}</td>
        <td>{data2.year}</td>
      </tr>
      <tr >
        <td>Mileage</td>
        <td>{data1.mileage} km</td>
        <td>{data2.mileage} km</td>
      </tr>
      <tr >
        <td>Price</td>
        <td>{data1.price} USD</td>
        <td>{data2.price} USD</td>
      </tr>
    </table>
    </div>
  )
}

export default CompareCars