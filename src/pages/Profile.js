import React from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { getUserToken, getUserEmail } from './localStorage';
import './styleProfile.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom';

var SERVER_URL = "https://royalmotors.azurewebsites.net/account";

const Profile = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  let [token, setToken] = React.useState(getUserToken());
  let [email, setEmail] = React.useState(getUserEmail());
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  
  const handlePassword = (event) => {
  setPassword(event.target.value);
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };
  function sign_in() {
    return fetch(`${SERVER_URL}/sign_in`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    email: email,
    password: password,
    }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((body) => {
    })
    .catch(error => {
      console.log(password)
      console.error('Error:', error);
      const errorMessage = error.message;
      alert(`Sign-in failed: ${errorMessage==='Unauthorized' ? "Wrong Password: please try again" : ""}`);
            })
}
  const handleSaveClick = () => {
    sign_in();
    fetch(`${SERVER_URL}/edit/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
            },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsEditMode(false);
      })
      .catch((error) => console.error(error));
  };  

  
  
  
  React.useEffect(() => {
    fetch(`${SERVER_URL}/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        email : email,
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
  }, [email, token]);


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
            <Button variant="outlined" onClick={handleClickOpen}>
        Save
            </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To confirm these changes, please re-enter your password:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handlePassword}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save changes</Button>
        </DialogActions>
      </Dialog>
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
