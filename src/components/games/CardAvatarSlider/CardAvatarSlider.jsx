import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import './style.css'
import 'animate.css';


const bestPlayers =[
  {
    name:'Lean_10',
    link:'/games/memotest/',
    image:'https://pbs.twimg.com/profile_images/1514781425106489348/ZE-Hkq5c_400x400.jpg',
  },
  {
    name:'Shinnex',
    description:'How many words per minute can you type? Find it out.',
    link:'/games/wpm/',
    image:'https://pbs.twimg.com/profile_images/1498275657461243909/vMp3Ghxg_400x400.png',
  },
  {
    name:'MatRol',
    link:'/games/mk1/',
    image:'https://pbs.twimg.com/profile_images/1230813388667785217/0IeamqxM_400x400.jpg',
  },
]

const CardAvatarSlider = () => {
  const [imageA,setImageA] = useState(0);
  const [arrow,setArrow] = useState(false)

  const length = bestPlayers?.length;

  const nextImage = ()=>{
    setImageA(imageA === length - 1 ? 0 : imageA + 1 );
    setArrow(false)
  }

  const previousImage = () => {
    setImageA(imageA === 0 ? length -1 : imageA - 1);
    setArrow(true)
  }

  return (
    <div className='carousel_container'>
      <div className='c__button c__Buttonleft'>
        <ArrowBackIosIcon onClick={previousImage} />
      </div>
        
        { bestPlayers.map((game,index)=>{
            return (
              <div key={index} className='carousel__imageContainer'>
                {imageA === index && (
                  <Card id={game.name} sx={{ display: 'flex', flexDirection:'column',maxWidth: 240, backgroundColor: 'rgb(17, 17, 17)', color:'aliceblue',margin:'20px',
                  '&:hover': {
                    cursor: 'pointer'
                  }}} className={
                    arrow === false ?
                    'carousel_container animate__animated animate__fadeInDown' : 'carousel_container animate__animated animate__slideInRight'
                  }>
                    <CardMedia 
                    className='slide__img avatarSlider'
                    component="img"
                    alt={game.name}
                    image={game.image}
                    sx={{borderRadius:'50%'}}
                    />
                    <h3>{game.name}</h3>
                  </Card>
                )}
              </div>
            )
          })
        }

        <div className='c__button c__buttonright'>
          <ArrowForwardIosIcon onClick={nextImage} />
        </div>
    </div>
  )
}

export default CardAvatarSlider