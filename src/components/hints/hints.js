
import { useEffect, useState } from "react";
import {axiosCached} from '../AxiosCached/AxiosCached'



export default function useHints(inputValue) {



  const [pkmList, setPkmList] = useState([]);
  const [hints, setHints] = useState([]);

  useEffect(() => {


    const getHints = ( name ) => {
      var hintsFiltered = pkmList.filter(pkm => pkm.includes(name));
      setHints(hintsFiltered);
    }
    
    if(inputValue && inputValue.length > 2 ){
      getHints(inputValue);
    } else {
      console.log('name too short');
      setHints([]);
    }
  
  }, [inputValue, pkmList])

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'access-token': '',
      'Access-Control-Allow-Origin': '*',
    }
    axiosCached
    .post('https://beta.pokeapi.co/graphql/v1beta', {

        query: `
          query pokeQuery {
            pokemon_v2_pokemon {
                id
                name
            }
        }
          `
          
      
    },
    {crossdomain: true},
    {headers: headers}
  )
    .then((response) => {
      console.log(response.data.data.pokemon_v2_pokemon);
      console.log(response.request.fromCache ? "Cached!" : "Not cached :(")
      if(response.data.data.pokemon_v2_pokemon){
        var list = response.data.data.pokemon_v2_pokemon.map(pkm => pkm.name);
        setPkmList(list);
     }})
    .catch(err => {
      console.log('error fetching hints')
      setPkmList([]);
    })
    ;
  }, [])

  return (hints); 
}
