import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import './Slider.css'
import 'animate.css';


const mostPlayedGames =[
  {
    title:'Memotest',
    description:'Classic game of guessing tiles, in this case logos of programming languages.',
    link:'/games/memotest/',
    image:'https://cdn-icons-png.flaticon.com/512/2598/2598691.png',
  },
  {
    title:'WPM',
    description:'How many words per minute can you type? Find it out.',
    link:'/games/wpm/',
    image:'https://play-lh.googleusercontent.com/uE-rLPFKIsgq4LWhHBOtkvHimgP8v-nKuqMsEZ4QRr4KZLUkJdJpXi5zx09s1YnsHw=w240-h480-rw',
  },
  {
    title:'Mortal Kombat 1',
    description:'Classic game MK1, fight!',
    link:'/games/mk1/',
    image:'https://1000marcas.net/wp-content/uploads/2020/11/Mortal-Kombat-logo.png',
  },
]

const Slider = () => {
  const [imageA,setImageA] = useState(0);
  const [arrow,setArrow] = useState(false)

  const length = mostPlayedGames?.length;

  //if (!Array.isArray(imagesCarousel) || length === 0){return;}
  

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
        
        { mostPlayedGames.map((game,index)=>{
            return (
              <div key={index} className='carousel__imageContainer'>
                {imageA === index && (
                  <Card id={game.title} sx={{ boxShadow: '4px 8px 22px -3px rgba(255, 254, 254, 0.59)',display: 'flex', flexDirection:'column',maxWidth: 240, backgroundColor: 'rgb(5, 5, 5)', color:'aliceblue',margin:'20px',
                  '&:hover': {
                    backgroundColor: '#242424',
                    opacity: '80%',
                    transition: '0.3s',
                    cursor: 'pointer'
                  }}} className={
                    arrow === false ?
                    'carousel_container animate__animated animate__fadeInDown' : 'carousel_container animate__animated animate__slideInRight'
                  }>
                    <CardMedia 
                    className='slide__img'
                    component="img"
                    alt={game.title}
                    image={game.image}
                    />
                    <CardActions>
                        <Button size="small" sx={{backgroundColor:'green',color:'aliceblue'}} onClick={()=>{ setPlayGame(game.link) }}>GO!</Button>
                    </CardActions>
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

export default Slider