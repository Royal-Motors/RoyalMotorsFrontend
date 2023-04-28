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


    // const send = {
    //     "id":9,
    //     "name": "BMW X6 XDRIVE 35I",
    //     "make": "BMW",
    //     "model": "X6 XDRIVE 35I",
    //     "color": "Sophisto Grey",
    //     "year": 2016,
    //     "used": true,
    //     "mileage": 21000,
    //     "price": 40900,
    //     "description": "",
    //     "image_id_list": "string",
    //     "video_id": "string"
    //   };
      
    //   const handleTestDriveClick = () => {
    //     fetch("https://royalmotors.azurewebsites.net/car", {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(send)
    //     })
    //     .then(response => response.json())
    //     .then(send=> console.log(send))
    //     .catch(error => console.error(error))
    //   };

    //   const handleTestDriveClick = () => {
    //     fetch("https://royalmotors.azurewebsites.net/car/GAC GS5 270T", {
    //       method: 'DELETE',
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));
    //   };

    const handleTestDriveClick =()=>{
        
    }

  return (
    <div>
        <div className="mainCarSection">
            <div className="big-car-info">
                <h2>{data.name}</h2>
                <h2 className="buffer">buffer</h2> 
                <button onClick={handleTestDriveClick}>TEST DRIVE</button>
            </div>
        <img className="mainImg" src="Car pictures/noBackground.png" alt="Main" />
        </div>

        <div className="POWER">
            <div className="Power_inner">
                <h2>HORSE POWER</h2>
                <p>167 hp</p>
            </div>
        </div>

        <div className="FUEL">
            <div className="Power_inner">
                <h2>FUEL CONSUMPTION</h2>
                <p>7L/100Km</p>
            </div>
        </div>

        <div className="info" style={{marginBottom: '0'}}>
            <div className="picture">
                <img className="images" src="Car pictures/2.jpg" alt="pics" />
            </div>
            <div className="aside">
                <div className="title-band">
                    <h1 className="title" id="SPECIFICATIONS">SPECIFICATIONS</h1>
                </div>
                <ol>
                    <li><strong>Make: </strong>{data.make}</li>
                    <li><strong>Model: </strong>{data.model}</li>
                    <li><strong>Fuel Tank Capacity: </strong> 55L</li>
                    <li><strong>Color: </strong>{data.color}</li>
                    <li><strong>Transmission Type: </strong>AUTOMATIC</li>
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