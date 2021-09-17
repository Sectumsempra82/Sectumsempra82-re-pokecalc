
import { useEffect, useState } from "react";
import axios from "axios";
import { setupCache } from 'axios-cache-adapter'
const headers = {
  'Content-Type': 'application/json',
  'access-token': '',
  'Access-Control-Allow-Origin': '*',
}


const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  exclude: {
    // Only exclude PUT, PATCH and DELETE methods from cache
    methods: ['put', 'patch', 'delete']
  }
})
const api = axios.create({
  adapter: cache.adapter
})

export default function useHints(inputValue) {
  const [hints, setHints] = useState([]);

  useEffect(() => {


    const getHints = ( name ) => {
      api
        .post('https://beta.pokeapi.co/graphql/v1beta', {

            query: `
              query pokeQuery {
                pokemon_v2_pokemon(where: {name: {_like: "%${name}%"}}) {
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
    
    if(inputValue && inputValue.length > 2 ){
      getHints(inputValue);
    } else {
      console.log('name too short');
      setHints([]);
    }
  
  }, [inputValue])

  return (hints); 
}
