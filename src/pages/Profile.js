import React from 'react';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { getUserToken, getUserEmail, getUserAuth } from './localStorage';
import './styleProfile.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom';
import {Alert} from '@mui/material';
import AdminTestDrives from '../components/AdminTestDrives';
import UserTestDrives from '../components/UserTestDrives';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CarDailyChart from './Dashboard1.js'
import CarMonthlyChart from './Dashboard.js'
import CarYearlyChart from './Dashboard2.js'
import DailyChart from './Dashboard3.js'
import MonthlyChart from './Dashboard4.js'
import YearlyChart from './Dashboard5.js'
import TestDailyChart from './Dashboard6.js'
import TestMonthlyChart from './Dashboard7.js'
import TestYearlyChart from './Dashboard8.js'
import DashboardBox from './DashboardBox';



var SERVER_URL = "https://royalmotors.azurewebsites.net/account";

const Profile = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  let [token, setToken] = React.useState(getUserToken());
  let [email, setEmail] = React.useState(getUserEmail());
  const [open, setOpen] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordAgain, setNewPasswordAgain] = React.useState("");

  const checkAdminStatus = (token) => {
    return axios.get('https://your-server.com/checkAdminStatus', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  
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
        phoneNumber : phoneNumber,
        address : address,
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
        phoneNumber : phoneNumber,
        address: address
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
      setPhoneNumber(data.phoneNumber);
      setAddress(data.address);
    })
    .catch((error) => console.error(error));
  }, [email, token]);

  const theme = createTheme({
    palette: {
        primary: {
        main: '#1C2F36',
        },
    },
    });
  
  return (
    <div className="bodyProfile">
    <main>
      <div className="profile-info">
        <h1 style={{color: 'black', fontSize: '30px', paddingBottom:'30px', paddingTop:'0px'}}>Profile Information</h1>
        {!isEditMode && (
          <>
          <div className='text'>
            <div className='text1' style={{marginLeft:"0"}}>
              <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}><strong>First Name:</strong> {firstName}</p>
              <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}><strong>Last Name:</strong> {lastName}</p>
            </div><div className='text1'>
              <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}><strong>Email:</strong></p>
              <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}>{email}</p>
            </div>
            <div className='text1'>
              <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}><strong>Address:</strong> {address}</p>
              <p style={{color: 'black', paddingBottom:'10px', paddingTop:'0px'}}><strong>Phone Number:</strong> {phoneNumber}</p>
            </div>
          </div>
            <div className="button-wrapper">
          
  <Button
    style={{ color: 'white' }}
    className="edit-profile"
    id="edit-profile"
    onClick={handleEditClick}
  >
    Edit Profile
  </Button>

  <Button
    style={{ color: 'white' }}
    className="change-password"
    id="change-password"
    onClick={handleClickOpenPass}
  >
    Change Password
  </Button>
</div>

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
        <ThemeProvider theme={theme}>
          <Button onClick={handleClosePass}>Cancel</Button>
          <Button onClick={handleNext}>Enter</Button>
        </ ThemeProvider>
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
              <TextField
                id="address"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{color: 'black'}}
              /><TextField
                id="phoneNumber"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{color: 'black'}}
              />
            </Box>
            <ThemeProvider theme={theme}>
              <Button variant="contained" onClick={handleClickOpen} style={{marginTop:"1%",marginRight:'1%'}}>
                Save
              </Button>
              <Button variant="contained" onClick={handleCloseNoChanges} style={{marginTop:"1%"}}>
                Cancel
              </Button>
            </ThemeProvider>

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
        <ThemeProvider theme={theme}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save changes</Button>
        </ThemeProvider>
        </DialogActions>
      </Dialog>
          </>
        )}
      </div>
      </main>
      {getUserAuth()==="admin"? (
        <AdminTestDrives /> // Render the admin profile component

      ) : (
        <UserTestDrives /> // Render the user profile component
      )}
      
{getUserAuth()==="admin"? (<DashboardBox/>):("")}
<div  className="graphs" style={{marginLeft: "100px", marginRight: "100px"}}>
  <div>
  {getUserAuth()==="admin"? (<CarDailyChart />):("")}
  </div>
  <div>
  {getUserAuth()==="admin"? (<CarMonthlyChart /> ):("")}
  </div>
  <div>
  {getUserAuth()==="admin"? (<CarYearlyChart /> ):("")}
  </div> <div>
  {getUserAuth()==="admin"? (<DailyChart />):("")}
  </div> <div>
  {getUserAuth()==="admin"? (<MonthlyChart /> ):("")}
  </div> <div>
  {getUserAuth()==="admin"? (<YearlyChart /> ):("")}
  </div> <div>
  {getUserAuth()==="admin"? (<TestDailyChart />):("")}
  </div> <div>
  {getUserAuth()==="admin"? (<TestMonthlyChart />):("")}
  </div> <div>
  {getUserAuth()==="admin"? (<TestYearlyChart />):("")}
  </div>
</div>
</div>
  );
};

export default Profile;
