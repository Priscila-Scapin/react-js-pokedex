import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from 'react';
import { useRecoilState } from "recoil";
import filterTypeAtom from '../../atoms/filterType'

const PokemonFilterParamSelector = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [_, setFilterType] = useRecoilState(filterTypeAtom);

    const isMenuOpen = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
     
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

  return (   
    <>
    <Box 
      aria-haspopup="true"
      onClick={handleOpenMenu}
      aria-controls={isMenuOpen ? 'basic-menu' : undefined}
      aria-expanded={isMenuOpen ? 'true' : undefined}   
      sx={{ 
        height: "2rem",
        display: "flex",
        cursor: 'pointer',
        padding: "0.2rem",
        marginBottom: "0px",
        alignItems: "center", 
        flexDirection: "row",
        backgroundColor: "#DE4A41", 
      }}
    >
    <IconButton >
      <SearchIcon sx={{ color: "#FFFFFF" }} />
    </IconButton>
    <Box color="#FFFFFF">
      Browse by
    </Box>
    </Box>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      <MenuItem onClick={() => {handleCloseMenu(); setFilterType('type'); navigate('/home');}}>Type</MenuItem>
      <MenuItem onClick={() => {handleCloseMenu(); setFilterType('region');  navigate('/home');}}>Region</MenuItem>
      <MenuItem onClick={() => {handleCloseMenu(); setFilterType('gen');  navigate('/home');}}>Generation</MenuItem>
    </Menu>
  </>
  )
};

export default PokemonFilterParamSelector;
