import { useState, useCallback } from "react";
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Snackbar} from '@mui/material';
import {Alert} from '@mui/material';
import UserCredentialsDialog from './UserCredentialsDialog/UserCredentialsDialog';
import UserCredentialsDialogIn from './UserCredentialsDialog/UserCredentialsDialogIn';
import { getUserToken, saveUserToken, clearUserToken } from "./localStorage";
import { DataGrid } from '@mui/x-data-grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './sign-in.css';

var SERVER_URL = "https://royalmotors.azurewebsites.net/account";

function AppSignIn() {

    let [userToken, setUserToken] = useState(getUserToken());
    let [showSignUpDialog, setShowSignUpDialog] = useState(false);

    const States = {
        PENDING: "PENDING",
        USER_CREATION: "USER_CREATION",
        USER_LOG_IN: "USER_LOG_IN",
        USER_AUTHENTICATED: "USER_AUTHENTICATED",
        };

    let [authState, setAuthState] = useState(States.PENDING);


    function sign_in(email, password) {
        return fetch(`${SERVER_URL}/sign_in`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: email,
        password: password,
        }),
        })
        .then((response) => response.json())
        .then((body) => {
        setAuthState(States.USER_AUTHENTICATED);
        setUserToken(body.token);
        saveUserToken(body.token);
        });
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
        }).then(((response) => response.json()));
    }

    function sign_out() {
        setUserToken(null);
        clearUserToken();
    }

  return (
    <div className="App">
        <header className="App-header">
        </header>

        <UserCredentialsDialog
            open = {showSignUpDialog}
            title = "Registration"
            submitText={"Submit"}
            onSubmit={(email, password, firstname, lastname) => sign_up(email, password, firstname, lastname)}
            onClose = {() => setAuthState(States.PENDING)}
        />

        <UserCredentialsDialogIn
            open = {authState === States.USER_LOG_IN}
            title = "Login"
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
            <Alert severity="success">Success</Alert>
        </Snackbar>
      <html>
          <body>
              <div className="header">
              <AppBar position="static">
                <Toolbar>
                    <img src="/images/user.png" alt="user icon" className="user-icon"/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Royal Motors
                    </Typography>
                    <Button color="inherit" onClick={() => setShowSignUpDialog(true)}>Sign up</Button>
                </Toolbar>
                </AppBar>
              </div>
              <script src="script.js"></script>
          </body>
      </html>
    </div>
  );
}

export default AppSignIn;