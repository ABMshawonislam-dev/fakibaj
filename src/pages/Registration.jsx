import React, { useState } from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';


const Registration = () => {
    const auth = getAuth();
    let [formData,setFormData] = useState({
        fullname:"",
        email:"",
        password:""
    })

    let [fullnameError,setFullName] = useState("")
    let [emailError,setEmailError] = useState("")
    let [passwordError,setPasswordError] = useState("")
    let [open,setOpen] = useState(false)

    let handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

      if(e.target.name == "fullname"){
            setFullName("")
      }
      if(e.target.name == "email"){
            setEmailError("")
      }
      if(e.target.name == "password"){
            setPasswordError("")
      }
    }

    let handleRegistration = ()=>{

        
        if(!formData.fullname){
            setFullName("Fullname Required")
        }

        if(!formData.email){
            setEmailError("Email Required")
        }

        if(!formData.password){
            setPasswordError("Password Required")
        }

        if(formData.email && formData.fullname && formData.password){

            let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            // let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            // if(!pattern.test(formData.email)){
            //     setEmailError("Invalid Email")
            // }

            // if(formData.fullname.length < 3){
            //     setFullName("Fullname must be 3character")
            // }

            // if(!re.test(formData.password)){
            //     setPasswordError("Password not strong")
            // }

            console.log("asdfsdfwerwttytyuhdfgdfgdhg")
        }



    }



  return (
    <div className='registration'>
        <div className='left'>
            <div className='text-container'>
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
                <TextField onChange={handleChange} name="fullname" className='inputCss ' type='text' id="outlined-basic" label="Full Name" variant="outlined" />
                {fullnameError && 
                <Alert variant="filled" severity="error">
                    {fullnameError}
                </Alert>}
                <TextField onChange={handleChange} name="email" className='inputCss' type='email' id="outlined-basic" label="Email" variant="outlined" />
                 {emailError && 
                <Alert variant="filled" severity="error">
                    {emailError}
                </Alert>}
                <div>
                <TextField onChange={handleChange} name="password" className='inputCss' type={open? "text":'password'} id="outlined-basic" label="Password" variant="outlined" />
                {open 
                ?
                <AiFillEye onClick={()=>setOpen(false)} className='eye'/>
                 :
                 <AiFillEyeInvisible onClick={()=>setOpen(true)} className='eye'/>
                 
                 }

                </div>
                  {passwordError && 
                <Alert variant="filled" severity="error">
                    {passwordError}
                </Alert>}
                <Button onClick={handleRegistration} className='regbtn' variant="contained">Sign up</Button>
                <p>Alredy have an account ? <Link to="/login" className='focus'>Sign In</Link></p>
                
            </div>
        </div>
        <div className='right'>
            <Image src={bg} className="bg"/>
        </div>
    </div>
  )
}

export default Registration