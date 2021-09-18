import './App.scss';
import './components/index/home';
import Homepage from './components/index/home';
import './components/searchbar/searchbar';
import Searchbar from './components/searchbar/searchbar';
import Pokemon from './components/pokemon/pokemon';
import React, { useState, Fragment } from 'react';
import { ColorModeContext } from './style/themeCtx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';


function App() {
  const [pokemonName, setPokemonName] = useState('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
 
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