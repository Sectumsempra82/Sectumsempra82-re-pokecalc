import React, { useState, Fragment} from 'react';
import useHints from '../hints/hints';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedPokemon } from '../store/slices/pokemonSlice'

export default function Searchbar(props) {

  const dispatch = useDispatch()

  const selectedPokemon = useSelector(state => state.pokemon.selectedPokemon)

  //we keep this local, no need to share this value further above
  const [inputValue, setInputValue] = useState('');

  
  const hints = useHints(selectedPokemon)

  const handleSubmit = (event) => {
    props.setPokemon(selectedPokemon);
    event.preventDefault();
  }
  
  return (
    <Fragment >
    <span ref={props.refToSearchBar} >&nbsp;</span>
    <Stack spacing={2} direction="row" className="SearchBar" >

      <Autocomplete
        
        freeSolo
        //value selected when clicking a hint or pressing enter
        value={inputValue}
        //event fired when the above value changes
        onChange={(event, newValue) => {
          
          if(newValue !== null){
            setInputValue(newValue.toLowerCase());
            dispatch(updateSelectedPokemon(newValue.toLowerCase()));
            props.setPokemon(newValue.toLowerCase());
          } else {
            setInputValue(null);
          }
        }}
        //actual text in the box
        inputValue={selectedPokemon}
        //callback when txt in the box changes
        onInputChange={(event, newInputValue) => {
          dispatch(updateSelectedPokemon(newInputValue === '' ? '' : newInputValue.toLowerCase()));
        }}
        id="controllable-states-demo"
        options={hints}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search a pokemon" />}
      />

      <Button onClick={(e) => { handleSubmit(e) }} > SEARCH </Button>

     

    </Stack>
    </Fragment>
  );

}

