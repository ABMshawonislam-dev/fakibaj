import React,{useState} from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let [formData,setFormData] = useState({
    email:"",
    password:""
  })

  let handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}



let handleLogin = ()=>{

  signInWithEmailAndPassword(auth, formData.email, formData.password).then((user)=>{
    console.log(user.user.emailVerified)
    if(user.user.emailVerified){
      navigate("/home")
    }else{
      toast.error('Please verify your email for login', {
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

  })
}
  return (
    <div className='registration'>
        <div className='left'>
            <div className='text-container'>
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
                <TextField onChange={handleChange} name="email" className='inputCss' type='email' id="outlined-basic" label="Email" variant="outlined" />
                <TextField onChange={handleChange} name="password" className='inputCss' type='password' id="outlined-basic" label="Password" variant="outlined" />
                <Button onClick={handleLogin} className='regbtn' variant="contained">Sign In</Button>
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