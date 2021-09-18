import './pokemon.css'
import React, { useEffect, useState, useLayoutEffect } from 'react'





export default function Pokemon(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useLayoutEffect(() => {
        setLoading(true)
    }, [props.value])

    useEffect(() => {

        fetch('https://pokeapi.co/api/v2/pokemon/' + props.value)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            }).then(data => [
                setData(data)
            ]).catch(error => {
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
        } else { return <pre>{error.message}</pre> }
    }

    return (
        <div className="Pokemon">
            <img src={data.sprites.other["official-artwork"].front_default} alt={data.name} />
        </div>
    );
}
