import React from 'react';
import {useState} from "react";
import "./CarListingDealer.css"


const CarListingDealer = () => {

    const [formValues, setFormValues] = useState({
        name: '',
        make: '',
        model: '',
        year: '',
        color:'',
        used : true,
        price : '',
        description: "",
        mileage: '',
        horsepower: '',
        fuelconsumption: '', 
        fueltankcapacity: '',
        transmissiontype: '',
        image_id_list: "string",
        video_id: "string"
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // formMainData has the main picture
    // formMainDataFixed has the main picture after the name has been fixed
    // formData has all other pictures
    // formDataAll loops through formData

    // This is to save the picture with no background
    const [selectedMainFile, setselectedMainFile] = useState(null);
    const formMainData = new FormData();
    const handleMainImageUpload = async (event) => {
        const file = event.target.files[0];
        setselectedMainFile(file);
        formMainData.append("File", file);
    };    
    
    const formData = new FormData();

    const handleSubmit = (event) => {

        event.preventDefault();

        // Sending the no background picture
        for (const [file] of formMainData.entries()) {
            const formMainDataFixed = new FormData();
            formMainDataFixed.append(`File`, file, `${formValues.name}_1`); //this is to fix the name 
            fetch("https://royalmotors.azurewebsites.net/image", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: formMainDataFixed
              })
              .then(response => response.json())
              .then(formMainDataFixed=> console.log(formMainDataFixed))
              .catch(error => console.error(error))
        }

        // Sending the rest of the pictures
        // let i = 2; // start with name_2 because _1 is for the no background picture
        // for (const [file] of formData.entries()) {
        //     let formDataAll = new FormData();
        //     formDataAll.append(`File`, file, `${formValues.name}_${i}`);
        //     fetch("https://royalmotors.azurewebsites.net/image", {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json'
        //         },
        //         body: formDataAll
        //       })
        //       .then(response => response.json())
        //       .then(formDataAll=> console.log(formDataAll))
        //       .catch(error => console.error(error))
        // i++;
        // }

        formValues.image_id_list = `${formValues.name}_1`

        fetch("https://royalmotors.azurewebsites.net/car", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues)
        })
        .then(response => response.json())
        .then(formValues=> console.log(formValues))
        .catch(error => console.error(error))
    };
    
  return (
    <div>
        <div className="mainCarSection">
            <div className="big-car-info">
                <input className="carName" type="text" name="name" value={formValues.name} onChange={handleInputChange} />
                <h2 className="buffer">buffer</h2> 
                {selectedMainFile?(
                <button onClick={() => setselectedMainFile(null)}>Delete Image</button>):("")}
            </div>
            {selectedMainFile? (
                <div style={{ width :'50%'}}>
                    <img style={{ width :'100%'}}src={URL.createObjectURL(selectedMainFile)} alt="selected" />
                </div>
            ):(
                <div className="custom-file-upload">
                <label htmlFor="imageInput" >
                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                </label>
                <input
                    id="imageInput"
                    type="file"
                    onChange={handleMainImageUpload}
                    accept="image/*"
                    style={{ display: "none" }}
                /></div>
            )}
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

export default CarListingDealer