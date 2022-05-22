import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import * as data from '../db.json';
import App from '../src/App';
import IndexL from '../src/Components/Index/Index';
import axios from 'axios';
import nock from 'nock';
import nodeFetch from 'node-fetch';
axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

describe('<App />', () => {
  global.fetch = nodeFetch;

  let store;
  const routes = ['/', '/h', '/h/pokemons/1', '/createPokemon'];
  const mockStore = configureStore([thunk]);
  const state = {
    pokemons: data.pokemons,
    detail: data.detail[0],
  };

  beforeEach(async () => {
    // Se Mockea las request a las api
    const apiMock = nock('http://localhost:3001').persist();

    // "/products" => Retorna la propiedad products del archivo data.json
    apiMock.get('/pokemons').reply(200, data.pokemons);

    // "/products/:id" => Retorna un producto matcheado por su id
    apiMock.get(/\/pokemons\/\d/).reply(200, (uri, requestBody) => {
      const idStr = uri.split('/').pop();
      const id = Number(idStr);
      return data.pokemons.find((pokemons) => pokemons.id === id);
    });

    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };
  describe('IndexL:', () => {
    it('Debería ser renderizado en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(IndexL)).toHaveLength(1);
    });
    it('El componente "IndexL" no deberia mostrarse en ninguna otra ruta', () => {
        const app = mount(componentToUse(routes[1]));
        expect(app.find(IndexL)).toHaveLength(0);
  
        const app2 = mount(componentToUse(routes[2]));
        expect(app2.find(IndexL)).toHaveLength(0);

        const app3 = mount(componentToUse(routes[3]));
        expect(app3.find(IndexL)).toHaveLength(0);
    });
  });
});