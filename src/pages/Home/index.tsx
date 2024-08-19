import { Container, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import  SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import ResponsiveAppBar from '../../components/muiAppbar'
import { list } from '../../services/pokeapi/pokemons/list';
import filterTypeState from '../../atoms/filterType';
import filterQueryLoaderAtom from '../../atoms/filterQueryLoader'
import filterQueryParamAtom from "../../atoms/filterQueryParam";
import filteredPokemonsAtom from "../../atoms/filteredPokemons";
import FiltersPannel from '../../components/pannels/filterPannel'
import PokemonDisplayCard from '../../components/cards/pokemonDisplay'
import { useRecoilValue, useRecoilState } from "recoil";



const Home = () => {
	const filterType = useRecoilValue(filterTypeState);
	const loading = useRecoilValue(filterQueryLoaderAtom)
	const filterQueryParam = useRecoilValue(filterQueryParamAtom)
	const [searchLoader, setSearchLoader] = useRecoilState(filterQueryLoaderAtom)
	const [filteredPokemons, setFilteredPokemons] = useRecoilState(filteredPokemonsAtom)
	const [loaderGif, setLoaderGif] = useState<string>('');
	const [filterParams, setFilterParams] = useState<string[]>([])
	const [searchTerm, setSearchTerm] = useState<string | number>()
	const gifsTitles = ['pikachu', 'pokemonFriends', 'snorlax', 'mew', 'eevee', 'gyarados', 'vaporeon', 'chinchou', 'pikachuRun', 'raichu', 'caterpie', 'butterfree'  ]


  const fetchPokemonBySearchParam = async (searchParam: string): Promise<void> => {
		const checkingIsNumericValue = !isNaN(Number(searchParam)) ? Number(searchParam) : searchParam;
		if (typeof checkingIsNumericValue === "string") {
	  try {
			setSearchLoader(true);
			const pokemons = await list({ name: searchParam });
			setFilteredPokemons(pokemons);
			setSearchLoader(false);
		} catch (error) {
			console.error("Erro ao obter os Pokémon:", error);
	  }
		} else if (typeof checkingIsNumericValue === "number") {
			try {
				setSearchLoader(true)
				const pokemons = await list({ ids: [checkingIsNumericValue] });
				setFilteredPokemons(pokemons);
				setSearchLoader(false)
			} catch (error) {
				console.error("Erro ao obter os Pokémon:", error);
			}
		}
  };

	const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
			fetchPokemonBySearchParam(searchTerm?.toString() || '')
    }
  };

	// Randon loader pokemon gif
	// const getRandomLoaderGif = () => {
	// 	const randomIndex = Math.floor(Math.random() * gifsTitles.length);
	// 	return `/assets/${gifsTitles[randomIndex]}.gif`;
	// };


  // useEffect(() => {
  //   setLoaderGif(getRandomLoaderGif());
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading]);
	

	useEffect(() => {
		if (filterType === 'type') {
			setFilterParams([
				'Normal',
				'Fire',
				'Water',
				'Electric',
				'Grass',
				'Ice',
				'Fighting',
				'Poison',
				'Ground',
				'Flying',
				'Psychic',
				'Bug',
				'Rock',
				'Ghost',
				'Dragon',
				'Dark',
				'Steel',
				'Fairy'
			])
		}

		if (filterType === 'region') {
			setFilterParams([
				'Kanto',
  			'Johto',
  			'Hoenn',
  			'Sinnoh',
  			'Unova',
  			'Kalos',
  			'Alola',
  			'Galar',
  			'Paldea'
			])
		}

		if (filterType === 'gen') {
			setFilterParams([
				'1st Gen',   
  			'2nd Gen',    
  			'3rd Gen',   
  			'4th Gen',   
  			'5th Gen',   
  			'6th Gen',   
  			'7th Gen', 
  			'8th Gen',    
  			'9th Gen'  
			])
		}

	}, [filterType])

	const fetchInitialPagePokemon = async () => {
		const result = await list({ limit: 80, offset: 0,});
		setFilteredPokemons(result)
	}
	useEffect(() => {
		fetchInitialPagePokemon()
	}, [])

	return (
		<> 
		<ResponsiveAppBar />
			<Box 
				sx={{
					width: '100vw',
					height: '100vh',
					maxWidth: '100%',
					overflow: 'scroll',
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
      <TextField
        value={searchTerm}
        label="Type name or id"
				sx={{
					width: '100%',
					marginTop: '2rem'
				}}
        onChange={(event) => {
          const value = event.target.value;
          setSearchTerm(value);
        }}
				onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
             <SearchIcon onClick={() => fetchPokemonBySearchParam(searchTerm?.toString() || '')} style={{ cursor: 'pointer' }} />             
            </InputAdornment>
          ),
        }}
      />
  	  </Container>
			<Box 
				id="center-it"
				sx={{
					width: '100%',
					display: 'flex',
					
					marginTop: '2rem',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				{filterType && (
					<Box sx={{width: '100%', justifyContent: 'center', display: 'flex'}}>
						<FiltersPannel filterParams={filterParams} filterType={filterType}/>
					</Box>
				)}
				
				 {filteredPokemons?.length === 0 && !loading &&(
					<Box
						sx={{
							display: 'flex',
							marginTop: '2rem',
							textAlign: 'center',
							alignItems: 'center',
							flexDirection: 'column',
							justifyContent: 'center'
						}}
					>
						<img
							src="/assets/plusle.gif"
							alt="No Pokémon found"
							style={{
								width: '100%',
								height: 'auto',
								display: 'block',
								maxWidth: '500px'
							}}
						/>
						<Typography sx={{ marginTop: '1rem' }} variant='h5' color="#44403C">
							{/* Use the Search field or click on Browse by to explore Pokémon by type, gen, and more! Search for a Pokémon by name or using its id. */}
							Loading...
						</Typography>
					</Box>
				)} 
			</Box>

				
				<Container>
				<Grid
					container
					spacing={2}
					justifyContent="center"
					sx={{
						width: '100%', 
						display: 'flex',
						flexWrap: 'wrap',
						maxHeight: '90vh',
						overflowY: 'auto',
						marginTop: '2rem',
						marginBottom: '4rem',
						justifyContent: 'center',
					}}
				>
				 {loading || searchLoader ? (
					<Box
						sx={{
							display: 'flex',
							marginTop: '2rem',
							textAlign: 'center',
							alignItems: 'center',
							flexDirection: 'column',
							justifyContent: 'center'
						}}
					>
						<img
							src='/assets/pokeball-loader.gif'
							alt="No Pokémon found"
							style={{
								width: '100%',
								height: 'auto',
								maxWidth: '300px',
								display: 'block',
							}}
						/>
						<Typography sx={{ marginTop: '1rem' }} variant='h5' color="#44403C">
							Loading...
						</Typography>
					</Box>
				): (
					<>
					{filteredPokemons?.map((pokemon, index) => (
						<Grid item xs={12} sm={6} md={3} key={pokemon?.id} container spacing={-1} sx={{ display: 'flex' }}>
							<PokemonDisplayCard pokemon={pokemon} id={0} name={""} sprite={""} selected={""} types={[]} />
						</Grid>
					))}
					</>
				)} 
				
				</Grid>
				</Container>
			</Box>
		</>
	)
}

export default Home