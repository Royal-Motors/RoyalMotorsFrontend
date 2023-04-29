import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


const CarListing = () => {
    const {name}= useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://royalmotors.azurewebsites.net/car/${name}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [name]);


  return (
    <div>
        <div className="mainCarSection">
            <div className="big-car-info">
                <h2>{data.name}</h2>
                <h2 className="buffer">buffer</h2> 
                <button>TEST DRIVE</button>
            </div>
        <img className="mainImg" src="https://royalmotors.azurewebsites.net/image/BMW_X6_XDRIVE_35I_1" alt="Main" />
        </div>

        <div className="POWER">
            <div className="Power_inner">
                <h2>HORSE POWER</h2>
                <p>{data.name ? `${data.horsepower} hp` : ""}</p>
            </div>
        </div>

        <div className="FUEL">
            <div className="Power_inner">
                <h2>FUEL CONSUMPTION</h2>
                <p>{data.name ? `${data.fuelconsumption} L/100Km` : ""}</p>
            </div>
        </div>

        <div className="info" style={{marginBottom: '0'}}>
            <div className="picture">
                <img className="images" src="https://royalmotors.azurewebsites.net/image/BMW_X6_XDRIVE_35I_3" alt="pics" />
            </div>
            <div className="aside">
                <div className="title-band">
                    <h1 className="title" id="SPECIFICATIONS">SPECIFICATIONS</h1>
                </div>
                <ol>
                    <li><strong>Make: </strong>{data.make}</li>
                    <li><strong>Model: </strong>{data.model}</li>
                    <li><strong>Fuel Tank Capacity: </strong>{data.name ? `${data.fueltankcapacity} L` : ""}</li>
                    <li><strong>Color: </strong>{data.color}</li>
                    <li><strong>Transmission Type: </strong>{data.transmissiontype}</li>
                    <li><strong>Model Year: </strong>{data.year}</li>
                    <li><strong>Mileage: </strong>{data.name ? `${data.mileage} km` : ""}</li>
                    <li><strong>Price Including VAT: </strong>{data.name ? `${data.price} USD` : ""}</li>
                </ol>
            </div>
        </div>
    </div>
  )
}

export default CarListing