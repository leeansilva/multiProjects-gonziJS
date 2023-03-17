import { Button ,TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { UseDataContext } from '../../../context/dataContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import './style.css'

const words = [
  "love", "covid", "2021", "life", "happy", "vaccine", "music", "new", "today", "work", "pandemic", "people", "time", "world", "good", "day", "like", "thankful", "health", "friends", "fun", "positive", "smile", "beautiful", "family", "goals", "summer", "friendship", "nature", "travel", "selfcare", "art", "faith", "blessed", "challenge", "instagood", "photooftheday", "fashion", "food", "weekend", "inspiration", "motivation", "fitness", "quote", "sun", "dog", "photography", "book", "movies"
]

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WordsPerMinute = () => {

  const [word, setWord] = useState(()=> words[(Math.random()* words.length )| 0]);
  const [characterCount, setCharacterCount] = useState(0);
  const [buffer, setBuffer] = useState("");
  const [time, setTime] = useState(0);
 

  const { pointsWPM,setPointsWPM,user,editUSER} = UseDataContext()
  
  const [open, setOpen] = React.useState(false);



  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const localStorageItem: string | null = localStorage.getItem('USERS_V1');
  let parsedItem: any;
  if (localStorageItem !== null) {
    parsedItem = JSON.parse(localStorageItem);
  }


  //Esta es la solucion que encontre al error para el undefined del primer logeo.
  useEffect(() => {
    pointsWPM === undefined && setPointsWPM(0)
    console.log('wpm undefined entonces(wpm component):',pointsWPM);
    
  }, [pointsWPM])
  
  function handleSubbmit(event : React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    if (buffer === word) {
      setWord(words[(Math.random()* words.length )| 0]);
      setCharacterCount((characterCount)=> characterCount + word.length);
      if(user.displayName){
        setPointsWPM(pointsWPM  + 25)
        setOpen(true);
      }
    }
    else if(buffer !== word){
      if(user.displayName){
        setPointsWPM(pointsWPM - 25)
        setOpen(true);
      }
    }
    setBuffer('')
  };

  useEffect(() => {
  if (time !== 0){
    const id = setInterval(()=>{

      setTime((time) => time - 1)

    },1000);

    return () => clearInterval(id);
  }
  }, [time])

  // Seteamos puntos obtenidos en localStorage cuando el time está en 0. 
  useEffect(() => {
    parsedItem.map((e)=>{
      if(e.nickName === user?.displayName && time === 0){
      editUSER(user.metadata.createdAt, pointsWPM,'WPM')
      setCharacterCount(0)
      }
     })

  },[time])

  return (
   <div className='gameWPM__container'>
     <Stack
    direction="column"
    spacing={2}
    alignItems='center'>
      <div className='formWPM__container'>
        <h1>Chacarters typed: <span className='time'>{characterCount}</span></h1>
        <h1>Remaining time: <span className='time'>{time}</span></h1>
        <h1>Points: <span className='time'>{pointsWPM}</span></h1>
      </div>
      {Boolean(time) && <h1>{word}</h1>}
      {time !== 0 ? (
        <form className='tipe_container'  onSubmit={handleSubbmit}>
           <TextField  
              label="TYPE" 
              variant="filled" 
              value={buffer} 
              onChange={(e)=> setBuffer(e.target.value)}
              sx={{ 
                backgroundColor: 'grey', 
                color: 'white' 
              }}
            />
            <Button type='submit' variant="contained">OK</Button>
          </form>
        ) : (
          <Button style={{margin:'auto'}} onClick={()=>setTime(60)} variant="contained">Play</Button>
      )}
    </Stack>

    
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {pointsWPM}
        </Alert>
      </Snackbar>
    
   </div>
  )
}

export default WordsPerMinute