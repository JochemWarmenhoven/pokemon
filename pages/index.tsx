import { usePokemons } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import Link from "next/link";

export default function IndexPage() {
  const { data, isLoading, isError, isSuccess } = usePokemons();

  const flattenAbilities = (
    abilities: [
      {
        pokemon_v2_ability: {
          name: string;
        };
      }
    ]
  ) => abilities.map((ability) => ability.pokemon_v2_ability.name);

  const renderResult = () => {
    if (isLoading) {
      return <div className="search-message"> Loading... </div>;
    }

    if (isError) {
      return <div className="search-message"> Something went wrong </div>;
    }

    if (isSuccess) {
      return data?.map((pokemon) => {
        const { id, name, weight, pokemon_v2_pokemonabilities } = pokemon;
        return (
          <PokemonCard
            key={id}
            id={id}
            name={name}
            weight={weight}
            abilities={flattenAbilities(pokemon_v2_pokemonabilities)}
            detailAllowed={true}
          />
        );
      });
    }

    return <></>;
  };

  return (
    <div className="home">
      <h1>First 20 Pokemon</h1>

      {renderResult()}
    </div>
  );
}
