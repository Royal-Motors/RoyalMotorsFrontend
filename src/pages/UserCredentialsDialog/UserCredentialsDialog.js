import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import "./UserCredentialsDialog.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Component that presents a dialog to collect credentials from the user
export default function UserCredentialsDialog({
open,
onSubmit,
onClose,
title,
submitText,
}) {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [firstname, setFirstname] = useState("");
    let [lastname, setLastname] = useState("");
    let [address, setAddress] = useState("");
    let [phoneNumber, setPhone] = useState("");
    let [buttonText, setButtonText] = useState(submitText);

    const handleButtonClick = () => {
        onSubmit(email, password, firstname, lastname,address,phoneNumber);
      };
    const theme = createTheme({
    palette: {
        primary: {
        main: '#1C2F36',
        },
    },
    });

    return (
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
            </div>
            <div className="form-item">
                <TextField
                fullWidth
                label="First Name"
                type="text"
                value={firstname} 
                onChange={({ target: { value } }) => setFirstname(value)}
            />
            </div>
            <div className="form-item">
                <TextField
                fullWidth
                label="Last Name"
                type="text"
                value={lastname} 
                onChange={({ target: { value } }) => setLastname(value)}
            />
            </div>
            <div className="form-item">
                <TextField
                    fullWidth
                    label="Address"
                    type="text"
                    value={address} 
                    onChange={({ target: { value } }) => setAddress(value)}
                />
            </div>
            <div className="form-item">
                <TextField
                    fullWidth
                    label="Phone number"
                    type="text"
                    value={phoneNumber} 
                    onChange={({ target: { value } }) => setPhone(value)}
                />

            </div>
            <ThemeProvider theme={theme}>
            <Button
                color="primary"
                variant="contained"
                onClick={handleButtonClick}>
                {buttonText}
            </Button>
            </ThemeProvider>
            </div>
        </Dialog>
    );
}