import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const auth = getAuth();
    let [email,setEmail]= useState("")

    let handleForgotPassword = ()=>{
        sendPasswordResetEmail(auth, email).then(() => {
           console.log("gese")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

  return (
    <div className='forgotpage'>
        <div className="forgotbox">
            <h3>Forgot Password</h3>
            <TextField onChange={(e)=>setEmail(e.target.value)}  id="outlined-basic" label="Email" variant="outlined" />
            <br/>
            <Button onClick={handleForgotPassword} variant="contained">Contained</Button>
        </div>
    </div>
  )
}

export default ForgotPassword