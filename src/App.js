import './App.css';
import './components/index/home';
import Homepage from './components/index/home';
import './components/searchbar/searchbar';
import Searchbar from './components/searchbar/searchbar';
import Pokemon from './components/pokemon/pokemon';
import React, {useState, Fragment} from 'react';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  return (

    <div className="App">
      <header className="App-header"> 
        <Homepage/>
      </header>
    <Searchbar setPokemon={setPokemonName}></Searchbar>
    {pokemonName !== ''? <Pokemon value={pokemonName}></Pokemon> : <Fragment></Fragment>}
    </div>
  );
}

export default App;
