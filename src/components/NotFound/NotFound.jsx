import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './NotFound.css'
const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className='notFoundPAGE'>
      <section className="notFound">
            <div className="img1">
                <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage" />
                <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly" />
            </div>
            <div className="text1">
                <h1 className='cuatro'>404</h1>
                <h2 className='pageNotFound'>PAGE NOT FOUND</h2>
                <h3 className='BackTo'>BACK TO HOME?</h3>
                <NavLink to={'/'} className="yes">YES</NavLink>
                <a target={'_blank'} href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
                <span  className='createdBy'>Credits: <a target={'_blank'} href='https://codepen.io/honeybadger2788/pen/oNzKzvy' >JSON.girlify  </a></span>
            </div>
      </section>
    </div>
  )
}

export default NotFound