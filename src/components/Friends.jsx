import React,{useEffect,useState} from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";
import { useDispatch,useSelector } from 'react-redux';


const Friends = () => {

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


  useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{


          arr.push({...item.val(),fid:item.key})

      })
      setReqList(arr)
    });
  },[])

  return (
    <div className='box'>
    <h3>Friends</h3>
    {reqList.map(item=>(
      <div className='list'>
    <img src={gimg}/>
    <h4>{item.whosendid == data.uid? item.whoreceivename:item.whosendname}</h4>
    <Button variant="contained" color="error">Block</Button>
    </div>
    ))}
    
    
</div>
  )
}

export default Friends