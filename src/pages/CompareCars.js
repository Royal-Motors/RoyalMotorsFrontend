import React from 'react';
import { useState, useEffect } from "react";

const CompareCars = () => {
  // const carName1 = "test3";
  const [carName1, setCarName1] = useState('');
  const [data1, setData1] = useState([]);

  useEffect(() => {
    if (carName1 !== '') {
      fetch(`https://royalmotors.azurewebsites.net/car/${carName1}`)
        .then((response) => response.json())
        .then((data1) => setData1(data1));
    }
  }, [carName1]);
  
  const [carName2, setCarName2] = useState('');
  const [data2, setData2] = useState([]);

  useEffect(() => {
    if (carName2 !== '') {
      fetch(`https://royalmotors.azurewebsites.net/car/${carName2}`)
        .then((response) => response.json())
        .then((data2) => setData2(data2));
    }
  }, [carName2]);

  const [carList, setCarList] = useState([]);
  useEffect(() => {
    fetch('https://royalmotors.azurewebsites.net/car')
      .then((response) => response.json())
      .then((carList) => setCarList(carList));
  }, []);

    const handleCarSelect = (event, setCarName) => {
      setCarName(event.target.value);
    };

  return (
    <div className='CompareTable'>
        <table className='ComparingTable'>
      <tr style={{borderRadius: '0px', boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0)'}}>
        <td id="carSelection"> Select cars<br /><br />
          <select value={carName1} onChange={(event) => handleCarSelect(event, setCarName1)}>
            <option value=''>Select a car</option>
            {carList.map((car) => (
                <option key={car.id} value={car.name}>{car.name}</option>
              ))}
          </select><br /><br />
          <select value={carName2} onChange={(event) => handleCarSelect(event, setCarName2)}>
            <option value=''>Select a car</option>
            {carList.map((car) => (
                <option key={car.id} value={car.name}>{car.name}</option>
              ))}
          </select><br />
        </td>
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
        <td>Fuel Tank Capacity </td>
        <td>{data1.name ? `${data1.fueltankcapacity} L` : ""}</td>
        <td>{data2.name ? `${data2.fueltankcapacity} L` : ""}</td>
      </tr>
      <tr>
        <td>Horse Power </td>
        <td>{data1.name ? `${data1.horsepower} hp` : ""}</td>
        <td>{data2.name ? `${data2.horsepower} hp` : ""}</td>
      </tr>
      <tr>
        <td>Fuel Consumption</td>
        <td>{data1.name ? `${data1.fuelconsumption} L/100Km` : ""}</td>
        <td>{data2.name ? `${data2.fuelconsumption} L/100Km` : ""}</td>
      </tr>
      <tr>
        <td>Color</td>
        <td>{data1.color}</td>
        <td>{data2.color}</td>
      </tr>
      <tr>
        <td>Transmission Type</td>
        <td>{data1.transmissiontype}</td>
        <td>{data2.transmissiontype}</td>
      </tr>
      <tr>
        <td>Model Year</td>
        <td>{data1.year}</td>
        <td>{data2.year}</td>
      </tr>
      <tr >
        <td>Mileage</td>
        <td>{data1.name ? `${data1.mileage} km` : ""}</td>
        <td>{data2.name ? `${data2.mileage} km` : ""}</td>
      </tr>
      <tr >
        <td>Price</td>
        <td>{data1.name ? `${data1.price} USD` : ""}</td>
        <td>{data2.name ? `${data2.price} USD` : ""}</td>
      </tr>
    </table>
    </div>
  )
}

export default CompareCars