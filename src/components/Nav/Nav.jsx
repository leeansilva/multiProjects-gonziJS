import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { UseDataContext } from '../../context/dataContext';



function ResponsiveAppBar() {
  
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate()
  
  const data = UseDataContext();

  const pages =  data?.user?.displayName ? ['GAMES', 'RANKINGS', 'CONTACT ME','PROFILE'] : ['GAMES', 'RANKINGS', 'CONTACT ME'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    const current = e.target.id
    if (current === pages[0]){
        navigate('/games')
    } else if(current === pages[1]){
        navigate('/rankings')
    } else if(current === pages[2]){
        navigate('/contact')
    } else if(current === pages[3]){
      navigate('/profile')
  }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className='container'>
        <Toolbar disableGutters>
          
          <div className='imgNAV' onClick={()=>{navigate('/')}}>
            <img alt='logo' src='https://icon-library.com/images/joystick-icon-png/joystick-icon-png-16.jpg'/>
          </div>
         
          {/* BOX SMALL SCREEN START */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} className="navxs">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            <MenuIcon />

            </IconButton>
            
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}

                // para navegar entre las paginas smallscreen:
                onClose={handleCloseNavMenu}
                onClick={ (e)=>{const name = e.target.textContent; navigate(name.toLowerCase() === 'contact me' ? 'contact' : name.toLowerCase())} }
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography  textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
          </Box>
          
          
          <Box sx={{ flexGrow: 1, padding:'0', display: { xs: 'none', md: 'flex' }, }} className="navmd">
            {pages.map((page) => (
              <Button
                key={page}
                id={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'flex', '&:hover': {
                  backgroundColor: 'black',
                  transition: '0.3s'
                }, margin:'0 20px', padding:'20px', width:'100%', borderRadius:'0' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;