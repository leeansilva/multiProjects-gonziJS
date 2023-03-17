
import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UseDataContext } from '../../../context/dataContext';

import './style.css'

const IMAGES = [
    "https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/c-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/chrome-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/git-plain.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/python-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/react-original-wordmark.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/sass-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/ruby-plain-wordmark.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor",
    "https://icongr.am/devicon/java-original.svg?size=128&color=currentColor"
].flatMap((image)=> [`a|${image}`,`b|${image}`])
.sort(()=> Math.random() - 0.5);

const Memotest = () => {

    
    const [guessed, setGessed] = useState([]);
    const [selected, setSelected] = useState([]);
    const [winner, setWinner] = useState(false);
    const { user,editUSER,USERS,pointsMemo,setPointsMemo, isLoading } = UseDataContext()

    //Solucion al primer logeo y error de pointsMemo undefined.
    useEffect(() => {
        pointsMemo === undefined && setPointsMemo(0)
        console.log('Memotest undefined entonces(Memo component):',pointsMemo);
      }, [pointsMemo])

    //Escuchamos a selected:
    useEffect(() => {
    if(selected.length == 2) {
        if (selected[0].split("|")[1] == selected[1].split("|")[1]) { // si el primer seleccionado es igual al segundo, lo seteamos en guesse
            setGessed((guesse) => guesse.concat(selected))
        }
        //sino, seteamos selected vacio despues de 2 segundos.
        setTimeout(() => {
           setSelected([]) 
        }, 1000);
    }
    }, [selected])

    //Escuchamos a guessed

    useEffect(()=>{
        if (guessed.length === IMAGES.length){
            
            setPointsMemo(pointsMemo + 500);
            setWinner(true)
            //play again?
        }
    },[guessed])

    useEffect(() => {
        if(user?.displayName && !isLoading && winner){
            editUSER(user.metadata.createdAt, pointsMemo, 'Memotest')
            }
    }, [winner])

    const handleClick = ()=>{
        window.location.reload()
       
    }
    
    
    

    return (
        <div className="gameMEMOTEST__container">
          {!winner ? (
            <>
              <div className="pointsMemotest__container">
                <h1>
                  Points: <span className="pointsmemo">{pointsMemo}</span>
                </h1>
              </div>
              <div className="memotest_container">
                <Grid
                  container
                  spacing={1}
                  sx={{ width: "80%", height: "50%", margin: "45px 80px" }}
                >
                  {IMAGES.map((image, index) => {
                    const [, url] = image.split("|");
                    return (
                      <Grid
                        item={true}
                        xs={4}
                        sm={2}
                        xl={2}
                        className="item"
                        key={image}
                        onClick={() =>
                          selected.length < 2 && 
                          setSelected((selected) => selected.concat(image))
                        }
                      >
                        {selected.includes(image) || guessed.includes(image) ? (
                          <img alt="icon" src={url} />
                        ) : (
                          <img src="https://icongr.am/fontawesome/question-circle-o.svg?size=128&color=currentColor" />
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </>
          ) : (
            <div className='buttonMEMOTEST'>
                <Button className='buttonMEMOTEST' variant='contained'  color='success' onClick={   handleClick }>Play Again?</Button>
            </div>
          )}
        </div>
      );
}      

export default Memotest