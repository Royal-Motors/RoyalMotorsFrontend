import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import "./UserCredentialsDialog.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getUserToken, getUserEmail, reload } from '../localStorage';
// Component that presents a dialog to collect credentials from the user
export default function UserCredentialsDialogIn({
open,
onSubmit,
onClose,
title,
submitText,
}) {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [openForgot, setOpenForgot] = useState(false);
    let [openForgot2, setOpenForgot2] = useState(false);
    let [code, setCode] = useState("");
    let [token, setToken] = useState(getUserToken());

    const handleForgotPassword = () =>{
setOpenForgot(true);
    }
    const handleNext1 = () => {
        sendResetCode();
        setOpenForgot2(true);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleNewPassword = (event) =>{
        setNewPassword(event.target.value);
    }
    const handleClosePass = () => {
        setOpenForgot(false);
    }
    const handleClosePass2 = () => {
        setOpenForgot2(false);
        handleClosePass();
    }
    function sendResetCode(){
    return fetch(`https://royalmotors.azurewebsites.net/account/reset/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          email: email,
              },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        return response.json();
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error(error));
}
const handleNext = () =>{
    resetPass(email,newPassword);
}

    function resetPass(email, password){
        return fetch(`https://royalmotors.azurewebsites.net/account/reset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
                  },
            body: JSON.stringify({
            code : code,
            password: password,
            email: email,
            }),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            console.log(email);
            console.log(response);
            handleClosePass2();
            handleClosePass();
            reload();
            return response.json();
          })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.error(error));
    }

    const handleCode = (event) =>{
        setCode(event.target.value);
    }
    const theme = createTheme({
    palette: {
        primary: {
        main: '#1C2F36',
        },
    },
    });

    

    return (
        <>
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <div className="dialog-container">

            <DialogTitle>{title}</DialogTitle>
            <div className="form-item">
                <TextField
                    fullWidth
                    label="Email"
                    type="text"
                    value={email} 
                    onChange={({ target: { value } }) => setEmail(value)}
                />

            </div>
            <div className="form-item">
                <TextField
                fullWidth
                label="Password"
                type="password"
                value={password} 
                onChange={({ target: { value } }) => setPassword(value)}
            />
            <div class='forgot'>
            <br></br>
                <p onClick={handleForgotPassword} style={{cursor:"pointer", width:"fit-content"}} >Forgot password?</p>
            </div>
            </div>
            <ThemeProvider theme={theme}>
            <Button
                variant="contained"
                onClick={() => onSubmit(email, password)} 
                className="signIn-button">
                {submitText}
            </Button>
            </ThemeProvider>
            </div>
        </Dialog>

<Dialog open={openForgot} onClose={handleClosePass}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleEmail}
          />
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClosePass}>Cancel</Button>
          <Button onClick={handleNext1}>Enter</Button>
        </DialogActions>
</Dialog>

<Dialog open={openForgot2} onClose={handleClosePass2}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
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
            id="code"
            label="Code"
            type="code"
            fullWidth
            variant="standard"
            onChange={handleCode}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePass2}>Cancel</Button>
          <Button onClick={handleNext}>Enter</Button>
        </DialogActions>
      </Dialog>
      </>
    );
}