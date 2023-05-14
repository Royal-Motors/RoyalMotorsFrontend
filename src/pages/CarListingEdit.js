import React from 'react';
import { useState, useEffect } from "react";
import "./CarListingDealer.css"
import axios from 'axios';
import { getUserToken } from './localStorage';
import { useLocation } from 'react-router-dom';

// {`/edit?id=${props.name}`}
const CarListingEdit = () => {
    // const location = useLocation();
    // const name = new URLSearchParams(location.search).get('id');
    const name="GAC GS3"
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
  
    let image2;
    let image3;
    let image4;
    let image5;
    let image6;
    let image7;
    let image8;
    let image9;
    let image10;
  
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

    //image 2
    const [originalFile2, setoriginalFile2] = useState(null);
    const [selectedFile2, setselectedFile2] = useState(null);
    const [booleanFile2, setbooleanFile2] = useState(true);
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
    
    function imageDeleteButton2() {
      setselectedFile2(null);
      setbooleanFile2(false);

    };  

    //image 3
    const [originalFile3, setoriginalFile3] = useState(null);
    const [selectedFile3, setselectedFile3] = useState(null);
    const [booleanFile3, setbooleanFile3] = useState(true);
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
    function imageDeleteButton3() {
      setselectedFile3(null);
      setbooleanFile3(false);
    }; 
    //image 4
    const [originalFile4, setoriginalFile4] = useState(null);
    const [selectedFile4, setselectedFile4] = useState(null);
    const [booleanFile4, setbooleanFile4] = useState(true);
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
    function imageDeleteButton4() {
      setselectedFile4(null);
      setbooleanFile4(false);
    };   

    //image 5
    const [originalFile5, setoriginalFile5] = useState(null);
    const [selectedFile5, setselectedFile5] = useState(null);
    const [booleanFile5, setbooleanFile5] = useState(true);
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

    function imageDeleteButton5() {
      setselectedFile5(null);
      setbooleanFile5(false);
    }; 

    //image 6
    const [originalFile6, setoriginalFile6] = useState(null);
    const [selectedFile6, setselectedFile6] = useState(null);
    const [booleanFile6, setbooleanFile6] = useState(true);
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
    function imageDeleteButton6() {
      setselectedFile6(null);
      setbooleanFile6(false);
    }; 
    //image 7
    const [originalFile7, setoriginalFile7] = useState(null);
    const [selectedFile7, setselectedFile7] = useState(null);
    const [booleanFile7, setbooleanFile7] = useState(true);
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
    function imageDeleteButton7() {
      setselectedFile7(null);
      setbooleanFile7(false);
    };  

    //image 8
    const [originalFile8, setoriginalFile8] = useState(null);
    const [selectedFile8, setselectedFile8] = useState(null);
    const [booleanFile8, setbooleanFile8] = useState(true);
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
    function imageDeleteButton8() {
      setselectedFile8(null);
      setbooleanFile8(false);
    }; 

    //image 9
    const [originalFile9, setoriginalFile9] = useState(null);
    const [selectedFile9, setselectedFile9] = useState(null);
    const [booleanFile9, setbooleanFile9] = useState(true);
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
    function imageDeleteButton9() {
      setselectedFile9(null);
      setbooleanFile9(false);
    }; 

    //image 10
    const [originalFile10, setoriginalFile10] = useState(null);
    const [selectedFile10, setselectedFile10] = useState(null);
    const [booleanFile10, setbooleanFile10] = useState(true);
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
    function imageDeleteButton10() {
      setselectedFile10(null);
      setbooleanFile10(false);
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
     
      const imageUrls = data.image_id_list ? data.image_id_list.split(",").map((word) => {
        if (word) {
            return "https://royalmotors.azurewebsites.net/image/" + word;
        }else{return "";}
      }).slice(1) : [];
      [image2, image3, image4, image5, image6, image7, image8, image9, image10] = imageUrls;
      setoriginalFile2(image2)
      setoriginalFile3(image3)
      setoriginalFile4(image4)
      setoriginalFile5(image5)
      setoriginalFile6(image6)
      setoriginalFile7(image7)
      setoriginalFile8(image8)
      setoriginalFile9(image9)
      console.log(originalFile9)
      setoriginalFile10(image10)
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

        const headerAuth = {
          headers: {
            'Authorization': `Bearer ${getUserToken()}`
          }
        };
        
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

        if (!booleanMainFileURL){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=1`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }
        if (!booleanFile2){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=2`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }
        if (!booleanFile3){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=3`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }if (!booleanFile4){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=4`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }if (!booleanFile5){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=5`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }if (!booleanFile6){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=6`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }if (!booleanFile7){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=7`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }if (!booleanFile8){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=8`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }if (!booleanFile9){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=9`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }if (!booleanFile10){
          try {
            const response = axios.delete(`https://royalmotors.azurewebsites.net/image?carName=${formValues.name}&order=10`, headerAuth);
            console.log(response.data); // handle success
          } catch (error) {
            console.error(error); // handle error
          }
        }
        

        //Sending the main image
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
              <div className="pictures">
                {selectedFile2 || (originalFile2 && booleanFile2)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile2?(URL.createObjectURL(selectedFile2)):(originalFile2)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton2}>
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
              </div>
              <div className="pictures">
                {selectedFile3 || (originalFile3 && booleanFile3)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile3?(URL.createObjectURL(selectedFile3)):(originalFile3)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton3}>
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
              </div>
              <div className="pictures">
                {selectedFile4 || (originalFile4 && booleanFile4)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile4?(URL.createObjectURL(selectedFile4)):(originalFile4)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton4}>
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
              </div>
              <div className="pictures">
                {selectedFile5 || (originalFile5 && booleanFile5)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile5?(URL.createObjectURL(selectedFile5)):(originalFile5)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton5}>
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
              </div>
              <div className="pictures">
                {selectedFile6 || (originalFile6 && booleanFile6)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile6?(URL.createObjectURL(selectedFile6)):(originalFile6)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton6}>
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
              </div>
              <div className="pictures">
                {selectedFile7 || (originalFile7 && booleanFile7)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile7?(URL.createObjectURL(selectedFile7)):(originalFile7)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton7}>
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
              </div>
              <div className="pictures">
                {selectedFile8 || (originalFile8 && booleanFile8)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile8?(URL.createObjectURL(selectedFile8)):(originalFile8)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton8}>
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
              </div>
              <div className="pictures">
                {selectedFile9 || (originalFile9 && booleanFile9)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile9?(URL.createObjectURL(selectedFile9)):(originalFile9)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton9}>
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
              </div>
              <div className="pictures">
                {selectedFile10 || (originalFile10 && booleanFile10)? (
                    <div className="containerForX">
                        <img style={{ width :'100%', borderRadius:'10px', margin:'2%'}}src={selectedFile10?(URL.createObjectURL(selectedFile10)):(originalFile10)} alt="selected"/>
                            <div className="deleteIcon" onClick={imageDeleteButton10}>
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

export default CarListingEdit