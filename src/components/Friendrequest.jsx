import React,{useEffect, useState} from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";
import { useDispatch,useSelector } from 'react-redux';

const Friendrequest = () => {
  const db = getDatabase();
  let data = useSelector(state=> state.logedUser.value)
  let [reqList,setReqList] = useState([])

  useEffect(()=>{
    const friendrequesttRef = ref(db, 'friendrequest');
    onValue(friendrequesttRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if(item.val().whoreceiveid == data.uid){

          arr.push({...item.val(),frid:item.key})
        }
      })
      setReqList(arr)
    });
  },[])

  let handleDelete = (item)=>{
    console.log(item.frid)
    remove(ref(db, 'friendrequest/'+item.frid))
  }

  let handleAccept= (item)=>{
    set(push(ref(db, 'friends/')), {
      ...item
    }).then(()=>{
      remove(ref(db, 'friendrequest/'+item.frid))
    })
  }

  return (
    <div className='box'>
    <h3>Friend Request</h3>
    {reqList.map(item=>(
 <div className='list'>
 <img src={gimg}/>
 <h4>{item.whosendname}</h4>
 <Button variant="contained" onClick={()=>handleAccept(item)}>A</Button>
 <Button variant="contained" color='error' onClick={()=>handleDelete(item)}>D</Button>
 </div>
    ))}
   
    
</div>
  )
}

export default Friendrequest