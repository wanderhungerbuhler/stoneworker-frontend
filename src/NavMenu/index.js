import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import './styles.css';

class NavMenu extends Component {
  render() {
    return(
      <>
        <ul className="list-menu">
          <li><NavLink to="/register" activeClassName="active">Cadastrar Funcionários</NavLink></li>
          <li><NavLink to="/filter">Filtrar Funcionários</NavLink></li>
        </ul>
      </>
    );
  }
}

export default NavMenu;
