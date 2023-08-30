import React,{useState,useEffect} from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup  } from "firebase/auth";
import { useDispatch,useSelector } from 'react-redux';
import { logeduser } from '../slices/userSlice';

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let data = useSelector(state=> state.logedUser.value)
  console.log("asdasd",data)
    
    useEffect(()=>{
      if(data){
        console.log(data)
        navigate("/home")
      }
    },[])



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
      dispatch(logeduser(user.user))
      localStorage.setItem("user",JSON.stringify(user.user))
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


let handleGoogleLogin = ()=>{
  signInWithPopup(auth, provider).then(()=>{
    navigate("/home")
  })
}
  return (
    <div className='registration'>
        <div className='left'>
            <div className='text-container'>
                <h2>Get started with easily register</h2>
                <p>Free register and you can enjoy it</p>
                <Button onClick={handleGoogleLogin}  className='regbtn' variant="contained">Google Sign In</Button>
                <TextField onChange={handleChange} name="email" className='inputCss' type='email' id="outlined-basic" label="Email" variant="outlined" />
                <TextField onChange={handleChange} name="password" className='inputCss' type='password' id="outlined-basic" label="Password" variant="outlined" />
                <Button onClick={handleLogin} className='regbtn' variant="contained">Sign In</Button>
                <p>Don’t have an account ? <Link to="/" className='focus'>Sign up</Link></p>

                <p>Forgot Password ? <Link to="/forgotpassword" className='focus'>Click Here</Link></p>
                
            </div>
        </div>
        <div className='right'>
            <Image src={bg} className="bg"/>
        </div>
    </div>
  )
}

export default Login

