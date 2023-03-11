import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button, TextField } from '@mui/material';
import './style.css'
import EmailIcon from '@mui/icons-material/Email';

const ContactMe = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_p1ngp89', 'template_coloozq', form.current, 'UiXYn0hLL3HAEmkGC')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
   <div className='contactUs__container'>
     <EmailIcon style={{marginTop:'10px',fontSize:'50px',color:'rgb(76, 76, 76)'}}/>
     <h2 style={{marginTop:'10px'}}>Write me, I would love to hear your opinions!</h2>
     <form className='form__container' ref={form} onSubmit={sendEmail}>
        <TextField sx={{backgroundColor:'rgb(76, 76, 76)'}} required name='user_name' id="name" label="Name" variant="filled" />
        <TextField sx={{backgroundColor:'rgb(76, 76, 76)'}} required type='email' name='user_email' id="outlined-basic" label="Email" variant="filled" />
        <TextField sx={{backgroundColor:'rgb(76, 76, 76)'}} required name='message' id="outlined-basic" label="Message" variant="filled" />
      <Button type='submit' value='Send' sx={{width:'100px',margin:'0 auto',backgroundColor:'light-blue',color:'aliceblue'}} variant="outlined">SEND</Button>
    </form>

    <hr></hr>

    <div className='info__us'>
      <h4>Company information</h4>
      <h5>JustPlay is a limited liability company under Swiss law. Its registered office is at Ketelmakerij 20, 3010 Moreno-Lo, Bahamas. You can find more information about JustPlay in the section below, there are my social networks :).</h5>

      <h4>Actual project info:</h4>
      <h5>This project is conceived and designed by me, <a target='_blank' href='https://www.linkedin.com/in/leandrosilva-/'>Leandro Silva</a>. It is made with React.js, it uses Material UI, Google API, emailJS, the games some were created with chatGPT and others were created by <a target='_blank' href='https://www.linkedin.com/in/gonzalopozzo/'>GONCYJS</a>. </h5>
    </div>

    <hr></hr>
   </div>
  );
}

export default ContactMe