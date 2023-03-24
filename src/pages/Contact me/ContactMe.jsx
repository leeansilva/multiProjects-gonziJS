import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button, TextField } from '@mui/material';
import './style.css'
import EmailIcon from '@mui/icons-material/Email';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ContactMe = () => {
  const form = useRef();

  const [isSent, setIsSent] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [open, setOpen] = React.useState(false);

  const VITE_EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const VITE_EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(VITE_EMAILJS_SERVICE_ID, 'template_coloozq', form.current, VITE_EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setIsSent(true);
        setNameValue('');
        setEmailValue('');
        setMessageValue('');
        setOpen(true);
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
 
    <div className='contactUs__container'>
      {isSent && 
      (
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Message sent!
        </Alert>
        </Snackbar>
      )
      }
      <EmailIcon style={{ marginTop: '10px', fontSize: '50px', color: 'rgb(76, 76, 76)' }} />
      <h2 className='writeMe' style={{ marginTop: '10px' }}>Write me, I would love to hear your opinions!</h2>
      <form className='form__container' ref={form} onSubmit={sendEmail}>
        <TextField sx={{ backgroundColor: 'rgb(76, 76, 76)' }} required name='user_name' id="name" label="Name" variant="filled" value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
        <TextField sx={{ backgroundColor: 'rgb(76, 76, 76)' }} required type='email' name='user_email' id="outlined-basic" label="Email" variant="filled" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
        <TextField sx={{ backgroundColor: 'rgb(76, 76, 76)' }} required name='message' id="outlined-basic" label="Message" variant="filled" value={messageValue} onChange={(e) => setMessageValue(e.target.value)} />
        <Button type='submit' value='Send' sx={{ width: '100px', margin: '0 auto', backgroundColor: 'light-blue', color: 'aliceblue' }} variant="outlined">SEND</Button>
      </form>

    <div className='info__us'>
        <hr></hr>
          <h4>Company information</h4>
          <h5>JustPlay is a limited liability company under Swiss law. Its registered office is at Ketelmakerij 20, 3010 Moreno-Lo, Bahamas. You can find more information about JustPlay in the section below, there are my social networks :).</h5>
        <hr></hr>  
          <h4>Actual project info:</h4>
          <h5>This project is conceived and designed by me, <a target='_blank' href='https://www.linkedin.com/in/leandrosilva-/'>Leandro Silva</a>. It is made with React.js, it uses Material UI, Google API, emailJS, the games some were created with chatGPT and others were created by <a target='_blank' href='https://www.linkedin.com/in/gonzalopozzo/'>GONCYJS</a>. </h5>
    </div>
   
   </div>
  );
}

export default ContactMe