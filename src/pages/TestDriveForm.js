import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import { getUserEmail, getUserToken} from "./localStorage";


const TestDriveForm = () => {
  const location = useLocation();
  const name = new URLSearchParams(location.search).get('id');
  const [email, setEmail] = useState(getUserEmail());
  const [selectedDate, setSelectedDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  let [token, setToken] = React.useState(getUserToken());

  useEffect(() => {
    fetch(`https://royalmotors.azurewebsites.net/testdrive/car/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,

      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const dates = data.map((item) => new Date(item.Time));
        setUnavailableDates(dates);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [name]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    if (selectedDate) {
      console.log(selectedDate);
      requestTestDrive(selectedDate);
    }
  };

  function requestTestDrive(dateToAdd){
    const requestParam = {
      Time: dateToAdd.getTime()/1000,
      AccountEmail: email,
      CarName: name

    };
    fetch('https://royalmotors.azurewebsites.net/testdrive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestParam)
    })
      .then((response) => {
        if (!response.ok) {
          console.log(JSON.stringify(requestParam));
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Test drive request sent:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <label>Car Name: {name}</label>
        <label>Email: {email}</label>
        <DatePicker
          id="test-drive-date"
          selected={selectedDate}
          showTimeSelect
          dateFormat="MM/dd/yyyy  EE hh:mm a"
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          excludeDates={unavailableDates}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TestDriveForm;
