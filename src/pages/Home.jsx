import React,{useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logeduser } from '../slices/userSlice';

const Home = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let data = useSelector(state=> state.logedUser.value)
    
    useEffect(()=>{
      if(!data){
        navigate("/login")
      }
    },[])

    let handleLogOut = ()=>{
        signOut(auth).then(() => {
          dispatch(logeduser(null))
          localStorage.removeItem("user")
          navigate("/login")
          })
    }
  return (
    <>

    <Button onClick={handleLogOut} variant="contained">Logout</Button>
    </>
  )
}

export default Home