/* eslint-disable @typescript-eslint/no-unused-vars */
import { list } from '../services/pokeapi/pokemons/list';
import { useRecoilState } from 'recoil';
import filteredPokemonsAtom from '../atoms/filteredPokemons';
import filterQueryLoaderAtom from '../atoms/filterQueryLoader';
import { Pokemon } from '../services/pokeapi/pokemons/interfaces';


const query1stGenKanto = async () => {
	const ids = Array.from({ length: 151 - 1 + 1 }, (_, i) => i + 1);
	const result = await list({ids: ids})

	return result
}

const query2ndGenJohto = async () => {
	const ids = Array.from({ length: 251 - 152 + 1 }, (_, i) => i + 152);
	const result = await list({ids: ids})

	return result
}

const query3rdGenHoenn = async () => {
	const ids = Array.from({ length: 386 - 252 + 1 }, (_, i) => i + 252);
	const result = await list({ids: ids})

	return result
}

const query4thGenSinnoh = async () => {
	const ids = Array.from({ length: 493 - 387 + 1 }, (_, i) => i + 387);
	const result = await list({ids: ids})

	return result
}

const query5thGenUnova = async () => {
	const ids = Array.from({ length: 649 - 494 + 1 }, (_, i) => i + 494);
	const result = await list({ids: ids})

	return result
}

const query6thGenKalos = async () => {
	const ids = Array.from({ length: 721 - 650 + 1 }, (_, i) => i + 650);
	const result = await list({ids: ids})

	return result
}

const query7thGenAlola = async () => {
	const ids = Array.from({ length: 809 - 722 + 1 }, (_, i) => i + 722);
	const result = await list({ids: ids})

	return result
}

const query8thGenGalar = async () => {
	const ids = Array.from({ length: 905 - 812 + 1 }, (_, i) => i + 812);
	const result = await list({ids: ids})

	return result
}

const query9thGenPaldea = async () => {
	const ids = Array.from({ length: 1025 - 906 + 1 }, (_, i) => i + 906);
	const result = await list({ids: ids})

	return result
}


export const useFilterByType = () => {
  const [_, setFilteredPokemons] = useRecoilState(filteredPokemonsAtom);
  const [__, setLoadingQuery] = useRecoilState(filterQueryLoaderAtom)

  return async (typeName: string) => {
    setLoadingQuery(true)
    const result: Pokemon[] = await list({ type: typeName.toLowerCase() });

    setFilteredPokemons(result);
    setLoadingQuery(false)
  }
}


export const useFilterByGenOrRegion = () => {
	const [_, setFilteredPokemons] = useRecoilState(filteredPokemonsAtom)
  const [__, setLoadingQuery] = useRecoilState(filterQueryLoaderAtom)

  return async (filterQueryParam: string) => {
    let result = [];

    switch(filterQueryParam) {
      case '1st Gen':
      case 'Kanto':
        setLoadingQuery(true)
        result = await query1stGenKanto();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      case '2nd Gen':
      case 'Johto':
        setLoadingQuery(true)
        result = await query2ndGenJohto();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      case '3rd Gen':
      case 'Hoenn':
        setLoadingQuery(true)
        result = await query3rdGenHoenn();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      case '4th Gen':
      case 'Sinnoh':
        setLoadingQuery(true)
        result = await query4thGenSinnoh();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      case '5th Gen':
      case 'Unova':
        setLoadingQuery(true)
        result = await query5thGenUnova();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      case '6th Gen':
      case 'Kalos':
        setLoadingQuery(true)
        result = await query6thGenKalos();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      case '7th Gen':
      case 'Alola':
        setLoadingQuery(true)
        result = await query7thGenAlola();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      case '8th Gen':
      case 'Galar':
        setLoadingQuery(true)
        result = await query8thGenGalar();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      case '9th Gen':
      case 'Paldea':
        setLoadingQuery(true)
        result = await query9thGenPaldea();
        setLoadingQuery(false)
        setFilteredPokemons(result);
        break;
      default:
        console.log("No filterQueryParamSelected.");
        return;
    }
  };
};
