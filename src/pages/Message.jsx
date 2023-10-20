import React from 'react'
import Grid from '@mui/material/Grid';
import Friends from "../components/Friends"
import Mygroup from "../components/Mygroup"
import Msg from '../components/Msg';

const Message = () => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={3}>
          <Mygroup/>
          <Friends/>
        </Grid>
        <Grid item xs={9}>
        <Msg/>
        </Grid>
    </Grid>
  )
}

export default Message