import React, { useState } from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import ModalImage from "react-modal-image";
import{ TextField,Button} from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import {AiFillSmile} from "react-icons/ai"

import { useDispatch,useSelector } from 'react-redux';
import { getDatabase,ref, set,push,onValue  } from "firebase/database";
import { useEffect } from 'react';
import moment from 'moment/moment';

const Msg = () => {

    const db = getDatabase();
    let [show,setShow] = useState(false)
    let [msg,setMsg] = useState("")
    let [msglist,setMsglist] = useState([])

    let data = useSelector((state)=> state.activeChat.value)
    let userdata = useSelector(state=> state.logedUser.value)



    let handleMsgSend = ()=>{
       if(data.type == "single"){
        set(push(ref(db, 'signlemsg')), {
            whosendid: userdata.uid,
            whosendname: userdata.displayName,
            whoreceiveid: data.activechatid,
            whoreceivename: data.activechatname,
            msg: msg,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
          });
       }else{
        console.log("tata")
       }
       
    }


    useEffect(()=>{
        const singleMsgRef = ref(db, 'signlemsg');
        onValue(singleMsgRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=>{
                if((item.val().whosendid == userdata.uid && item.val().whoreceiveid == data.activechatid) || 
                    (item.val().whosendid == data.activechatid  && item.val().whoreceiveid == userdata.uid )
                ){
                    arr.push(item.val())
                }
            })
            setMsglist(arr)
        });
    },[])

  return (
    
    <div className='msgbox'>
        <h1>{data.activechatname}</h1>
        <div className="containermsg">
            {msglist.map(item=>(
                item.whosendid == userdata.uid ?
                <div className='sendmsg'>
                     <p>{item.msg}</p><br/>
                     <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                </div>
                :
                <div className='receivemsg'>
                    <p>{item.msg}</p><br/>
                    <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                </div>
            ))}

        {/* <div className='sendmsg'>
            <p>Hi Bp</p>
        </div>
        <div className='receivemsg'>
            <p>Hi Bp 😄</p>
        </div> */}
        {/* <div className='sendimg'>
            <div className='imgbox'>
           
             <ModalImage
            small={bg}
            large={bg}
            alt="Hello World!"
            />
            </div>
        </div>

        <div className='receiveimg'>
            <div className='imgbox'>
           
             <ModalImage
            small={bg}
            large={bg}
            alt="Hello World!"
            />
            </div>
        </div>

        <div className='sendaudio'>
        <audio controls></audio>
        </div>
        

        <div className='receiveaudio'>
        <audio controls></audio>
        </div>

        <div className='sendvideo'>
            <video width="320" height="240" controls></video>
        </div>

        <div className='receivevideo'>
            <video width="320" height="240" controls></video>
        </div> */}
        </div>
        <div className='msgfield'>
        <TextField onChange={(e)=>setMsg(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
        <AiFillSmile className='jisir' onClick={()=>setShow(!show)}/>
        <Button variant="contained" onClick={handleMsgSend}>Send</Button>
        {show &&
            <div className='emojiholder'>
                 <EmojiPicker />
            </div>
       }
        </div>
    </div>
  )
}

export default Msg