import { atom } from 'recoil';
import { Pokemon } from '../services/pokeapi/pokemons/interfaces';

const filteredPokemonsAtom = atom<Pokemon[]>({
  key: 'filteredPokemonsAtom',
  default: [],
});

export default filteredPokemonsAtom;
