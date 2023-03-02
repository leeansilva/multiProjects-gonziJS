import { Button } from '@mui/material'
import React from 'react'
import { GoogleButton } from 'react-google-button'
import { UseDataContext } from '../../../context/dataContext'
import './style.css'

//npm run dev -- --host
const GoogleLog = () => {
  const { googleSignIn, logOut, user } = UseDataContext()

  const handleGoogleSignIng = async () =>{
    try {
      await googleSignIn()
      console.log(user);
    } catch (e){
      console.log(e)
    }
  }

  const handleGoogleLogOut = async () =>{
    try{
      await logOut()
    } catch (e){
      console.log(e);
    }
  }


  return (
    <>
    {
      user?.displayName ? 
      <Button sx={{height: '25px', width: '90px',fontSize: '12px',margin: '10px'}} className='animate__animated animate__bounceInUp' color="error" variant="contained" onClick={ handleGoogleLogOut }>LOG OUT</Button> 
      : 
      <GoogleButton className='google_button animate__animated animate__bounceInUp' type="light" onClick={ handleGoogleSignIng } >GoogleLog</GoogleButton> 
    }

    </>
  )
}

export default GoogleLog