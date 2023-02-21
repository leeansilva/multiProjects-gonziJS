import React from 'react'
import Nav from '../../components/Nav/Nav'

const Layout = ({ children }) => {
  return (
    <>
        <Nav/>
        {children}
    </>
  )
}

export default Layout