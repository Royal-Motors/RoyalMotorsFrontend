import React from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { getUserToken } from './localStorage';
import './styleProfile.css';
import { useParams } from 'react-router-dom';


var SERVER_URL = "https://royalmotors.azurewebsites.net/account";

const Profile = (email) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  let [token, setToken] = React.useState(getUserToken());

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    fetch(`${SERVER_URL}/edit/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };


  fetch(`${SERVER_URL}/edit/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
  .then((response) => {
    return response.json();
  })
    .then((data) => {
      console.log(data)
      setFirstName(data.firstname);
      setLastName(data.lastname);
    })
    .catch((error) => console.error(error));


  return (
    <div className="bodyProfile">
    <main>
      <section className="profile-info">
        <h1 style={{color: 'black', fontSize: '30px', paddingBottom:'30px', paddingTop:'0px'}}>Profile Information</h1>
        {!isEditMode && (
          <>
            <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}><strong>First Name:</strong> {firstName}</p>
            <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}><strong>Last Name:</strong> {lastName}</p>
            <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}><strong>Email:</strong> {email}</p>
            <Button
              style={{color: 'white'}}
              className="edit-profile"
              id="edit-profile"
              onClick={handleEditClick}
            >
              Edit Profile
            </Button>
          </>
        )}
        {isEditMode && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{color: 'black'}}
              />
              <TextField
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{color: 'black'}}
              />
            </Box>
            <Button
              variant="contained"
              style={{color: 'white'}}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          </>
        )}
      </section>
        <section className="testdrives">
        <h1 style={{color: 'black', fontSize: '30px'}}>Test Drives</h1>
          <div className="current">
            <h3>Current Testdrives</h3>
            <Button className="reschedule">Reschedule</Button>
          </div>
          <div className="previous">
            <h3>Previous Testdrives</h3>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
