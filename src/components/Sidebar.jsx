import React ,{useState,useRef,createRef}from 'react'
import { useSelector,useDispatch } from 'react-redux';
import {AiFillHome,AiFillMessage,AiFillSetting,AiOutlineLogout} from "react-icons/ai"
import {IoIosNotifications} from "react-icons/io"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString ,getDownloadURL} from "firebase/storage";
import { getDatabase, ref as secondref, set } from "firebase/database";
import { logeduser } from '../slices/userSlice';

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Sidebar = () => {
    let userInfo = useSelector((state)=>state.logedUser.value)

let [url,setUrl] = useState("home")
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef()

  const storage = getStorage();
  const db = getDatabase();
  let dispatch = useDispatch()
const storageRef = ref(storage, userInfo.uid);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      console.log(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
      // Base64 formatted string
      const message2 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message2, 'data_url').then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          set(secondref(db, 'users/'+ userInfo.uid), {
            username: userInfo.displayName,
            email: userInfo.email,
            profile_picture : downloadURL
          }).then(()=>{
            console.log("done")
            localStorage.setItem("user",JSON.stringify({...userInfo,photoURL:downloadURL}))
            dispatch(logeduser({...userInfo,photoURL:downloadURL}))
          })
        });
      });
    }


  };

  let handleCropData = ()=>{
    getCropData()
  }




  return (
    <div className='sidebar'>
        <Button onClick={handleOpen}>

        <img className='sidebarimg' src={userInfo.photoURL}/>
        </Button>
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
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
            <div className="img-preview"></div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <input type="file" onChange={onChange} />
            <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                guides={true}
            />
            <Button onClick={handleCropData}>Done</Button>
     
            
        
          </Typography>
        </Box>
      </Modal>
    </div>
  
  )
}

export default Sidebar