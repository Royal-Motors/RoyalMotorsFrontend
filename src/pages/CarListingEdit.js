import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./CarListingDealer.css"


const CarListingEdit = () => {
    const {name}= useParams();
    const [data, setData] = useState({
        name: '',
        make: '',
        model: '',
        year: '',
        color: '',
        price: '',
        description: '',
        mileage: '',
        horsepower: '',
        fuelconsumption: '', 
        fueltankcapacity: '',
        transmissiontype: '',
      });
      

    useEffect(() => {
        fetch(`https://royalmotors.azurewebsites.net/car/${name}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [name]);

        // const [formValues, setFormValues] = useState({
        //     name: `${data.name}`,
        //     make: `${data.make}`,
        //     model: `${data.model}`,
        //     year: `${data.year}`,
        //     color:`${data.color}`,
        //     used : true,
        //     price : `${data.price}`,
        //     description: `${data.description}`,
        //     mileage: `${data.mileage}`,
        //     horsepower: `${data.horsepower}`,
        //     fuelconsumption: `${data.fuelconsumption}`, 
        //     fueltankcapacity: `${data.fueltankcapacity}`,
        //     transmissiontype: `${data.transmissiontype}`,
        //     image_id_list: "string",
        //     video_id: "string"
        // });

        const [formValues, setFormValues] = useState({
            name: "",
            make: "",
            model: "",
            year: "",
            color: "",
            used : true,
            price : "",
            description: "",
            mileage: "",
            horsepower: "",
            fuelconsumption: "", 
            fueltankcapacity: "",
            transmissiontype: "",
            image_id_list: "string",
            video_id: "string"
          });
          
          useEffect(() => {
            setFormValues({
              name: data.name || "",
              make: data.make || "",
              model: data.model || "",
              year: data.year || "",
              color: data.color || "",
              used : true,
              price : data.price || "",
              description: data.description || "",
              mileage: data.mileage || "",
              horsepower: data.horsepower || "",
              fuelconsumption: data.fuelconsumption || "", 
              fueltankcapacity: data.fueltankcapacity || "",
              transmissiontype: data.transmissiontype || "",
              image_id_list: "string",
              video_id: "string"
            });
          }, [data]);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://royalmotors.azurewebsites.net/car/edit/${name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues)
        })
        .then(response => response.json())
        .then(formValues=> console.log(formValues))
        .catch(error => console.error(error))
        console.log(formValues)
    };
    
  return (
    <div>
        <div className="mainCarSection">
            <div className="big-car-info">
                <input className="carName" type="text" name="name" value={formValues.name} onChange={handleInputChange} />
                <h2 className="buffer">buffer</h2> 
                <button >TEST DRIVE</button>
            </div>
        <img className="mainImg" src="Car pictures/noBackground.png" alt="Main" />
        </div>

        <div className="POWER">
            <div className="Power_inner">
                <h2>HORSE POWER</h2>
                <input className="horsepower" type="number"  name="horsepower" value={formValues.horsepower} onChange={handleInputChange} />
                <p style={{display:"inline-block"}}>hp</p>
            </div>
        </div>

        <div className="FUEL">
            <div className="Power_inner">
                <h2>FUEL CONSUMPTION</h2>
                <input className="fuelconsumption" type="number"  name="fuelconsumption" value={formValues.fuelconsumption} onChange={handleInputChange}/>
                <p style={{display:"inline-block"}}>L/100Km</p>
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
                    <li><strong>Make: </strong><input className="listOfInfo" type="text" name="make" value={formValues.make} onChange={handleInputChange} /></li>
                    <li><strong>Model: </strong><input className="listOfInfo" type="text" name="model" value={formValues.model} onChange={handleInputChange} /></li>
                    <li><strong>Fuel Tank Capacity: </strong> <input className="listOfInfo" type="number" name="fueltankcapacity" value={formValues.fueltankcapacity} onChange={handleInputChange} style={{width:'5vw'}} />  L</li>
                    <li><strong>Color: </strong><input className="listOfInfo" type="text"  name="color" value={formValues.color} onChange={handleInputChange} /></li>
                    <li><strong>Transmission Type: </strong><input className="listOfInfo" type="text" name="transmissiontype" value={formValues.transmissiontype} onChange={handleInputChange} /></li>
                    <li><strong>Model Year: </strong><input className="listOfInfo" type="number"  name="year" value={formValues.year} onChange={handleInputChange} /></li>
                    <li><strong>Mileage: </strong><input className="listOfInfo" type="number"  name="mileage" value={formValues.mileage} onChange={handleInputChange} />  Km</li>
                    <li><strong>Price Including VAT: </strong><input className="listOfInfo" type="number" name="price" value={formValues.price} onChange={handleInputChange} />  $</li>
                </ol>
            </div>
        </div>

        <div className='submit'>
            <button onClick={handleSubmit}>SUBMIT</button>
        </div>
        <div style={{padding:'10px', backgroundColor: "#A0AEB3" }}></div>
    </div>
  )
}

export default CarListingEdit