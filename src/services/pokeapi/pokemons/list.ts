import { gql, request } from 'graphql-request'
import { endpoint, sprites } from '../config'
import { Pokemon } from './interfaces'

const PokemonInfo = gql`
  fragment PokemonInfo on pokemon_v2_pokemon {
    id
    name

    types: pokemon_v2_pokemontypes {
      slot
      type: pokemon_v2_type {
        name
      }
    }
  }
`

const queryByIds = gql`
  ${PokemonInfo}

  query findSpecies($offset: Int!, $limit: Int!, $name: String!, $ids: [Int!]) {
    species: pokemon_v2_pokemon(
      offset: $offset, limit: $limit,
      order_by: { id: asc },
      where: { name: { _iregex: $name }, id: { _in: $ids } }
    ) {
      ...PokemonInfo
    }
  }
`

const queryByName = gql`
  ${PokemonInfo}

  query findSpecies($offset: Int!, $limit: Int!, $name: String!) {
    species: pokemon_v2_pokemon(
      offset: $offset, limit: $limit,
      order_by: { id: asc },
      where: { name: { _iregex: $name } }
    ) {
      ...PokemonInfo
    }
  }
`

const queryByType = gql`
  ${PokemonInfo}

  query findSpeciesByType($offset: Int!, $limit: Int!, $type: String!) {
    species: pokemon_v2_pokemon(
      offset: $offset, limit: $limit,
      order_by: { id: asc },
      where: { pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } } }
    ) {
      ...PokemonInfo
    }
  }
`


type Variables = {
  offset: number
  name: string
  type?: string,
  limit: number
  ids: number[]
}

type Response = {
  species: Pokemon[]
}

const listByIds = (variables: Variables) => request<Response, Variables>(
  endpoint, queryByIds, variables
)

const listByNames = (variables: Variables) => {
  const { ids, ...queryVars } = variables

  return request<Response, Omit<Variables, 'ids'>>(
    endpoint, queryByName, queryVars
  )
}

const listByTypes = (variables: Variables) => {
  const { ids, ...queryVars} = variables

  return request<Response, Omit<Variables, 'ids'>>(
    endpoint, queryByType, queryVars
  )
}

const defaultVariables: Variables = {
  limit: 300, name: '', offset: 0, ids: [], type: ''
}

export const list = async (variables: Partial<Variables> = {}): Promise<Pokemon[]> => {
  let queryVars = { ...defaultVariables, ...variables }

  let listRequest;

  if (queryVars.ids.length) {
    listRequest = listByIds;
    const { type, ...filteredVars } = queryVars;
    queryVars = filteredVars;
  } else if (queryVars.type) {
    listRequest = listByTypes;
    const { name, ids, ...filteredVars } = queryVars;
    queryVars = filteredVars as Variables; 
  } else {
    listRequest = listByNames;
    const { type, ...filteredVars } = queryVars;
    queryVars = filteredVars as Variables;
  }

  const { species } = await listRequest(queryVars)

  const speciesWithSprites = species.map(specy => ({
    ...specy,
    sprite: `${sprites}/sprites/pokemon/${specy.id}.png`,
  }))

  return speciesWithSprites
}
