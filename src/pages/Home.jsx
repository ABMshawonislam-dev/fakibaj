import React,{useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logeduser } from '../slices/userSlice';
import Grid from '@mui/material/Grid';
import Grouplist from '../components/Grouplist';
import Friendrequest from '../components/Friendrequest';
import Friends from '../components/Friends';
import Mygroup from '../components/Mygroup';
import Userlist from '../components/Userlist';
import Block from '../components/Block';
import { getDatabase,ref, set,push,onValue  } from "firebase/database";
import { activeChat } from '../slices/activeChatSlice';


const Home = () => {


    const auth = getAuth();
    const db = getDatabase();
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

    useEffect(()=>{
      const singleMsgRef = ref(db, 'lastmsg');
      onValue(singleMsgRef, (snapshot) => {
          snapshot.forEach(item=>{
                  dispatch(activeChat({
                    type: "single",
                    activechatid: item.val().activechatid,
                    activechatname: item.val().activechatname
                  }))
          })
      
      });
  },[])



  return (
    <>

    <Grid container spacing={2}>
        <Grid item xs={4}>
          <Grouplist/>
          <Friendrequest/>
        </Grid>
        <Grid item xs={4}>
          <Friends/>
          <Mygroup/>
        </Grid>
        <Grid item xs={4}>
          <Userlist/>
          <Block/>
        </Grid>
    </Grid>
        
        
   
    <Button onClick={handleLogOut} variant="contained">Logout</Button>
    </>
  )
}

export default Home