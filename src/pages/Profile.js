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
import {Alert} from '@mui/material';

var SERVER_URL = "https://royalmotors.azurewebsites.net/account";

const Profile = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  let [token, setToken] = React.useState(getUserToken());
  let [email, setEmail] = React.useState(getUserEmail());
  const [open, setOpen] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordAgain, setNewPasswordAgain] = React.useState("");
  
  function compare(newPassword,newPasswordAgain){
    if(newPassword==newPasswordAgain){
      console.log("equal");
      setPassword(newPassword);
      setOpenPass(false);
      handleSaveNewPass(email,newPassword);
      <Alert severity="success">Password updated successfully.</Alert>
    }
    else{
      console.log("here");
      <Alert severity="error">The two passwords do not match. Please try again.</Alert>
    }
  };
  const handlePassword = (event) => {
  setPassword(event.target.value);
};
const handleNewPassword = (event) => {
  setNewPassword(event.target.value);
};
const handleNewPasswordAgain = (event) => {
  setNewPasswordAgain(event.target.value);
};
 const handleClickOpenPass = () => {
setOpenPass(true);
 };
 const handleClosePass = () => {
  setOpenPass(false);
};
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseNoChanges = () => {
    setOpen(false);
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };
  function sign_in(email, password) {
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
      console.log(response);
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      const errorMessage = error.message;
      alert(`Sign-in failed: ${errorMessage==='Unauthorized' ? "Wrong Password: please try again" : ""}`);
            })
}
  const handleSaveClick = () => {
    sign_in(email, password);
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

  const handleSaveNewPass = (email,newpass) => {
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
        password: newpass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  };  
  function handleNext() {
    sign_in(email, password).then((response1) => {
      if(response1.token){
      console.log("comparing");
      compare(newPassword,newPasswordAgain);
        }
    })
    .catch((error) => {
      console.error(error); });
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

            <Button
              style={{color: 'white'}}
              className="change-password"
              id="change-password"
              onClick={handleClickOpenPass}
            >
              Change Password
            </Button>
        <Dialog open={openPass} onClose={handleClosePass}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="current"
            label="Current password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handlePassword}
          />
                    <TextField
            autoFocus
            margin="dense"
            id="new"
            label="New password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleNewPassword}
          />
            <TextField
            autoFocus
            margin="dense"
            id="new-again"
            label="Re-enter New password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleNewPasswordAgain}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePass}>Cancel</Button>
          <Button onClick={handleNext}>Enter</Button>
        </DialogActions>
      </Dialog>
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
            <Button variant="outlined" onClick={handleCloseNoChanges}>
        Cancel
            </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Changes</DialogTitle>
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
