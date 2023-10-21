import React,{useEffect,useState} from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";
import { useDispatch,useSelector } from 'react-redux';
import { activeChat } from '../slices/activeChatSlice';


const Friends = () => {

  const db = getDatabase();
  let data = useSelector(state=> state.logedUser.value)
  let [reqList,setReqList] = useState([])
  let [friendList,setFriendList] = useState([])
  let dispatch = useDispatch()

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
        console.log("ami friend",item.val())

        if(item.val().whosendid == data.uid || item.val().whoreceiveid == data.uid){
          arr.push({...item.val(),fid:item.key})
        }


         

      })
      setFriendList(arr)
    });
  },[])

  let handleBlock = (item)=>{

    if(data.uid == item.whosendid){
       set(push(ref(db, 'block')), {
        blockid:item.whoreceiveid,
        blockname: item.whoreceivename,
        blockbyid: item.whosendid,
        blockbyname: item.whosendname
      }).then(()=>{
        remove(ref(db,'friends/'+item.fid))
      })
    }
    else{
      set(push(ref(db, 'block')), {
        blockid: item.whosendid,
        blockname: item.whosendname,
        blockbyid: item.whoreceiveid,
        blockbyname: item.whoreceivename
      }).then(()=>{
        remove(ref(db,'friends/'+item.fid))
      })

    }
  }

  let handleActiveChat = (item)=>{
    
    if(data.uid == item.whosendid){
      dispatch(activeChat({
        type: "single",
        activechatid: item.whoreceiveid,
        activechatname: item.whoreceivename
      }))

   
    }else{
      dispatch(activeChat({
        type: "single",
        activechatid: item.whosendid,
        activechatname: item.whosendname
      }))
  
    }

  }

  return (
    <div className='box'>
    <h3>Friends</h3>
    {friendList.map(item=>(
      <div className='list' onClick={()=>handleActiveChat(item)}>
        <img src={gimg}/>
        <h4>{item.whosendid == data.uid? item.whoreceivename:item.whosendname}</h4>
        <Button variant="contained" color="error" onClick={()=>handleBlock(item)}>Block</Button>
      </div>
    ))}
    
    
</div>
  )
}

export default Friends