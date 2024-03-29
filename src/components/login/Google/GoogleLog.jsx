import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GoogleButton } from 'react-google-button'
import { UseDataContext } from '../../../context/dataContext'
import './style.css'

//npm run dev -- --host
const GoogleLog = () => {

  const [logDone,setLogDone] = useState(false);
  const { googleSignIn, logOut, user, addUSER, LOGOut, setLOGOut, USERS,parsedItem } = UseDataContext()
  const lastUser = parsedItem

  const handleGoogleSignIng = async () =>{
    try {
      await googleSignIn()
      } catch (e){
      console.log(e)
    }
  }

  //ADD USER TO LOCALSTORAGE
  useEffect(() => {
    const existingUser = lastUser.find(u => u.nickName === user?.displayName);

    if (!existingUser && user?.displayName && logDone === false ){
      setLogDone(true)
      addUSER(user.metadata.createdAt, user.displayName, user.photoURL,'Argentina')
      console.log('addddddddddd');
    }
    if(LOGOut === true){
      console.log("se feuee");
      setLOGOut(false)
      setLogDone(false)
    }
  }, [user])
  //END LOCALSTORAGE

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
        <GoogleButton className='google_button animate__animated animate__bounceInUp' type="light" 
        onClick={handleGoogleSignIng} 
        >GoogleLog</GoogleButton> 
    }
    </>
  )
}

export default GoogleLog