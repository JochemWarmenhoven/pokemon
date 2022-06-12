import { useQuery } from "react-query";
import { client } from "../queries/client";
import { GET_POKEMON } from "../queries/pokemon";
import { GET_POKEMONS, Pokemon } from "../queries/pokemons";
const usePokemons = () => {
  return useQuery("pokemons", async () => {
    const {
      pokemon_v2_pokemon,
    }: {
      pokemon_v2_pokemon: [Pokemon];
    } = await client.request(GET_POKEMONS);
    return [...pokemon_v2_pokemon];
  });
};

const usePokemon = (name = "") => {
  return useQuery(`pokemon-${name}`, async () => {
    const { pokemon_v2_pokemon } = await client.request(GET_POKEMON, {
      name,
    });
    return pokemon_v2_pokemon[0];
  });
};

export { usePokemon, usePokemons };
