import React from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='registration'>
        <div className='left'>
            <div className='text-container'>
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
                <TextField className='inputCss' type='email' id="outlined-basic" label="Email" variant="outlined" />
                <TextField className='inputCss' type='password' id="outlined-basic" label="Password" variant="outlined" />
                <Button className='regbtn' variant="contained">Sign In</Button>
                <p>Don’t have an account ? <Link to="/" className='focus'>Sign up</Link></p>
                
            </div>
        </div>
        <div className='right'>
            <Image src={bg} className="bg"/>
        </div>
    </div>
  )
}

export default Login