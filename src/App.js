import './App.scss';
import './components/Homepage/Homepage';
import Homepage from './components/Homepage/Homepage';
import './components/Searchbar/Searchbar';
import Searchbar from './components/Searchbar/Searchbar';
import Pokemon from './components/Pokemon/Pokemon';
import React, { useState, Fragment } from 'react';
import { ColorModeContext, useMode } from './style/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


function App() {
  const [pokemonName, setPokemonName] = useState('');
  
  const [theme, colorMode] = useMode('light');

  return (

    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="App" style={{ background: theme.palette.background.default }}>
            <header className="App-header">
              <Homepage />
            </header>
            <Searchbar setPokemon={setPokemonName}></Searchbar>
            {pokemonName !== '' ? <Pokemon value={pokemonName}></Pokemon> : <Fragment></Fragment>}
          </div>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;