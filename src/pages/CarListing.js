import React from 'react';
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import TestDriveForm from './TestDriveForm';
import { getUserToken, saveUserToken, clearUserToken } from "./localStorage";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Navigation from '../components/Navigation.js';


const CarListing = ({ email}) => {

    // I fetch the car 
    const {name}= useParams();
    const savedEmail=email;
    const [data, setData] = useState([]);
    let [userToken, setUserToken] = useState(getUserToken());


    useEffect(() => {
        fetch(`https://royalmotors.azurewebsites.net/car/${name}`)
        .then((response) => response.json())
        .then((data) => setData(data));
        console.log(data)
    }, [name,data]);
    
    //This is to display images
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState([]);
    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        const imageUrls = data.image_id_list ? data.image_id_list.split(",").map((word) => {
    if (word) {
        return "https://royalmotors.azurewebsites.net/image/" + word;
    }
}).filter(Boolean).slice(1) : [];
        const promises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
            resolve({ url, width: img.width, height: img.height });
            };
            img.onerror = reject;
            img.src = url;
        });
        });
        Promise.all(promises).then(setLoadedImages);
    }, [data.image_id_list]);

    const handlePrevClick = () => {
        setCurrentImageIndex((index) =>
        index === 0 ? loadedImages.length - 1 : index - 1
        );
    };

  const handleNextClick = () => {
    setCurrentImageIndex((index) =>
      index === loadedImages.length - 1 ? 0 : index + 1
    );
  };

  const currentImage = loadedImages[currentImageIndex];
      

    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        setUserToken(getUserToken());
      }, [userToken]);

  return (
    <div>
        <div className="mainCarSection">
            <div className="big-car-info">
                <h2>{data.name}</h2>
                <h2>{savedEmail}</h2>
                <h2 className="buffer">buffer</h2> 
                {userToken !== null ? (
        <Link to={`/TestDriveForm/${data.name}`}>
          <button>TEST DRIVE</button>
        </Link>
      ) : (
        <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        TEST DRIVE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Login or Register"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Please login or register to schedule a testdrive.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
        
      )}
            </div>
        <img className="mainImg" src={data.image_id_list ? data.image_id_list.split(",").map((word) => "https://royalmotors.azurewebsites.net/image/" + word)[0] : ""} alt="Main" />
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

        <div className="info" >
            <div className="picture" >
            {currentImage && (<img src={currentImage.url} alt="" className="images" />)}
            {loadedImages.length > 1 && (
            <>
                <button className="button prev" onClick={handlePrevClick}>&#8249;</button>
                <button className="button next" onClick={handleNextClick}>&#8250;</button>
                </>
            )}
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