export type Type = {
  slot: number
  type: {
    name: string
  },
}

export type Pokemon = {
	pokemon: any
  id: number
  name: string
  sprite: string
  selected: string
  types: Type[]
}
