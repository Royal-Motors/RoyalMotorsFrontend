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
    //     "name": "GAC GS3 ",
    //     "make": "GAC",
    //     "model": "GS3",
    //     "year": 2020,
    //     "color": "Golden",
    //     "used": true,
    //     "price": 12000,
    //     "description": "",
    //     "mileage": 15000,
    //     "horsepower": 135,
    //     "fuelconsumption": 6.9,
    //     "fueltankcapacity": 50,
    //     "transmissiontype": "Automatic",
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

      const handleTestDriveClick = () => {
        fetch("https://royalmotors.azurewebsites.net/car/nadim", {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
      };

    // const handleTestDriveClick =()=>{
        
    // }

  return (
    <div>
        <div className="mainCarSection">
            <div className="big-car-info">
                <h2>{data.name}</h2>
                <h2 className="buffer">buffer</h2> 
                <button onClick={handleTestDriveClick}>TEST DRIVE</button>
            </div>
        <img className="mainImg" src="https://royalmotors.azurewebsites.net/image/GS51" alt="Main" />
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
                <img className="images" src="https://royalmotors.azurewebsites.net/image/GS52" alt="pics" />
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