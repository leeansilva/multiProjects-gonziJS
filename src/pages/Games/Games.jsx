import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './style.css'
import { useNavigate } from 'react-router-dom';
import MostPlayed from '../../components/games/MostPlayed/MostPlayed';
import { games } from '../../data/games'
import { UseDataContext } from '../../context/dataContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Games = () => {
  const [playGame,setPlayGame] = React.useState('')
  const {likeGames, setLikeGames, addLikes} = UseDataContext()
  const navigate = useNavigate()


  const handleLike = (e) =>{
    const idGame = e.currentTarget.id

    if(likeGames.includes(idGame)){
      setLikeGames((prevState) => 
      prevState.filter((game)=> game !== idGame)
      );  
    } else {
      setLikeGames((prevState)=> [...prevState, idGame]);
    }
    };

    React.useEffect(() => {
      // carga los datos de localStorage en el estado likeGames
      const games = localStorage.getItem("gamesLiked");
      if (games) {
        setLikeGames(JSON.parse(games));
      }
    }, []);
    
    
    React.useEffect(() => {
      navigate(playGame)
    }, [playGame])
    
    const isLiked = (game) => {
      return Array.isArray(likeGames) && likeGames.includes(game.title)
    }
    React.useEffect(() => {
      addLikes()
    }, [likeGames])


    return (
      <div className="pageGame">
        <div className="gameContainer">
          <div className="container_card">
            {games.map((game, index) => (
              <Card
                key={index}
                id={game.title}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  maxWidth: 230,
                  height: "340px",
                  backgroundColor: "rgb(17, 17, 17)",
                  color: "aliceblue",
                  margin: "9px",
                  "&:hover": {
                    backgroundColor: "black",
                    opacity: "80%",
                    transition: "0.3s",
                  },
                }}
                className="card"
              >
                <CardMedia
                  component="img"
                  alt={game.title}
                  height="120"
                  className='img'
                  image={game.image}
                  sx={{ "&:hover": { padding: "10px", transition: "0.3s" } }}
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
                  <Button
                    size="small"
                    sx={
                      game.status === "play"
                        ? { backgroundColor: "green", color: "aliceblue" }
                        : { backgroundColor: "purple", color: "aliceblue" }
                    }
                    onClick={() => {
                      setPlayGame(game.link);
                    }}
                  >
                    {game.status}
                  </Button>
                  <Button
                    id={game.title}
                    onClick={handleLike}
                    size="small"
                  >
                    {isLiked(game) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
        <div className="mostPlayedContainer">
          <MostPlayed />
        </div>
      </div>
    );
    
}

export default Games
