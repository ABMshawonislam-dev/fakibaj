import React, { useEffect, useState } from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,set,push  } from "firebase/database";
import { useSelector } from 'react-redux';



const Userlist = () => {
  const db = getDatabase();
  let [userslist,setUserslist] = useState([])

  let userInfo = useSelector((state)=>state.logedUser.value)




  useEffect(()=>{
  const userRef = ref(db, 'users');
  onValue(userRef, (snapshot) => {
    let arr = []
    snapshot.forEach(item=>{
      if(userInfo.uid != item.key){
        arr.push({...item.val(),userid: item.key})
      }
    })
    setUserslist(arr)
  });
  },[])

  let handleFriendRequest = (info)=>{

     set(push(ref(db, 'friendrequest')), {
        whosendname: userInfo.displayName,
        whosendid: userInfo.uid,
        whoreceivename: info.username,
        whoreceiveid: info.userid,
    });


  }

  return (
    <div className='box'>
        <h3>User List</h3>
        {userslist.map(item=>(
        <div className='list'>
          <img src={gimg}/>
          <h4>{item.username} </h4>
          <Button onClick={()=>handleFriendRequest(item)} variant="contained">+</Button>
        </div>
        ))}
        
        
    </div>
  )
}

export default Userlist