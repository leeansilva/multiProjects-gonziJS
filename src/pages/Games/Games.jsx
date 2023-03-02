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
import { games } from '../../data/games'

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
              <Card key={index} id={game.title} sx={{ display : 'flex',flexDirection: 'column',justifyContent:'space-evenly',maxWidth: 230, height: '340px', backgroundColor: 'rgb(17, 17, 17)', color:'aliceblue',margin:'9px',
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