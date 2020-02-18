import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './styles.css';
import Logo from '../assets/logo-white.svg';

import NavMenu from '../NavMenu';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <Link to="/"><img src={Logo} width="200" /></Link>
        </div>

        <NavMenu />
      </div>
    );
  }
}

export default Header;
