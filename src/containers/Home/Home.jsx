import React, { useEffect, useState } from 'react'
import './style.css'
import 'animate.css';
import Avatar from '@mui/material/Avatar';
import GoogleLog from '../../components/login/Google/GoogleLog';
import { UseDataContext } from '../../context/dataContext';

//npm run dev -- --host

const Home = () => {
  
  const { user } = UseDataContext()
  
  return (
    <>
    {!user?.displayName &&
        <div className={user?.displayName ? 'animate__animated animate__backOutLeft container_title'  : 'container_title'}>
          <h1 className='animate__animated animate__bounce text'>
              JUST PLAY.
          </h1>
          <GoogleLog/>
        </div>
    }

    {user?.photoURL && 
    <div className='animate__animated animate__fadeIn container_user'>
     <div className='container_user__info'>
        <Avatar 
          alt='profile__image' 
          src={user.photoURL}
          sx={{ width: 100, height: 80 }}
          className="profile_image" 
        />
        <h1 className='text__user'>{user.displayName}</h1>
        <GoogleLog />

     </div>

      <h2 className='container_user__pos'>Positon: 1</h2>
      <h2 className='container_user__pos'>Score: </h2>

     <div className='container_user__stats'>
        <h2>Stats:</h2>
        <div className='gamePlayed'>
          <h3>TitleGame</h3>
          <h4>Time played:</h4>
          <h4>Points:</h4>
        </div>
        <div className='gamePlayed'>
          <h3>TitleGame</h3>
          <h4>Time played:</h4>
          <h4>Points:</h4>
        </div>
     </div>

    </div>
               
    }
    </>
  )
}

export default Home