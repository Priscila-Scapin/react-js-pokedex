/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CustomIcon from '../../customIcon'
import PokeProfileModal from '../../modals/PokeProfileModal';
import { Pokemon } from '../../../services/pokeapi/pokemons/interfaces';


export default function PokemonDisplayCard(pokemon: Pokemon) {
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()
  // const handleOpen = () => setModalOpen(true);
  // const handleClose = () => setModalOpen(false);


const pokemonTypesArray = pokemon?.pokemon?.types?.flatMap((item:any) => item?.type)

const handleCloseFromChild = (e: React.MouseEvent) => {
  e.stopPropagation();
  setModalOpen(false);
};

const removePokemonFromLocalStorage = (pokemon: Pokemon) => {
  const parsedFavoritePokemonArray = JSON.parse(localStorage.getItem('favorite_pokemons') || '[]');
  const updatedFavoritePokemonArray = parsedFavoritePokemonArray.filter((item: any) => item?.id !== pokemon?.id);

  localStorage.setItem('favorite_pokemons', JSON.stringify(updatedFavoritePokemonArray));
}

const addFavoritePokemonToLocalStorage = (pokemon: Pokemon) => {  
  const favoriteArray = JSON.parse(localStorage.getItem('favorite_pokemons') || '[]');

  if (pokemon) {
    favoriteArray.push(pokemon);
    
    localStorage.setItem('favorite_pokemons', JSON.stringify(favoriteArray));
  }
}

const updatingFavoritePokemonArray = (pokemon: Pokemon) => {
  const parsedFavoritePokemonArray = JSON.parse(localStorage.getItem('favorite_pokemons') || '[]');
  const isPokemonAlreadySaved = parsedFavoritePokemonArray.filter((item: any) => item?.id === pokemon?.id);

  if (isPokemonAlreadySaved?.length === 0) {

    addFavoritePokemonToLocalStorage(pokemon)
  } else {

    removePokemonFromLocalStorage(pokemon)
  }
}

  useEffect(() => {
     if (selectedPokemon) {

      updatingFavoritePokemonArray(selectedPokemon);
      // Cleaning state
      setSelectedPokemon(undefined)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPokemon])

  useEffect(() => {
    const favoritePokemonsArray = JSON.parse(localStorage.getItem('favorite_pokemons') || '[]');
    setFavoritePokemon(favoritePokemonsArray);
  }, [selectedPokemon]);



  return (
    <Card 
    onClick={() => setSelectedPokemon(pokemon?.pokemon)}
    sx={{ 
      width: 350, 
      maxWidth: 500, 
      cursor: 'pointer',
      borderRadius: '8px',  
     
      border: '1px solid #E0E0E0',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }
      }}>
      <PokeProfileModal
        open={modalOpen}
        onClose={handleCloseFromChild}
        pokemonMainInfos={selectedPokemon}
      />
      <CardHeader       
        action={
          <IconButton aria-label="settings" onClick={() => setSelectedPokemon(pokemon?.pokemon)}>
            {favoritePokemon?.some((item: { id: any; }) => item?.id === pokemon?.pokemon?.id) ? <StarIcon sx={{ color:'yellow' }} /> : <StarBorderIcon sx={{ color:'yellow' }} />}
          </IconButton>
        }
        title={pokemon?.pokemon?.name[0].toUpperCase() + pokemon?.pokemon?.name.slice(1)}
        subheader={`#${pokemon?.pokemon?.id}`}
      />
      <Container sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
        <img src={pokemon?.pokemon?.sprite} height='120px' width='120px'   alt={`${pokemon?.pokemon?.name}-pic`}/>
      </Container>
      <CardContent>
        <Typography>
            {}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {pokemonTypesArray?.map((type: any) => (
        <CustomIcon type={type?.name} color={"#f25252"}/>
        ))}
      </CardActions>
    </Card>
  );
}