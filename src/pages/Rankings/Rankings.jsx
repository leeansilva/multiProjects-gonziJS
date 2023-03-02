import { Stack } from '@mui/system'
import React from 'react'
import './style.css'
import { users } from '../../data/users/'


users.sort((x, y)=>  y.points - x.points);

const Rankings = () => {
  return (
    <>

      <Stack spacing={1}>
        <h1 style={{margin: '0 auto',fontFamily: "'Press Start 2P', cursive"}}>Top 20</h1>
        
        <div className="ranking_row">
          <h4 className='ranking_img'>PH</h4>
          <h4 className='ranking__num'>RANK</h4>
          <h4 className='ranking__name'>NAME</h4>
          <h4 className='ranking__points'>SCORE</h4>
          <h4 className='ranking__country'>COUNTRY</h4>
        </div>

      {users.map((user,index)=>{
        return (
          <div className="ranking_row generated " key={index}>
          <img className={`ranking_img ${index}` } id={`id${index}`} src={user.image}></img>
          <h4 className={`ranking__num ${index}`} id={`id${index}`} >{index + 1}</h4>
          <h4 className={`ranking__name ${index}`} id={`id${index}`} >{user.nickName}</h4>
          <h4 className={`ranking__points ${index}`} id={`id${index}`}>{user.points}</h4>
          <h4 className={`ranking__country ${index}`} id={`id${index}`}>{user.country}</h4>
        </div>
        )
      })}

      </Stack>

    </>
  )
}

export default Rankings