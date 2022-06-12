import React from "react";
import axios from "axios";
import type { GetStaticProps, GetStaticPaths } from "next";
import { useQuery, QueryClient, dehydrate } from "react-query";
import { useRouter } from "next/router";
import PokemonCard from "../../components/PokemonCard";
import { ALL_POKEMON_SPECIES } from "../../constants/pokemonSpecies";

const fetchPokemon = (id: string) =>
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(({ data }) => data);

export default function Pokemon() {
  const router = useRouter();
  const pokemonID =
    typeof router.query?.["pokemon-slug"] === "string"
      ? router.query?.["pokemon-slug"]
      : "";

  const {
    isSuccess,
    data: pokemon,
    isLoading,
    isError,
  } = useQuery(["getPokemon", pokemonID], () => fetchPokemon(pokemonID), {
    enabled: pokemonID.length > 0,
    staleTime: Infinity,
  });

  if (isSuccess) {
    return (
      <div className="container">
        <PokemonCard
          id={pokemon.id}
          name={pokemon.name}
          weight={pokemon.weight}
          abilities={pokemon.abilities?.map((item: any) => item.ability.name)}
        />
      </div>
    );
  }

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="center">
        We couldn&apos;t find your pokemon{" "}
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    );
  }

  return <></>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["getPokemon", id], () => fetchPokemon(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
