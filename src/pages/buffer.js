import React from 'react';
import { useState, useEffect } from "react";
import "./CarListingDealer.css"
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

    //This is where I store the main image
    const [selectedMainFile, setselectedMainFile] = useState(null);
    const formMainData = new FormData();

    useEffect(() => {
        fetch(`https://royalmotors.azurewebsites.net/car/${name}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [name]);

          
          useEffect(() => {
            setselectedMainFile(data.image_id_list ? data.image_id_list.split(",").map((word) => "https://royalmotors.azurewebsites.net/image/" + word)[0] : null)
          }, [data]);
          
    // This is for the main car   
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
    
  return (
    <div>
        <div className="mainCarSection">
            <div className="big-car-info">
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
    </div>
  )
}

export default CarListingEdit