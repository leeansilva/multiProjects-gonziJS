import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './style.css'

const games =[{
    title:'Memotest',
    description:'Classic game of guessing tiles, in this case logos of programming languages.',
    link:'',
    image:'',
}]

const Games = () => {
    return (
        <Card sx={{ maxWidth: 240, backgroundColor: 'rgb(17, 17, 17)', color:'aliceblue',margin:'20px',
        '&:hover': {
          backgroundColor: 'black',
          opacity: '80%',
          padding:'15px',
          transition: '0.3s'
        }}} className='card'>
            <CardMedia 
                component="img"
                alt="memotest"
                height="120"
                image="https://cdn-icons-png.flaticon.com/512/2598/2598691.png"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Memotest
            </Typography>
            <Typography variant="body2" color="aliceblue">
                    Classic game of guessing tiles, in this case logos of programming languages.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" sx={{backgroundColor:'green',color:'aliceblue'}}>Play</Button>
            <Button size="small">Share</Button>
          </CardActions>
        </Card>
      );
}

export default Games