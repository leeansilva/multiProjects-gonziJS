import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './style.css'
import { useNavigate } from 'react-router-dom';
import MostPlayed from '../../components/games/MostPlayed/MostPlayed';


const games =[
    {
      title:'Memotest',
      description:'Classic game of guessing tiles.',
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
      link:'/games/wpm/',
      image:'https://1000marcas.net/wp-content/uploads/2020/11/Mortal-Kombat-logo.png',
    },
    {
      title:'Pacman',
      description:'Is Pacman dude, play it!',
      link:'/games/wpm/',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh0LDtqmI-4w9G--0PPrfcx80KneQhvtPZog&usqp=CAU',
    },
]

const Games = () => {
  const [playGame,setPlayGame] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    navigate(playGame)
  }, [playGame])

  return(
    <>
        <div className='container_card'>
          
            { games.map((game,index)=>(
              <Card key={index} id={game.title} sx={{ display : 'flex',flexDirection: 'column',justifyContent:'space-evenly',maxWidth: 240, backgroundColor: 'rgb(17, 17, 17)', color:'aliceblue',margin:'20px',
              '&:hover': {
                backgroundColor: 'black',
                opacity: '80%',
                transition: '0.3s'
              }}} className='card'>

                <CardMedia 
                    component="img"
                    alt={game.title}
                    height="120"
                    image={game.image}
                    sx={{'&:hover':{padding:'10px', transition:'0.3s'}}}
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                      {game.title}
                  </Typography>
                  <Typography variant="body2" color="aliceblue">
                      {game.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button size="small" sx={{backgroundColor:'green',color:'aliceblue'}} onClick={()=>{ setPlayGame(game.link) }}>Play</Button>
                  <Button size="small">Share</Button>
                </CardActions>

              </Card>
            ))}

      </div>
          <MostPlayed />
          </>
  )
      
}

export default Games