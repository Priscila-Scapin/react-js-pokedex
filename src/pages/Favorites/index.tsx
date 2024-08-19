import {  Container, Grid } from "@mui/material"
import Box from '@mui/material/Box';
import { Key, useEffect, useState } from "react";
import ResponsiveAppBar from '../../components/muiAppbar'
import PokemonDisplayCard from '../../components/cards/pokemonDisplay'



const Favorites = () => {
const [favoritePokemons, setFavoritePokemons] = useState([])

useEffect(() => {
		const favoritesFromLocalStorage  = JSON.parse(localStorage.getItem('favorite_pokemons') || '[]')
	 	setFavoritePokemons(favoritesFromLocalStorage)

	 }, [])

	return (
		<> 
		<ResponsiveAppBar />
			<Box 
				sx={{
					width: '100vw',
					height: '100vh',
					maxWidth: '100%',
					overflow: 'auto', 
					display: 'flex', 
					alignItems: 'center', 
					justifyContent: 'center',
					backgroundColor: '#FFEEB4', 
			}}
			>
				<Container 
					sx={{  
						width: '100%',
						display: 'flex',
						maxWidth: '1200px',
						justifyContent: 'center',
					}}
				>
				<Grid
					container
					spacing={2}
					justifyContent="center"
					sx={{
						width: '100%', 
						display: 'flex',
						flexWrap: 'wrap',
						maxHeight: '90vh',
						marginTop: '2rem',
						overflowY: 'auto',
						
						justifyContent: 'center',
					}}
				>
				{favoritePokemons?.map((pokemon: { id: Key | null | undefined; }, index: any) => (
					<Grid item xs={12} sm={6} md={3} key={index} container spacing={-1} sx={{ display: 'flex', width:"100%", marginBottom: '2rem' }}>
						<PokemonDisplayCard pokemon={pokemon} id={0} name={""} sprite={""} selected={""} types={[]} />
					</Grid>
  			))}
				</Grid>
					
				</Container>
			</Box>
		</>
	)
}

export default Favorites