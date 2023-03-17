import React, { useEffect, useState } from 'react'
import { games } from '../../data/games';
import './style.css'
import 'animate.css';
import Avatar from '@mui/material/Avatar';
import GoogleLog from '../../components/login/Google/GoogleLog';
import { UseDataContext } from '../../context/dataContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Snackbar, Menu, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/users';
//npm run dev -- --host

const Home = () => {
  
  const [posi,setPosi] = useState(0);
  const [country, setCountry] = useState('');
  const [open,setOpen] = useState(false)
  const [playGame,setPlayGame] = React.useState('');
  const [gameSelected, setGameSelected] = React.useState('All');
  //dashboard
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opened = Boolean(anchorEl);
  const navigate = useNavigate();
  const [totalPoints,setTotalPoints] = React.useState(0)

  const { user,points, likeGames,USERS,LOGOut, pointsWPM } = UseDataContext();
 //copy users of LOCALSTORAGE.
 const users = [...USERS]

  //position de ranking con numeros totales.
  const sortedUsers = USERS.sort((a, b) => {
    const totalPointsA = Object.values(a.points).reduce((total, points) => total + points, 0);
    const totalPointsB = Object.values(b.points).reduce((total, points) => total + points, 0);
    return totalPointsB - totalPointsA;
  });

  //Ordenamos la lista dependiendo que juego se clikee
  users.sort((x, y)=>  y.points[gameSelected] - x.points[gameSelected]);  
  

  //alert de usuario logeado.
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={7} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    LOGOut === false && setOpen(true);
    LOGOut === true && open === true && setOpen(false)
  }, [LOGOut])
  
 //apenas se renderiza el componente seteamos la posi respectiva al usuario
 useEffect(() => {
   
  USERS.map((e)=>{
  if(e.nickName === user?.displayName){
    findPos(user.metadata.createdAt)
  }
  else return
  },[points])

},[user,gameSelected,pointsWPM])

  //Funcion para detectar posicion y setearla.
  const findPos =(id) =>{
   if(gameSelected !== 'All'){
    let posi = users.findIndex(user => user.id === id)
    users.map((e) =>{
      e.id === id && setCountry(e.country)
      e.id === id && setTotalPoints(e.points[gameSelected])
    })
    setPosi(posi);
   }
   else {
    let posi = sortedUsers.findIndex(user => user.id === id)
    setPosi(posi)
    users.map((e) =>{
      e.id === id && setCountry(e.country)  
    })
    sortedUsers.forEach((CurrentUser) => {
      if (CurrentUser.nickName === user.displayName) {
        let totalPoints = Object.values(CurrentUser.points).reduce((total, points) => total + points, 0);
        setTotalPoints(totalPoints);
      }
    });
   }
  }

 

  //para boton play
  React.useEffect(() => {
    navigate(playGame)
  }, [playGame])

  //dashboard events
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
    {
    !user?.displayName &&
        <div className={user?.displayName ? 'animate__animated animate__backOutLeft container_title'  : 'container_title'}>
          <h1 className='animate__animated animate__bounce text'>
              JUST PLAY.
          </h1>
          <GoogleLog/>
        </div>
    }

    {
    user?.reloadUserInfo?.photoUrl && 
    <div className='animate__animated animate__fadeIn container_user'>
      <div className='container_user__info'>
        <Avatar 
          alt='profile__image' 
          src={user.reloadUserInfo.photoUrl}
          sx={{ width: 100, height: 80 }}
          className="profile_image" 
        />
        <div>
         <div className='name_container'>
              <h1 className='text__user'>{user.displayName}</h1>
              <div style={{display: 'flex'}}>
                <LocationOnIcon/>
                <h4 className='text__user'>{country}</h4>
            </div>
          </div>
        </div>
        
        <GoogleLog />

      </div>

      {/* END AVATAR NAME LOGout */}

      {/* Position info start */}

      <div className='position__conteiner'>
          <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{color:'yellow'}}
                  >
                    {gameSelected}
                    <ArrowDropDownIcon/>
          </Button>
          <Menu
                    className='menu__ranking'
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={opened}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }} 
            >         
                  {
                    games.map((game) => (
                      game.status === 'play' && (
                        <div key={game.title}>
                          <MenuItem onClick={()=>{handleCloseMenu, setGameSelected(game.title)}}>{game.title}</MenuItem>
                        </div>
                      )
                    ))
                  }
                  <MenuItem onClick={()=>{handleCloseMenu, setGameSelected('All')}}>All</MenuItem>
                  
          </Menu>
              
                  <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                      <h2 className='container_user__pos'>Positon: </h2>
                      <h2 className='span'>{ posi +1 }</h2>
                  </div>
                  <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                      <h2 className='container_user__pos'>Score: </h2>
                      <h2 className='span'> { totalPoints}</h2>
                  </div>
        </div>

        {/* Position info END */}

        {/* STATS INFO */}

      <div className='aside__user' >
        <div className='container_user__stats'>
            <div className='gamePlayed'>
              <h2>Stats:</h2>
              <div style={{display:'flex',width:'130px', justifyContent:'space-around'}}>
                <VideogameAssetIcon/>
                <h4>  Time played:</h4>
              </div>

              <div style={{display:'flex',width:'180px', justifyContent:'space-around'}}>
                <CalendarMonthIcon/>
                <h4>Since: {user?.metadata?.creationTime.slice(4,17)}</h4>
              </div>

              <div style={{display:'flex',width:'165px', justifyContent:'space-around'}}>
                <FavoriteIcon/>
                <h4>Games you liked:{likeGames.length}</h4>
              </div>
            </div>
        </div>

        {/* STATS INFO END */}

        {/* LIKEGAMES */}

        {
        likeGames.length === 0 ? (
          <div style={{display:'flex', flexDirection:'column'}} className='likedGames__container'>
            <FavoriteBorderIcon/>
            <h2 className='likedGames__container'>The games you like will appear here.</h2>
            <h4 className='likedGames__container h4'>Play some games and if you like them, give it a like!</h4>
          </div>
          ) : (
          likeGames.map((title) => {
            const gamesLiked = [games.find(game => game.title === title)]
    
            return (
              <Card key={gamesLiked[0].title} id={gamesLiked[0].title} sx={{ display : 'flex',flexDirection: 'column',justifyContent:'space-evenly',width: '150px', height: '240px', backgroundColor: 'rgb(17, 17, 17)', color:'aliceblue',margin:'9px',
              '&:hover': {
                backgroundColor: 'black',
                opacity: '80%',
                transition: '0.3s'
              }}} className='card'>
                <CardMedia 
                    component="img"
                    alt={gamesLiked[0].title}
                    height="120"
                    image={gamesLiked[0].image}
                    sx={{'&:hover':{padding:'10px', transition:'0.3s'},width:'120px',height:'100px'}}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                      {gamesLiked[0].title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=>{ setPlayGame(gamesLiked[0].link) }} sx={{backgroundColor:'green',color:'aliceblue'}} >Play</Button>
                </CardActions>
              </Card>
            );
          })
        )}
       {/* LIKEGAMES end */}
      </div>


      {/* ALERT GREEN */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Hi {user.displayName}
        </Alert>
      </Snackbar>

      {/* ALERT GREEN END*/}

    </div>
                
      }
    </>
  )
}

export default Home