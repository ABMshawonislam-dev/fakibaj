import React, { useState } from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Registration = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let [formData,setFormData] = useState({
        fullname:"",
        email:"",
        password:""
    })

    let [fullnameError,setFullName] = useState("")
    let [emailError,setEmailError] = useState("")
    let [passwordError,setPasswordError] = useState("")
    let [open,setOpen] = useState(false)
    let [load,setLoad] = useState(false)

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

            
            setLoad(true)
            createUserWithEmailAndPassword(auth, formData.email, formData.password).then(()=>{


                sendEmailVerification(auth.currentUser).then(()=>{
                    setFormData({
                        fullname:"",
                        email:"",
                        password:""
                    })
                    setLoad(false)
                    toast.success('🦄Rregistration Successfull! PLease verify your email', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });

                setTimeout(()=>{
                    navigate("/login")
                },1000)
                })


                
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if(errorCode.includes("email")){
                    setEmailError("Email Already Exists")
                    toast.error('Email Already Exists', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                }
                // setEmailError(errorCode)
              
                setLoad(false)

               
              });
        }



    }



  return (
    <div className='registration'>
        <div className='left'>
            <div className='text-container'>
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
                <TextField onChange={handleChange} name="fullname" className='inputCss ' type='text' id="outlined-basic" label="Full Name" variant="outlined" value={formData.fullname}/>
                {fullnameError && 
                <Alert variant="filled" severity="error">
                    {fullnameError}
                </Alert>}
                <TextField onChange={handleChange} name="email" className='inputCss' type='email' id="outlined-basic" label="Email" variant="outlined" value={formData.email}/>
                 {emailError && 
                <Alert variant="filled" severity="error">
                    {emailError}
                </Alert>}
                <div>
                <TextField onChange={handleChange} name="password" className='inputCss' type={open? "text":'password'} id="outlined-basic" label="Password" variant="outlined" value={formData.password}/>
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
                {load
                ?
                <Button className='regbtn' variant="contained" >
                    <RotatingLines
                        strokeColor="white"
                        strokeWidth="2"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                        />
                </Button>
                :
                <Button onClick={handleRegistration} className='regbtn' variant="contained">
                    Sign up
                 
                </Button>
                }
                
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