import React, { useEffect, useState } from 'react'
import './style.css'
import 'animate.css';
import Avatar from '@mui/material/Avatar';
import GoogleLog from '../../components/login/Google/GoogleLog';
import { UseDataContext } from '../../context/dataContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { games } from '../../data/games';

//npm run dev -- --host

const Home = () => {
  
  const [posi,setPosi] = useState(0);
  const [country, setCountry] = useState('');
  const [emptyLikes, setEmptyLikes] = useState(false);
  const [loading, setLoading] = useState(true)
  
  
  const { user,points,position } = UseDataContext();
  const localStorageItem = localStorage.getItem('USERS_V1');
  let parsedItem = JSON.parse(localStorageItem);

  const findPos =(id) =>{
    let posi = position.findIndex(user => user.id === id)
    position.map((e) =>{
      e.id === id && setCountry(e.country)
    })
    setPosi(posi)
  }

 
  //apenas se renderiza el componente seteamos la posi respectiva al usuario
  useEffect(() => {
   
    parsedItem.map((e)=>{
    if(e.nickName === user?.displayName){
      findPos(e.id)
    }
    else return
    },[])
      
    games.map((game)=>{
    game.like === false ? setEmptyLikes(true) : setEmptyLikes(false)
    })

  },[])
  
  
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

      <div className='position__conteiner'>
        <h2 className='container_user__pos'>Positon:    { posi + 1 }</h2>
        <h2 className='container_user__pos'>Score:    { points} </h2>
      </div>

    <div className='aside__user'>
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
              <h4>Games you liked:</h4>
            </div>
          </div>
      </div>
        {
        emptyLikes === false ? 
        games.map((game) =>(
          game.like === true  && 
          <div className='likedGames__container'>hola</div>
          )
        )
        :
        <div style={{display:'flex', flexDirection:'column', }} className='likedGames__container'>
          <h2 className='likedGames__container'> Here will appear the games you like.</h2>
          <h4 className='likedGames__container'> Play some games and if you like them, gives them a thumb up!</h4>
        </div>
        }
      </div>

    </div>
                
      }
    </>
  )
}

export default Home