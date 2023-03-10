import { Button ,TextField } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { UseDataContext } from '../../../context/dataContext';

const words = [
  "love", "covid", "2021", "life", "happy", "vaccine", "music", "new", "today", "work", "pandemic", "people", "time", "world", "good", "day", "like", "thankful", "health", "friends", "fun", "positive", "smile", "beautiful", "family", "goals", "summer", "friendship", "nature", "travel", "selfcare", "art", "faith", "blessed", "challenge", "instagood", "photooftheday", "fashion", "food", "weekend", "inspiration", "motivation", "fitness", "quote", "sun", "dog", "photography", "book", "movies"
]


const WordsPerMinute = () => {

  const [word, setWord] = useState(()=> words[(Math.random()* words.length )| 0]);
  const [characterCount, setCharacterCount] = useState(0);
  const [buffer, setBuffer] = useState("");
  const [time, setTime] = useState(0);

  const { points, setPoints,user, editUSER } = UseDataContext()
  
  const localStorageItem: string | null = localStorage.getItem('USERS_V1');
  let parsedItem: any;
  if (localStorageItem !== null) {
    parsedItem = JSON.parse(localStorageItem);
  }

  function handleSubbmit(event : React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    if (buffer === word) {
      setWord(words[(Math.random()* words.length )| 0]);
      setCharacterCount((characterCount)=> characterCount + word.length);
      if(user.displayName){
        setPoints(points + 25)
      }
    }
    else if(buffer !== word){
      if(user.displayName){
        setPoints(points - 25)
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

  //Seteamos puntos obtenidos en localStorage cuando el time está en 0. 
  useEffect(() => {
    parsedItem.map((e)=>{
      if(e.nickName === user?.displayName && time === 0){
      editUSER(user.metadata.createdAt, points)
      }
     })

  },[time])

  return (
    <Stack
    direction="column"
    spacing={2}
    alignItems='center'>
      <h2>Chacarters typed: {characterCount}</h2>
      <h3>Remaining time: {time}</h3>
      {Boolean(time) && <h1>{word}</h1>}
      {time !== 0 ? (
        <form onSubmit={handleSubbmit}>
           <TextField id="filled-basic" label="Filled" variant="filled" 
              value={buffer} onChange={(e)=> setBuffer(e.target.value)}
            />
            <Button type='submit' variant="contained">Submit</Button>
          </form>
        ) : (
          <Button style={{margin:'auto'}} onClick={()=>setTime(60)} variant="contained">Play</Button>
      )}
    </Stack>
  )
}

export default WordsPerMinute