import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import "./UserCredentialsDialog.css";
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
            
            <Button
                color="primary"
                variant="contained"
                onClick={() => onSubmit(email, password)}>
                {submitText}
            </Button>
            </div>
        </Dialog>
    );
}