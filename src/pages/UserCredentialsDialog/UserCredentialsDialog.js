import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import "./UserCredentialsDialog.css";
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
    let [buttonText, setButtonText] = useState(submitText);

    const handleButtonClick = () => {
        setButtonText("Loading...");
        onSubmit(email, password, firstname, lastname);
        setButtonText("Done!");
        setTimeout(() => {
            setButtonText(submitText);
          }, 4000);
      };

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
            <Button
                color="primary"
                variant="contained"
                onClick={handleButtonClick}>
                {buttonText}
            </Button>
            </div>
        </Dialog>
    );
}