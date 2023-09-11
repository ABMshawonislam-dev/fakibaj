import React ,{useState}from 'react'
import { useSelector } from 'react-redux';
import {AiFillHome,AiFillMessage,AiFillSetting,AiOutlineLogout} from "react-icons/ai"
import {IoIosNotifications} from "react-icons/io"
import { Link } from 'react-router-dom';

const Sidebar = () => {
    let userInfo = useSelector((state)=>state.logedUser.value)

let [url,setUrl] = useState("home")
  return (
    <div className='sidebar'>
        <img className='sidebarimg' src={userInfo.photoURL}/>
        <h1>{userInfo.displayName}</h1>

        <ul >
            <li onClick={()=>setUrl("home")} className={url=="home"&&"active"}>
                <Link to="/home"><AiFillHome className='icon'/></Link>
            </li>
            <li onClick={()=>setUrl("msg")} className={url=="msg"&&"active"}>
                <Link to="/msg"><AiFillMessage className='icon'/></Link>
            </li>
            <li onClick={()=>setUrl("notification")} className={url=="notification"&&"active"}>
                <Link to="/notification"><IoIosNotifications className='icon'/></Link>
            </li>
            <li><AiFillSetting className='icon'/></li>
            <li><AiOutlineLogout className='icon'/></li>
        </ul>
    </div>
  )
}

export default Sidebar