import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import IndexL from './Components/Index/Index.jsx';
import Home from './Components/Home/Home.jsx'
import NavBar from './Components/Nav/NavBar';
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';
import PokemonDetail from './Components/Details/PokemonDetail';
// import BadWay from './Components/Missing/404'

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
          <Route exact path='/' component={IndexL} />
          <Route path='/h' component={NavBar} />
          <Route exact path='/h' component={Home} />
          <Route path='/h/createPokemon' component={CreatePokemon} />
          <Route path='/h/pokemons/:id' component={PokemonDetail} />
          {/* <Route path='*' component={BadWay} /> */}
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
