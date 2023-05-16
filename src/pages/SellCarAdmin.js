import React from 'react'
import { useLocation } from 'react-router-dom';
import { getUserToken } from './localStorage';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import './SellCarAdmin.css';

const SellCarAdmin = () => {
    const location = useLocation();
    const name = new URLSearchParams(location.search).get('id');
    const navigate = useNavigate();

    const [carPrice, setCarPrice] = useState(null);
    const [carId, setCarId] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [unixTime, setUnixTime] = useState(null);
    const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchCarInfo = async () => {
      try {
        const response = await axios.get(`https://royalmotors.azurewebsites.net/car/${name}`, {
          headers: {
            'Authorization': `Bearer ${getUserToken()}`
          },
        });
        setCarPrice(response.data.price);
        setCarId(response.data.id);
        }
       catch (error) {
        console.error('Error fetching car info:', error);
      }
    };
    if (name) {
      fetchCarInfo();
    }
  }, [name]);

  const submitBtn = document.getElementById('submit-btn');
  const submitBtn2 = document.getElementById('submit-btn2');

  const handleTime = () => {

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = 'Loading...';

    const dateArray = selectedDate.split('/');
    const timeArray = selectedTime.split(':');

    const year = dateArray[2];
    const month = dateArray[1] - 1; // Month is zero-based in JavaScript Date object
    const day = dateArray[0];
    const hours = timeArray[0];
    const minutes = timeArray[1];

    const dateObject = new Date(year, month, day, hours, minutes);
    const unixTimestamp = Math.floor(dateObject.getTime() / 1000); // Convert to seconds

    setUnixTime(unixTimestamp);

    submitBtn.innerHTML = 'Submitted';
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
  };

  console.log(unixTime);

  const handleSell = async (event) => {

    submitBtn2.disabled = true;
    submitBtn2.classList.add('loading');
    submitBtn2.innerHTML = 'Loading...';

    const sellPayload = {
      id: 0,
      email: userEmail,
      carName: name,
      price: carPrice,
      time: unixTime,
    };
    console.log(sellPayload);

    try {
      const response = axios.delete('https://royalmotors.azurewebsites.net/car/sell', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getUserToken()}`
        },
        data: sellPayload,
      });

      console.log('Car sold:', response.data);

    } catch (error) {
      console.error('Error selling car:', error);
    }

};

    const handleGlobalSell = () => {
        handleSell();
        setTimeout(() => {
            navigate('/');
          }, 2000);
    };

  return (
    <div>
      <div className="break1"></div>
      <table>
        <tbody>
          <tr>
            <td id="top">Car Name</td>
            <td id="top">Price</td>
            <td id="top">User Mail</td>
            <td id="top">DD/MM/YYYY</td>
            <td id="top">Military Time <br></br>hh:mm</td>
          </tr>
          <tr>
            <td>{name}</td>
            <td>{carPrice} USD</td>
            <td>
              <input
                type="text"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </td>
            <td>
              <div className="sellButton">
                <button onClick={handleTime} id="submit-btn">Submit Time</button>
              </div>
            </td>
            <td>
                <div className="sellButton">
                    <button onClick={handleGlobalSell} id="submit-btn2">
                        <p>Sell</p>
                    </button>
                </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="break2"></div>
    </div>
  )
}

export default SellCarAdmin
