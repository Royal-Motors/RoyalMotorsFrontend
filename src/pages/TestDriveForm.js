import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from 'react-router-dom';
import { getUserEmail, getUserToken } from './localStorage';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "./testdrive.css";
import {Snackbar} from '@mui/material';
import {Alert} from '@mui/material';

export default function TestDriveForm({ open, onClose, name }) {
  const [email, setEmail] = useState(getUserEmail());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [token, setToken] = useState(getUserToken());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);



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
        setAvailableDates(dates);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [name]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      const timeslots = availableDates.filter(date => {
        const formattedAvailableDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return formattedAvailableDate.getTime() === formattedDate.getTime();
      });
      setAvailableTimes(timeslots);
    }
  }, [selectedDate, availableDates]);

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
        setOpenAlert(true);

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
              <DatePicker
                id="test-drive-date"
                selected={selectedDate}
                showTimeSelect
                dateFormat="MM/dd/yyyy  EE hh:mm a"
                onChange={(date) => setSelectedDate(date)}
                includeDates={availableDates}
                includeTimes={availableTimes}
              />
            </div>
            <Button style={{ color: 'white' }} type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
            elevation={6}
            variant="filled"
            open={openAlert}
            autoHideDuration={4000}
            onClose={() => setOpenAlert(false) }
            >
            <Alert severity="success">Successfully scheduled testdrive!</Alert>
    </Snackbar>
    </>
  );
}


