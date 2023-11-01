import React, { useState } from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import ModalImage from "react-modal-image";
import{ TextField,Button} from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import {AiFillSmile,AiFillFileImage} from "react-icons/ai"

import { useDispatch,useSelector } from 'react-redux';
import { getDatabase,ref, set,push,onValue  } from "firebase/database";
import { getStorage, ref as imgref, uploadBytes,getDownloadURL } from "firebase/storage";

import { useEffect } from 'react';
import moment from 'moment/moment';
import { AudioRecorder } from 'react-audio-voice-recorder';

const Msg = () => {

    const db = getDatabase();
    const storage = getStorage();
    let [show,setShow] = useState(false)
    let [msg,setMsg] = useState("")
    let [msglist,setMsglist] = useState([])
    let [audio,setAudio] = useState("")

    let data = useSelector((state)=> state.activeChat.value)
    let userdata = useSelector(state=> state.logedUser.value)

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        // const audio = document.createElement("audio");
        // audio.src = url;
        // audio.controls = true;
        // document.body.appendChild(audio);
        console.log("blob",blob)
        setAudio(blob)

      };

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
    },[data.activechatid])

    let handleImageUpload = (e)=>{
        console.log(e.target.files[0])
        const storageRef = imgref(storage, e.target.files[0].name);
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
                if(data.type == "single"){
                    set(push(ref(db, 'signlemsg')), {
                        whosendid: userdata.uid,
                        whosendname: userdata.displayName,
                        whoreceiveid: data.activechatid,
                        whoreceivename: data.activechatname,
                        img: downloadURL,
                        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                      });
                   }else{
                    console.log("tata")
                   }
              });
        });
    }

    let handleAudioUpload = ()=>{
        const storageRef = imgref(storage, Date.now().toString());
        uploadBytes(storageRef, audio).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {

                console.log(audio,downloadURL)
                if(data.type == "single"){
                    set(push(ref(db, 'signlemsg')), {
                        whosendid: userdata.uid,
                        whosendname: userdata.displayName,
                        whoreceiveid: data.activechatid,
                        whoreceivename: data.activechatname,
                        audio: downloadURL,
                        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                      })
                   }else{
                    console.log("tata")
                   }
              });
        });
    }

  return (
    
    <div className='msgbox'>
        <h1>{data.activechatname}</h1>
        <div className="containermsg">
            {data.type == "single" ?
            msglist.map(item=>(
                item.msg 
                ?
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
                :
                item.audio 
                ?
                item.whosendid == userdata.uid ?
                <div className='sendaudio'>
                <audio src={item.audio} controls></audio>
                </div>
                :
        
                <div className='receiveaudio'>
                <audio src={item.audio} controls></audio>
                </div>
                :
                item.whosendid == userdata.uid ?
                <div className='sendimg'>
                    <div className='imgbox'>
                
                        <ModalImage
                        small={item.img}
                        large={item.img}
                        alt="Hello World!"
                        />
                    </div>
                </div>
                :
                <div className='receiveimg'>
            <div className='imgbox'>
           
             <ModalImage
            small={item.img}
            large={item.img}
            alt="Hello World!"
            />
            </div>
        </div>
               
            ))
            :
            <h1>Ami Group Msg</h1>
        }

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
        {audio 
        ?
        <>
            <audio src={URL.createObjectURL(audio)} controls></audio>
        <Button variant="contained" onClick={handleAudioUpload}>Send</Button>
        <Button variant="contained" color='error' onClick={()=>setAudio("")}>Delete</Button>
        </>
         :
         <>
            <TextField onChange={(e)=>setMsg(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" value={msg}/>
        <AiFillSmile className='jisir' onClick={()=>setShow(!show)}/>
        <label>
        <input type='file' hidden onChange={handleImageUpload} accept="image/*"/>
        <AiFillFileImage className='jimam' />
        </label>
        <div className='ji'>
        <AudioRecorder 
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }} 
      downloadOnSavePress={false}
      downloadFileExtension="webm"
    />
        </div>
        <Button variant="contained" onClick={handleMsgSend}>Send</Button>
        {show &&
            <div className='emojiholder'>
                 <EmojiPicker onEmojiClick={(e)=>setMsg(msg+e.emoji)}/>
            </div>
       }

       
      
         </>
         }
         </div>
    </div>
  )
}

export default Msg