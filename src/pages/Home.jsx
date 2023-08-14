import React,{useState} from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link,useNavigate } from 'react-router-dom';
const Home = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let handleLogOut = ()=>{
        signOut(auth).then(() => {
            navigate("/login")
          })
    }
  return (
    <Button onClick={handleLogOut} variant="contained">Logout</Button>
  )
}

export default Home