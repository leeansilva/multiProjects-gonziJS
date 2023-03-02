import { Stack } from '@mui/system'
import React from 'react'
import './style.css'
import { users } from '../../data/users/'

const Rankings = () => {
  return (
    <>

      <Stack spacing={1}>
        <h1 style={{margin: '0 auto'}}>Top 20</h1>
        
        <div className="ranking_row">
          <h4 className='ranking_img'>AVA</h4>
          <h4 className='ranking__num'>N°</h4>
          <h4 className='ranking__name'>USER</h4>
          <h4 className='ranking__points'>POINTS</h4>
          <h4 className='ranking__country'>COUNTRY</h4>
        </div>

      {users.map((user,index)=>{
        return (
          <div className="ranking_row generated" key={index}>
          <img className='ranking_img' src={user.image}></img>
          <h4 className='ranking__num'>{index + 1}</h4>
          <h4 className='ranking__name'>{user.nickName}</h4>
          <h4 className='ranking__points'>{user.points}</h4>
          <h4 className='ranking__country'>{user.country}</h4>
        </div>
        )
      })}

      </Stack>

    </>
  )
}

export default Rankings