import React from 'react';
import { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
import "./CarListingDealer.css"
import axios from 'axios';
import { getUserToken } from './localStorage';


const CarListingEdit = () => {
    // const {name}= useParams();
    const name = "GAC GS3"
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
      
    //This is where I store the inputed images which I will next use URL.createObjectURL on
    const [selectedMainFile, setselectedMainFile] = useState(null);
    //This is where I store the main image URL which comes from the database
    const [selectedMainFileURL, setselectedMainFileURL] = useState(null);
    //This is to tell me I use the main image coming from the data base first then I only use the ones I upload
    const [booleanMainFileURL, setbooleanMainFileURL] = useState(true);
    const formMainData = new FormData();

    // This to handle the upload for the main car image
    useEffect(() => {
      if (selectedMainFile) {
        formMainData.append("File", selectedMainFile);
        formMainData.append('order', 1);
      }
    },);

    const handleMainImageUpload = async (event) => {
      const file = event.target.files[0];
      setselectedMainFile(file);
    };  

    //To delete the image
    function imageDeleteButton() {
      setselectedMainFile(null);
      setbooleanMainFileURL(false);
    };  

    useEffect(() => {
        fetch(`https://royalmotors.azurewebsites.net/car/${name}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [name]);

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
        image_id_list: "",
        video_id: ""
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
        mileage: data.name ? data.mileage : "",
        horsepower: data.horsepower || "",
        fuelconsumption: data.fuelconsumption || "", 
        fueltankcapacity: data.fueltankcapacity || "",
        transmissiontype: data.transmissiontype || "",
        image_id_list: data.image_id_list||"",
        video_id: data.video_id||""
      });

      setselectedMainFileURL(data.image_id_list ? data.image_id_list.split(",").map((word) => "https://royalmotors.azurewebsites.net/image/" + word)[0] : null)
      
    }, [data]);


    //This is to handle the changes in the car info
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };
  

    const submitBtn = document.getElementById('submit-btn');

    const handleSubmit =  async (event) => {
        event.preventDefault();

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = 'Loading...';

        //Sending car information
        fetch(`https://royalmotors.azurewebsites.net/car/edit/${name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getUserToken()}`
          },
          body: JSON.stringify(formValues)
        })
        .then(response => response.json())
        .then(formValues=> console.log(formValues))
        .catch(error => console.error(error))
        console.log(formValues)

        //Sending the main image
        if (formMainData && formMainData.get('File')) {
          try {
              formMainData.append('carName', formValues.name);
              const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${name}&order=1`, formMainData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getUserToken()}`
                  }
                });
            
                console.log('Main Image uploaded successfully!', response.data);
              } catch (error) {
                console.error('Error uploading image:', error);
              }
      }

      submitBtn.innerHTML = 'Submitted';
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    };
    
  return (
    <div>
        <div className="mainCarSection">
            <div className="big-car-info">
                <input className="carName" type="text" name="name" value={formValues.name} onChange={handleInputChange} />
                <h2 className="buffer">buffer</h2> 
                {selectedMainFile || (selectedMainFileURL &&  booleanMainFileURL) ?(
                <button onClick={imageDeleteButton}>Delete Image</button>):("")}
            </div>
            {(selectedMainFileURL &&  booleanMainFileURL) || selectedMainFile? (
                <div style={{ width :'50%'}}>
                    <img style={{ width :'100%'}}src={selectedMainFile?(URL.createObjectURL(selectedMainFile)):(selectedMainFileURL)} alt="selected" />
                </div>
            ):(
                <div className="custom-file-upload">
                    <label htmlFor="imageInput" >
                        <div className='MainImageContainer'>
                            <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                        </div>
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
            <button onClick={handleSubmit} id="submit-btn">SUBMIT</button>
        </div>
        <div style={{padding:'10px', backgroundColor: "#A0AEB3" }}></div>
    </div>
  )
}

export default CarListingEdit