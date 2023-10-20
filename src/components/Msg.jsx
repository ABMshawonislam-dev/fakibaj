import React, { useState } from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import ModalImage from "react-modal-image";
import{ TextField,Button} from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import {AiFillSmile} from "react-icons/ai"

const Msg = () => {

    let [show,setShow] = useState(false)
  return (
    <div className='msgbox'>
        <div className="containermsg">
        <div className='sendmsg'>
            <p>Hi Bp</p>
        </div>
        <div className='receivemsg'>
            <p>Hi Bp 😄</p>
        </div>
        <div className='sendimg'>
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
        </div>
        </div>
        <div className='msgfield'>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <AiFillSmile className='jisir' onClick={()=>setShow(!show)}/>
        <Button variant="contained">Send</Button>
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