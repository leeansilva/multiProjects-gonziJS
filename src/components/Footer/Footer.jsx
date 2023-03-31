import React from 'react'
import './style.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
  return (
    <footer >
        <ul className='ul_footer'>
            <li><a target='_blank' href='https://www.instagram.com/leeansilva_/'><InstagramIcon/></a></li>
            <li><a target='_blank' href='https://www.linkedin.com/in/leandrosilva-/'><LinkedInIcon/></a></li>
            <li><a target='_blank' href='https://www.facebook.com/lean.silva.92/'><FacebookIcon/></a></li>
            <li><a target='_blank' href='https://github.com/leeansilva'><GitHubIcon/></a></li>
        </ul>

        <h6>Copyright © All left reserved</h6>

    </footer>
  )
}

export default Footer