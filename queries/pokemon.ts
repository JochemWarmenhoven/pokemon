import { gql } from "graphql-request";

export const GET_POKEMON = gql`
  query pokemon_details($name: String) {
    pokemon_v2_pokemon(limit: 5, where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
    }
  }
`;
