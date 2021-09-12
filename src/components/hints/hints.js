import { useQuery, gql } from "@apollo/client";
import './hints.css'




export default function Hints(props) {
  const POKE_QUERY = gql`
    {
        pokemon_v2_pokemon(where: {name: {_like: "%${props.value}%"}}) {
            id
            name
        }
    }
`;
    const { data, loading, error } = useQuery(POKE_QUERY);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>


    return ( 
        <div className="hints">
                <ul>
                {data.pokemon_v2_pokemon.map((pokemon) => (
          <li key={pokemon.id} value={pokemon.name} onClick={() => props.setSearch(pokemon.name)}>{pokemon.name}</li>
        ))}
                </ul>
              </div>
     ); 
}

