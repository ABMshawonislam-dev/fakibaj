import React,{useEffect,useState} from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";
import { useDispatch,useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { activeChat } from '../slices/activeChatSlice';

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


const Mygroup = () => {
  const db = getDatabase();
  const [open, setOpen] = React.useState(false);
  const [gname,setGname]= useState("")
  const [grlist,setGrlist] = useState([])
  let dispatch = useDispatch()
  const handleOpen = (item) => {
    setGname(item.groupname)
  
    const groupRef = ref(db, 'grouprequest');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(gitem=>{
        if(data.uid == gitem.val().adminid && item.gid == gitem.val().gid){
          arr.push(gitem.val())
        }
      })
     setGrlist(arr)
    });
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
   let [groupList,setGroupList] = useState([])
 let data = useSelector(state=> state.logedUser.value)
    useEffect(()=>{
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if(item.val().adminid == data.uid){

          arr.push({...item.val(),gid:item.key})
        }
      })
      setGroupList(arr)
    });
  },[])

  let handleActiveChat = (item)=>{
    
   
      dispatch(activeChat({
        type: "group",
        activechatid: item.gid,
        activechatname: item.groupname
      }))
  
  

  }


  return (
    <div className='box'>
    <h3>My Group</h3>
    {groupList.map(item=>(
      <div className='list' onClick={()=>handleActiveChat(item)}>
    <img src={gimg}/>
    <h4>{item.groupname}</h4>
    <Button variant="contained" onClick={()=>handleOpen(item)}>RL</Button>
    <Button variant="contained">ML</Button>
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
            These People Wants to Join {gname} Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {grlist.map(item=>(
             <>
               <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={item.whosendname}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.whosendname}
                  </Typography>
                  {` Wants to Join ${gname} Group`}
                  <Button variant="contained">Accept</Button>
                  <Button variant="contained" color='error'>Delete</Button>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
             </>
            ))}
          
          
        </List>
          </Typography>
        </Box>
      </Modal>
</div>
  )
}

export default Mygroup