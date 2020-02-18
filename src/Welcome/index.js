import React, { Component } from 'react';

import './styles.css';
import Workers from '../assets/workers.svg';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div>
          <h1>Feito para você cadastrar mais!</h1>
          <p>O sistema inteligente que facilita o seu cadastro de funcionários.</p>
        </div>
        <img src={Workers} />
      </div>
    );
  }
}

export default Welcome;
