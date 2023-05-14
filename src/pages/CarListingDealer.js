import React from 'react';
import {useState, useEffect} from "react";
import axios from 'axios';
import "./CarListingDealer.css"
import { getUserToken } from './localStorage';


const CarListingDealer = () => {

    //formValues is the variable that includes the information for the car
    const [formValues, setFormValues] = useState({
        name: '',
        make: '',
        model: '',
        year: '',
        color:'',
        used : false,
        price : '',
        description: "",
        mileage: '',
        horsepower: '',
        fuelconsumption: '', 
        fueltankcapacity: '',
        transmissiontype: '',
        image_id_list: "",
        video_id: "string"
    });
    
    // This is for when I input for the car information it updates formValues
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // formMainData has the main picture
    // formData has all other pictures
    // formDataAll loops through formData

    // This is to save the picture with no background
    const [selectedMainFile, setselectedMainFile] = useState(null);
    const formMainData = new FormData();

    //I had to do this because selectedMainFile would stay Null because setselectedMainFile is an asynchronous function,
    //which means that it does not immediately update the value of selectedMainFile. Instead, you can add a callback 
    // function to setselectedMainFile that will execute after the state has been updated. 
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
    
    // for the rest of the images below

    //image 2
    const [selectedFile2, setselectedFile2] = useState(null);
    const formData2 = new FormData();
    useEffect(() => {
        if (selectedFile2) {
          formData2.append('order', 2);
          formData2.append("File", selectedFile2);
        }
    },);
    const handleImage2Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile2(file);
    };    

    //image 3
    const [selectedFile3, setselectedFile3] = useState(null);
    const formData3 = new FormData();
    useEffect(() => {
        if (selectedFile3) {
          formData3.append('order', 3);
          formData3.append("File", selectedFile3);
        }
    },);
    const handleImage3Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile3(file);
    };    

    //image 4
    const [selectedFile4, setselectedFile4] = useState(null);
    const formData4 = new FormData();
    useEffect(() => {
        if (selectedFile4) {
          formData4.append('order', 4);
          formData4.append("File", selectedFile4);
        }
    },);
    const handleImage4Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile4(file);
    };    

    //image 5
    const [selectedFile5, setselectedFile5] = useState(null);
    const formData5 = new FormData();
    useEffect(() => {
        if (selectedFile5) {
          formData5.append('order', 5);
          formData5.append("File", selectedFile5);
        }
    },);
    const handleImage5Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile5(file);
    };    

    //image 6
    const [selectedFile6, setselectedFile6] = useState(null);
    const formData6 = new FormData();
    useEffect(() => {
        if (selectedFile6) {
          formData6.append('order', 6);
          formData6.append("File", selectedFile6);
        }
    },);
    const handleImage6Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile6(file);
    };    

    //image 7
    const [selectedFile7, setselectedFile7] = useState(null);
    const formData7 = new FormData();
    useEffect(() => {
        if (selectedFile7) {
          formData7.append('order', 7);
          formData7.append("File", selectedFile7);
        }
    },);
    const handleImage7Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile7(file);
    };    

    //image 8
    const [selectedFile8, setselectedFile8] = useState(null);
    const formData8 = new FormData();
    useEffect(() => {
        if (selectedFile8) {
          formData8.append('order', 8);
          formData8.append("File", selectedFile8);
        }
    },);
    const handleImage8Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile8(file);
    };    

    //image 9
    const [selectedFile9, setselectedFile9] = useState(null);
    const formData9 = new FormData();
    useEffect(() => {
        if (selectedFile9) {
          formData9.append('order', 9);
          formData9.append("File", selectedFile9);
        }
    },);
    const handleImage9Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile9(file);
    };    

    //image 10
    const [selectedFile10, setselectedFile10] = useState(null);
    const formData10 = new FormData();
    useEffect(() => {
        if (selectedFile10) {
          formData10.append('order', 10);
          formData10.append("File", selectedFile10);
        }
    },);
    const handleImage10Upload = async (event) => {
        const file = event.target.files[0];
        setselectedFile10(file);
    };  
    
    const submitBtn = document.getElementById('submit-btn');

    const handleSubmit = async (event) => {

        event.preventDefault();

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = 'Loading...';

        // Sending car information
        try {
            const info = await axios.post("https://royalmotors.azurewebsites.net/car",formValues, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUserToken()}`
                },
                });
        
                console.log('New car added!', info.data);
            } catch(error) {
                console.log(error.message);
                if (error.message==="Request failed with status code 400"){
                    alert("Car already exists.\nOnly images will be updated")
                }else if (error.message==="Request failed with status code 401"){
                    alert("You don't have the needed authorization")
                }
            }

        // Sending the no background picture
        if (formMainData && formMainData.get('File')) {
            try {
                formMainData.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=1`, formMainData, {
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
        //Sending the rest of the images one by one
        if (formData2 && formData2.get('File')) {
            try {
                formData2.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=2`, formData2, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 2 uploaded successfully!', response.data);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
        }
        if (formData3 && formData3.get('File')) {
            try {
                formData3.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=3`, formData3, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 3 uploaded successfully!', response.data);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
        }if (formData4 && formData4.get('File')) {
            try {
                formData4.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=4`, formData4, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 4 uploaded successfully!', response.data);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
        }if (formData5 && formData5.get('File')) {
            try {
                formData5.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=5`, formData5, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 5 uploaded successfully!', response.data);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
        }if (formData6 && formData6.get('File')) {
            try {
                formData6.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=6`, formData6, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 6 uploaded successfully!', response.data);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
        }if (formData7 && formData7.get('File')) {
            try {
                formData7.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=7`, formData7, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 7 uploaded successfully!', response.data);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
        }if (formData8 && formData8.get('File')) {
            try {
                formData8.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=8`, formData8, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 8 uploaded successfully!', response.data);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
        }if (formData9 && formData9.get('File')) {
            try {
                formData9.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=9`, formData9, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 9 uploaded successfully!', response.data);
                } catch (error) {
                  console.error('Error uploading image:', error);
                }
        }if (formData10 && formData10.get('File')) {
            try {
                formData10.append('carName', formValues.name);
                const response = await axios.post(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=10`, formData10, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${getUserToken()}`
                    }
                  });
              
                  console.log('Image 10 uploaded successfully!', response.data);
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
                <div className="pictures">
                    {selectedFile2? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={URL.createObjectURL(selectedFile2)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile2(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                            <label htmlFor="imageInput2" >
                                <div className='imageContainer'>
                                    <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                                </div>
                            </label>
                            <input
                                id="imageInput2"
                                type="file"
                                onChange={handleImage2Upload}
                                accept="image/*"
                                style={{ display: "none" }}
                        /></div>
                    )}
                </div><div className="pictures">
                    {selectedFile3? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px'}}src={URL.createObjectURL(selectedFile3)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile3(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                        <label htmlFor="imageInput3" >
                            <div className='imageContainer'>
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        <input
                            id="imageInput3"
                            type="file"
                            onChange={handleImage3Upload}
                            accept="image/*"
                            style={{ display: "none" }}
                        /></div>
                    )}
                </div> <div className="pictures">
                    {selectedFile4? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px'}}src={URL.createObjectURL(selectedFile4)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile4(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                        <label htmlFor="imageInput4" >
                            <div className='imageContainer'>
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        <input
                            id="imageInput4"
                            type="file"
                            onChange={handleImage4Upload}
                            accept="image/*"
                            style={{ display: "none" }}
                        /></div>
                    )}
                </div> <div className="pictures">
                    {selectedFile5? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px'}}src={URL.createObjectURL(selectedFile5)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile5(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                        <label htmlFor="imageInput5" >
                            <div className='imageContainer'>
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        <input
                            id="imageInput5"
                            type="file"
                            onChange={handleImage5Upload}
                            accept="image/*"
                            style={{ display: "none" }}
                        /></div>
                    )}
                </div><div className="pictures">
                    {selectedFile6? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px'}}src={URL.createObjectURL(selectedFile6)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile6(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                        <label htmlFor="imageInput6" >
                            <div className='imageContainer'>
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        <input
                            id="imageInput6"
                            type="file"
                            onChange={handleImage6Upload}
                            accept="image/*"
                            style={{ display: "none" }}
                        /></div>
                    )}
                </div><div className="pictures">
                    {selectedFile7? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px'}}src={URL.createObjectURL(selectedFile7)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile7(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                        <label htmlFor="imageInput7" >
                            <div className='imageContainer'>
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        <input
                            id="imageInput7"
                            type="file"
                            onChange={handleImage7Upload}
                            accept="image/*"
                            style={{ display: "none" }}
                        /></div>
                    )}
                </div><div className="pictures">
                    {selectedFile8? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px'}}src={URL.createObjectURL(selectedFile8)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile8(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                        <label htmlFor="imageInput8" >
                            <div className='imageContainer'>
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        <input
                            id="imageInput8"
                            type="file"
                            onChange={handleImage8Upload}
                            accept="image/*"
                            style={{ display: "none" }}
                        /></div>
                    )}
                </div><div className="pictures">
                    {selectedFile9? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px'}}src={URL.createObjectURL(selectedFile9)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile9(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                        <label htmlFor="imageInput9" >
                            <div className='imageContainer'>
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        <input
                            id="imageInput9"
                            type="file"
                            onChange={handleImage9Upload}
                            accept="image/*"
                            style={{ display: "none" }}
                        /></div>
                    )}
                </div><div className="pictures">
                    {selectedFile10? (
                        <div className="containerForX">
                            <img style={{ width :'100%', borderRadius:'10px'}}src={URL.createObjectURL(selectedFile10)} alt="selected" />
                                <div className="deleteIcon" onClick={() => setselectedFile10(null)}>
                                    <i className="fa fa-times" aria-hidden="true" />
                                </div>
                        </div>
                    ):(
                        <div className="image">
                        <label htmlFor="imageInput10" >
                            <div className='imageContainer'>
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                            </div>
                        </label>
                        <input
                            id="imageInput10"
                            type="file"
                            onChange={handleImage10Upload}
                            accept="image/*"
                            style={{ display: "none" }}
                        /></div>
                    )}
                </div>                
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

export default CarListingDealer