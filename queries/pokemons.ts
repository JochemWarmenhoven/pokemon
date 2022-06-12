import { gql } from "graphql-request";

export const GET_POKEMONS = gql`
  query {
    pokemon_v2_pokemon(limit: 20) {
      id
      name
      height
      weight
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
  }
`;

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonabilities: [
    {
      pokemon_v2_ability: {
        name: string;
      };
    }
  ];
};
