import { Stack } from '@mui/system'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { games } from '../../data/games';
import { UseDataContext } from '../../context/dataContext';
import './style.css'



const Rankings = () => {
  const { USERS } = UseDataContext();
  //copy users of LOCALSTORAGE.
  const users = [...USERS]
  //dashboard
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  //games
  const [gameSelected, setGameSelected] = React.useState('All');
  
  const sortedUsers = users.sort((a, b) => {
    const totalPointsA = Object.values(a.points).reduce((total, points) => total + points, 0);
    const totalPointsB = Object.values(b.points).reduce((total, points) => total + points, 0);
    return totalPointsB - totalPointsA;
  });

  //Ordenamos la lista dependiendo que juego se clikee
  users.sort((x, y)=>  y.points[gameSelected] - x.points[gameSelected]);

//dashboard events
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //order copy
  

  return (
    <div className='RANKING_PAGE'>

      <Stack className='Ranking_container' spacing={1}>
        <div className='top__container'>
          <div style={{display:'flex'}}>
            <h1 style={{margin: '0 auto',fontFamily: "'Press Start 2P', cursive"}}> Top 20 </h1>
            <div className='menuRanking__container'>
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
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }} 
              >
               
               {
                games.map((game) => (
                  game.status === 'play' && (
                    <div key={game.title}>
                      <MenuItem onClick={()=>{handleClose, setGameSelected(game.title)}}>{game.title}</MenuItem>
                    </div>
                  )
                ))
              }
               <MenuItem onClick={()=>{handleClose, setGameSelected('All')}}>All</MenuItem>
               
              </Menu>
            </div>
          </div>
        </div>
    
        <div className="ranking_row">
          <h4 className='ranking_img'>PH</h4>
          <h4 className='ranking__num'>RANK</h4>
          <h4 className='ranking__name'>NAME</h4>
          <h4 className='ranking__points'>SCORE</h4>
          <h4 className='ranking__country'>COUNTRY</h4>
        </div>

      {
        gameSelected !== 'All' ? 
        users.map((user,index)=>{

          return (
            <div className="ranking_row generated " key={index}>
              <img className={`ranking_img ${index}` } id={`id${index}`} src={user.image}></img>
              <h4 className={`ranking__num ${index}`} id={`id${index}`} >{index + 1}</h4>
              <h4 className={`ranking__name ${index}`} id={`id${index}`} >{user.nickName}</h4>
              <h4 className={`ranking__points ${index}`} id={`id${index}`}>     
                  {user.points[gameSelected]}
              </h4>
              <h4 className={`ranking__country ${index}`} id={`id${index}`}>{user.country}</h4>
            </div>
          )
        })
        :
        sortedUsers.map((user,index)=>{

         let totalPoints = Object.values(user.points).reduce((total, points) => total + points, 0)

          return(
            <div className="ranking_row generated " key={index}>
              <img className={`ranking_img ${index}` } id={`id${index}`} src={user.image}></img>
              <h4 className={`ranking__num ${index}`} id={`id${index}`} >{index + 1}</h4>
              <h4 className={`ranking__name ${index}`} id={`id${index}`} >{user.nickName}</h4>
              <h4 className={`ranking__points ${index}`} id={`id${index}`}>     
                  { totalPoints }
              </h4>
              <h4 className={`ranking__country ${index}`} id={`id${index}`}>{user.country}</h4>
            </div>
          )
        })
      }
      
      </Stack>

    </div>
  )
}

export default Rankings