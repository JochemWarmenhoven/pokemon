import Image from "next/image";
import Link from "next/link";
interface PokemonCardProps {
  id: number;
  name: string;
  weight: number;
  abilities: string[];
  detailAllowed?: boolean;
}

const PokemonCard = ({
  id,
  name,
  weight,
  abilities,
  detailAllowed = false,
}: PokemonCardProps) => {
  const getimageUrl = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="pokemon-card">
      <h2>{name}</h2>
      {detailAllowed ? (
        <Link href={`/pokemon/${name}`}>
          <Image src={getimageUrl(id)} alt={name} width={100} height={100} />
        </Link>
      ) : (
        <Image src={getimageUrl(id)} alt={name} width={100} height={100} />
      )}
      <div className="card-section">
        <p className="card-section-title">Weight</p>
        <div className="card-section-content">{weight / 10} kg</div>
      </div>
      <div className="card-section">
        <p className="card-section-title">Abilities</p>
        <ul>
          {abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
