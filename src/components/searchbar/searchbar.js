import React, { useRef, useState } from 'react';
import useHints from '../hints/hints';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function Searchbar(props) {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const inputVal = useRef(null)
  const hints = useHints(value)

  const handleSubmit = (event) => {
    props.setPokemon(value);
    event.preventDefault();
  }

  return (

    <Stack spacing={2} direction="row" style={{ margin: 'auto', width: '25vw' }} >
      <Autocomplete
        freeSolo
        value={inputValue}
        onChange={(event, newValue) => {
          setInputValue(newValue.toLowerCase());
          setValue(newValue.toLowerCase());
          props.setPokemon(newValue.toLowerCase());
        }}
        inputValue={value}
        onInputChange={(event, newInputValue) => {
          setValue(newInputValue.toLowerCase());
        }}
        id="controllable-states-demo"
        options={hints}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search a pokemon" />}
      />
      <Button onClick={(e) => { handleSubmit(e) }} > SEARCH </Button>
    </Stack>

  );

}

