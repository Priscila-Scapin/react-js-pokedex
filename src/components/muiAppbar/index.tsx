import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PokemonFilterParamSelector from '../pokemonFilterQuerySelector';
import useAuth from "../../hooks/useAuth";


function ResponsiveAppBar() {
  const navigate = useNavigate()
  const { signOut } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    signOut()
    setAnchorElUser(null);
  };



  return (
    <AppBar position="sticky"  sx={{ backgroundColor: '#DE4A41' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PokemonFilterParamSelector/>         
          <Box 
            sx={{ 
              flexGrow: 1,
              display: 'flex',  
              marginLeft: '3rem',
              alignItems: 'center',
            }} 
          > 
            <StarBorderIcon/> 
            <Box 
              aria-haspopup="true"
              onClick={ () => navigate('/favorites')}
              sx={{ 
                height: "2rem",
                display: "flex",
                cursor: 'pointer',
                padding: "0.2rem",
                marginBottom: "0px",
                alignItems: "center", 
                flexDirection: "row",
                borderRadius: '0.5rem',
                backgroundColor: "#DE4A41", 
              }}
            >
             
              Favorite Pokémon Album
            </Box> 
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <img 
									alt='pokeball' 
									width='50rem' 
									height='50rem' 
									src='pokeball.png' 
          			/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-app-bar"
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
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>             
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
