import React, { useState } from 'react'
import './style.css'
import 'animate.css';
import GoogleLog from '../../components/login/Google/GoogleLog';
import { UseDataContext } from '../../context/dataContext';

//npm run dev -- --host

const Home = () => {
  const { user, isLoading} = UseDataContext();

  return (
    <>
    {
        !isLoading && !user?.displayName ? 
        <div className={user?.displayName ? ' container_title animate__animated animate__backOutDown'   : 'container_title'}>
          <h1 className='animate__animated animate__bounce text'>
              JUST PLAY.
          </h1>
          <GoogleLog/>
        </div>
        :
        <div className={user?.displayName ? ' container_title animate__animated animate__bounceInDown'   : 'container_title'}>
          <h1 className='animate__animated animate__bounce text'>
              Welcome {user.displayName}
          </h1>
          <GoogleLog/>
        </div>
    }
    </>
  )
}

export default Home