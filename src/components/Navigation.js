import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState, useCallback } from "react";
import { useEffect } from 'react';
import {Snackbar} from '@mui/material';
import {Alert} from '@mui/material';
import UserCredentialsDialog from '../pages/UserCredentialsDialog/UserCredentialsDialog';
import UserCredentialsDialogIn from '../pages/UserCredentialsDialog/UserCredentialsDialogIn';
import { getUserToken, saveUserToken, clearUserToken } from "../pages/localStorage";
import '../pages/sign-in.css';

import { Link } from 'react-router-dom';
import { scrollToElement } from './Functions';

const Navigation = () => {

  var SERVER_URL = "https://royalmotors.azurewebsites.net/account";

  const [anchorEl, setAnchorEl] = useState(null);
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  let [userToken, setUserToken] = useState(getUserToken());

    const States = {
        PENDING: "PENDING",
        USER_CREATION: "USER_CREATION",
        USER_LOG_IN: "USER_LOG_IN",
        USER_AUTHENTICATED: "USER_AUTHENTICATED",
        };

let [authState, setAuthState] = useState(States.PENDING);
let menuContent = null;


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
          return response.json();
        })
        .then((body) => {
        setAuthState(States.USER_AUTHENTICATED);
        setUserToken(body.token);
        saveUserToken(body.token);
        })
        .catch(error => {
          console.error('Error:', error);
          const errorMessage = error.message;
                })
    }

    function sign_up(email, password, firstname, lastname) {
        return fetch(`${SERVER_URL}/sign_up`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
        }),
        })        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch(error => {
          console.error('Error:', error);
          const errorMessage = error.message;
        })
    }

    function sign_out() {
        setUserToken(null);
        clearUserToken();
        setAuthState(States.PENDING);

    }

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignInClick = () => {
    setAuthState(States.USER_LOG_IN);
    handleClose();
  };

  const handleSignUpClick = () => {
    setAuthState(States.USER_CREATION);
    handleClose();
  };

  
  return (
    <div>
      <nav id="nav">
        <img className="Logo" src={process.env.PUBLIC_URL + 'Logos/LOGO.png'} alt="logo" />
        <a href="HomePage" style={{ textDecoration: 'none' }}>
          Home Page
        </a>
        <a href="CompareCars" style={{ textDecoration: 'none' }}>
          Compare Cars
        </a>
        <img
              className="icon"
              src={process.env.PUBLIC_URL + 'Logos/user.png'}
              alt="logo"
              onClick={handleProfileClick}
            />
    <div>
    <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={() => setAnchorEl(null)}
  >
    {userToken !== null ?(
        <>
          <MenuItem sx={{ fontSize: '18px', pr: '35px', pl: '15px' }}>
          <a href="Profile" style={{ textDecoration: 'none' }}>
          Profile
        </a>
          </MenuItem>
          <MenuItem sx={{ fontSize: '18px', pr: '35px', pl: '15px' }} onClick={sign_out}>
          <a href="HomePage" style={{ textDecoration: 'none' }}>Logout</a>
          </MenuItem>
        </>
      ):(
        <>
          <MenuItem sx={{ fontSize: '18px', pr: '35px', pl: '15px' }} onClick={handleSignUpClick}>
            Register
          </MenuItem>
          <MenuItem sx={{ fontSize: '18px', pr: '35px', pl: '15px' }} onClick={handleSignInClick}>
            Login
          </MenuItem>
        </>
      )
      }
      </Menu>
      </div>
      </nav>

      <div className="App">
        <header className="App-header">
        </header>

        <UserCredentialsDialog
            open = {authState === States.USER_CREATION}
            title = "Register"
            submitText={"Submit"}
            onSubmit={(email, password, firstname, lastname) => sign_up(email, password, firstname, lastname)}
            onClose = {() => setAuthState(States.PENDING)}
        />

        <UserCredentialsDialogIn
            open = {authState === States.USER_LOG_IN}
            title = "Sign In"
            submitText={"Submit"}
            onSubmit={(email, password) => sign_in(email, password)}
            onClose = {() => setAuthState(States.PENDING)}
        />

        <Snackbar
            elevation={6}
            variant="filled"
            open={authState === States.USER_AUTHENTICATED}
            autoHideDuration={4000}
            onClose={() => setAuthState(States.PENDING)}
            >
            <Alert severity="success">Successfully logged in!</Alert>
        </Snackbar>
        <Snackbar
            elevation={6}
            variant="filled"
            autoHideDuration={4000}
            onClose={() => setAuthState(States.PENDING)}
            >
            <Alert severity="info">Please check your email for verification code.</Alert>
        </Snackbar>
    </div>

    </div>
    
  );
};

export default Navigation;





