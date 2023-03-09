import React from 'react'
import { UseDataContext } from '../../../context/dataContext'
import './style.css'

const Score = ({ children }) => {
    const { points, setPoints} = UseDataContext()

    console.log(points);

  return (
    <div className='Score_container'>
        <h1>Score</h1>
        <h2>{ points }</h2>
        { children }
    </div>
  )
}

export {Score}