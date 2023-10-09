import React,{useState,useEffect} from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";
import { useDispatch,useSelector } from 'react-redux';

const Block = () => {
   const db = getDatabase();
  let [blockList,setBlockList] = useState([])
  let data = useSelector(state=> state.logedUser.value)

  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{

          arr.push({...item.val(),bid:item.key})
   
      })
      setBlockList(arr)
    });
  },[])

  let handleUnblock = (item)=>{
    set(push(ref(db, 'friends')), {
        whosendname: item.blockname,
        whosendid: item.blockid,
        whoreceivename: item.blockbyname,
        whoreceiveid: item.blockbyid,
    }).then(()=>{
      remove(ref(db,"block/"+item.bid))
    })
  }

  return (
    <div className='box'>
        <h3>Block User List</h3>
        {blockList.map(item=>(
           
            <div className='list'>
              <img src={gimg}/>
              <h4>{item.blockbyid == data.uid? item.blockname: item.blockbyname}</h4>
              {item.blockbyid == data.uid &&
              <Button variant="contained" color="error" onClick={()=>handleUnblock(item)}>UnBlock</Button>
              }
            </div>
          
        ))}
        
    </div>
  )
}

export default Block