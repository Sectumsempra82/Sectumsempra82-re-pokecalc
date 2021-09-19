import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react'
import {axiosCached} from '../axiosCached/axiosCached'
import PokemonStats from './PokemonStats'
import Stack from '@mui/material/Stack';




export default function Pokemon(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useLayoutEffect(() => {
        setLoading(true)
    }, [props.value])

    useEffect(() => {
        setError(null);
        setLoading(true);

        axiosCached.get('https://pokeapi.co/api/v2/pokemon/' + props.value)
            .then(response => {
                setData(response.data);
                console.log(response);
                console.log(response.request.fromCache ? "CACHED" : "NOT CACHED")
            }).catch(error => {
                //console.error('Error fetching data: ', error);
                setError(error);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [props.value])

    if (loading) return "Loading...";
    if (error) {
        if (error.status === 404) {
            return (
                <div>
                    <span>Pokemon not found</span>
                </div> 
            )
        } else { return (<pre>{error.message}</pre>) } 
    }

    return (
        <div style={{ display: 'inline-flex'}}>
                <img src={data.sprites.other["official-artwork"].front_default !== null ? data.sprites.other["official-artwork"].front_default : data.sprites.front_default} alt={data.name} />
                <PokemonStats data={data}/>
        </div>
    );
}
