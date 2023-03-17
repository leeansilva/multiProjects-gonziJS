import React, { useState } from 'react'

import './style.css'
import 'animate.css';

import GoogleLog from '../../components/login/Google/GoogleLog';
import { UseDataContext } from '../../context/dataContext';

import { useNavigate } from 'react-router-dom';

//npm run dev -- --host

const Home = () => {

  //dashboard
  const [anchorEl, setAnchorEl] = React.useState(null);


  const { user} = UseDataContext();
  
  return (
    <>
    {
   
        <div className={user?.displayName ? ' container_title'  : 'container_title'}>
          <h1 className='animate__animated animate__bounce text'>
              JUST PLAY.
          </h1>
          <GoogleLog/>
        </div>
}

    
    </>
  )
}

export default Home