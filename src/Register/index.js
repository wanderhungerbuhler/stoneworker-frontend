import React, { useState } from 'react'

import api from '../services/api';

import SuccessRegister from '../assets/check.gif';
import './styles.css';

function Register() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [office, setOffice] = useState('');

  const [r, setR] = useState('');

   async function registerWorkers(e) {
    e.preventDefault();

    const response = await api.post(`/workers`, { name, age, office });

    if(response.status === 200) {
      // alert('Cadastrado com sucesso!');
      setR('Cadastrado com sucesso!');
      document.getElementsByClassName('box-register-success')[0].style.display = "flex";

      setTimeout(() => {
        document.getElementsByClassName('box-register-success')[0].style.display = "none";
      }, 2000);
    }

    console.log(response.data.message);

    setName('');
    setAge('');
    setOffice('');
  }


    return(
      <>
      <div className="box-register-success">
        <img src={SuccessRegister} width="350" />
        <p>{r}</p>
      </div>

      <form onSubmit={registerWorkers} className="form-register" method="POST">
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Seu Nome"/>
        <input type="text" name="age" value={age} onChange={e => setAge(e.target.value)} placeholder="Sua Idade"/>
        <input type="text" name="worker" value={office} onChange={e => setOffice(e.target.value)} placeholder="Sua função"/>
        <button type="submit">Cadastrar</button>
      </form>
      </>
    );

}

export default Register;
