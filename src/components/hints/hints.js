
import { useEffect, useState } from "react";
import axios from "axios";


export default function useHints(props) {
  const [hints, setHints] = useState([]);

  useEffect(() => {

    const getHints = ( name ) => {
      axios
        .post('https://beta.pokeapi.co/graphql/v1beta', {

            query: `
              query pokeQuery {
                pokemon_v2_pokemon(where: {name: {_like: "%${name}%"}}) {
                    id
                    name
                }
            }
              `
          
        })
        .then((response) => {
          console.log(response.data.data.pokemon_v2_pokemon);
          if(response.data.data.pokemon_v2_pokemon){
            var hintsFiltered = response.data.data.pokemon_v2_pokemon.map(pkm => pkm.name);
            console.log(hintsFiltered);
            setHints(hintsFiltered);
         }})
        .catch(err => {
          console.log('error fetching hints')
          setHints([]);
        })
        ;
    }
    
    if(props.inputValue && props.inputValue.length > 2 ){
      getHints(props.inputValue, props.inputValue);
    } else {
      console.log('name too short');
      setHints([]);
    }
  
  }, [props.inputValue])

  return (hints); 
}

