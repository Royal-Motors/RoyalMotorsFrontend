import React, { useState, useEffect } from 'react';
import StaticDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import { getUserEmail, getUserToken } from './localStorage';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function TestDriveForm({ open, onClose, name }) {
  const [email, setEmail] = useState(getUserEmail());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [token, setToken] = useState(getUserToken());
  var convertedDates = [];

  useEffect(() => {
    fetch(`https://royalmotors.azurewebsites.net/testdrive/slots/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        name: name,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const dates = data.map((item) => new Date(item * 1000));
        console.log(dates);
        convertedDates = dates.map((dateString) => new Date(dateString));
        setAvailableDates(convertedDates);
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

  function requestTestDrive(dateToAdd) {
    const requestParam = {
      Time: dateToAdd.getTime() / 1000,
      AccountEmail: email,
      CarName: name,
    };
    fetch('https://royalmotors.azurewebsites.net/testdrive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestParam),
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
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <DialogTitle>Test Drive Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <label>Car Name: {name}</label>
              <StaticDatePicker
                id="test-drive-date"
                selected={selectedDate}
                showTimeSelect
                dateFormat="MM/dd/yyyy  EE hh:mm a"
                onChange={(date) => setSelectedDate(date)}
                includeDates={availableDates}
              />
            </div>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

