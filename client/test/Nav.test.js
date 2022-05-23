import React from "react";
import { NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import NavBar from '../src/Components/Nav/NavBar' 

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
    let navbar;
    beforeEach(() => {
        navbar = shallow(<NavBar />);
        expect(isReact.functionComponent(NavBar))
    });

    it('Debería renderizar tres <NavLink to="" />. Dos que vayan a "/h", y un tercero a "/h/createPokemon"', () => {
        expect(navbar.find(NavLink).length).toBeGreaterThanOrEqual(3);
        expect(navbar.find(NavLink).at(0).prop('to')).toEqual('/h');
        expect(navbar.find(NavLink).at(1).prop('to')).toEqual('/h');
        expect(navbar.find(NavLink).at(2).prop('to')).toEqual('/h/createPokemon');
    });

    it('Debería tener un link en una imagen que cambie la ruta hacia "/h"', () => {
        expect(navbar.find(NavLink).at(0).prop("to")).toEqual("/h");
        
    });

    it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/h"', () => {
        expect(navbar.find(NavLink).at(1).prop("to")).toEqual("/h");
        expect(navbar.find(NavLink).at(1).text()).toEqual("Home");
    });

    it('Deberíav tener un segundo Link, con texto "Create Pokemon" y que cambie la ruta hacia "/h/createPokemon"', () => {
        expect(navbar.find(NavLink).at(2).prop("to")).toEqual("/h/createPokemon");
        expect(navbar.find(NavLink).at(2).text()).toEqual("Create Pokemon");
    });
});