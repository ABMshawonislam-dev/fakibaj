import React,{useState,useEffect} from 'react'
import gimg from "../assets/img.png"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useDispatch,useSelector } from 'react-redux';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";

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


const Grouplist = () => {
  const db = getDatabase();
  const [open, setOpen] = useState(false);

  const [gname, setGname] = useState("");
  const [gtag, setGtag] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let data = useSelector(state=> state.logedUser.value)
  let [groupList,setGroupList] = useState([])

  useEffect(()=>{
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if(item.val().adminid != data.uid){

          arr.push({...item.val(),gid:item.key})
        }
      })
      setGroupList(arr)
    });
  },[])

  let handleCreateGroup = ()=>{
    console.log(gname,gtag)
    set(push(ref(db, 'group')), {
        groupname:gname,
        grouptag: gtag,
        adminid: data.uid,
        adminname: data.displayName
      }).then(()=>{
        setOpen(false)
      })
  }

  let handleGroupJoin = (item)=>{
    console.log("join",item)
    set(push(ref(db, 'grouprequest')), {
      ...item,
      whosendid: data.uid,
      whosendname: data.displayName,
    })
  }

  return (
    <div className='box'>
        <h3>Groups List</h3>
        <Button onClick={handleOpen} variant="contained">Create Group</Button>

      {groupList.map(item=>(
        <div className='list'>
        <img src={gimg}/>
        <h4>{item.groupname}</h4>
        <Button onClick={()=>handleGroupJoin(item)} variant="contained">Join</Button>
        </div>
      ))}
        
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           <TextField onChange={(e)=>setGname(e.target.value)}  id="outlined-basic" label="Group Name" variant="outlined" />
           <br/>
           <br/>
           <TextField onChange={(e)=>setGtag(e.target.value)} id="outlined-basic" label="Group Tag" variant="outlined" />
           <br/>
           <br/>
           <Button onClick={handleCreateGroup} variant="contained">Create</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Grouplist