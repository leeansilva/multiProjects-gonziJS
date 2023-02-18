import { Button, TextField } from '@mui/material';
import React from 'react'
const POKEMON = [
  "pikachu","charmander","squirtle","bulbasaur","mewtwo","mew","eevee","jigglypuff","snorlax","gyarados","dragonite","arcanine","gengar","vaporeon","flareon","jolteon","articuno","zapdos","moltres","golem","onix","magikarp","gastly","haunter","kadabra","abra","alakazam","rattata","raticate","clefairy","clefable","ninetales","vulpix","ponyta","rapidash","kangaskhan","mr. mime","tauros","ditto","pidgey","pidgeotto","pidgeot","spearow","fearow","bellsprout","weepinbell","victreebel","geodude","graveler","goldeen"
]

const MATCH = Math.random() * POKEMON.length;

const Pokemon = () => {


  function handleSubbmit (event : React.FormEvent<HTMLFormElement>){
    event.preventDefault();}

  return (
    <>
        <form onSubmit={handleSubbmit}>
           <TextField id="filled-basic" label="Filled" variant="filled" 
              value={''}
            />
            <Button type='submit' variant="contained">Submit</Button>
        </form>
    
    </>
  )
}

export default Pokemon