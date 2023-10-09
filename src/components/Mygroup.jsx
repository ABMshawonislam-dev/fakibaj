import React,{useEffect,useState} from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";
import { useDispatch,useSelector } from 'react-redux';

const Mygroup = () => {
  const db = getDatabase();
   let [groupList,setGroupList] = useState([])
 let data = useSelector(state=> state.logedUser.value)
    useEffect(()=>{
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if(item.val().adminid == data.uid){

          arr.push(item.val())
        }
      })
      setGroupList(arr)
    });
  },[])
  return (
    <div className='box'>
    <h3>My Group</h3>
    {groupList.map(item=>(
      <div className='list'>
    <img src={gimg}/>
    <h4>{item.groupname}</h4>
    <Button variant="contained">Join</Button>
    </div>
    ))}
    
</div>
  )
}

export default Mygroup