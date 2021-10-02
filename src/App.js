import './App.scss';
import './components/Homepage/Homepage';
import Homepage from './components/Homepage/Homepage';
import './components/Searchbar/Searchbar';
import Searchbar from './components/Searchbar/Searchbar';
import Pokemon from './components/Pokemon/Pokemon';
import React, { useState, useRef, useEffect } from 'react';
import { ColorModeContext, useMode } from './style/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar'


function App() {
  const [pokemonName, setPokemonName] = useState('');
  const refToSearchBar = useRef(null)
  const [theme, colorMode] = useMode('light');
  
  useEffect(() => {
    if( refToSearchBar.current ) { 
      setTimeout(() => { window.scrollTo({ behavior: 'smooth', top: refToSearchBar.current.offsetTop }) }, 500 )      
    }
  },[pokemonName])

  return (

    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="App" style={{ background: theme.palette.background.default }}>
            <ButtonAppBar/>
            <Homepage/>
            <Searchbar setPokemon={setPokemonName} refToSearchBar={refToSearchBar}  ></Searchbar>
            {pokemonName !== '' ? <Pokemon value={pokemonName} /> : null }
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;