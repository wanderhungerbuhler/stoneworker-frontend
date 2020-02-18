import React, { useState } from 'react';

import api from '../services/api';

import './styles.css';

function ListWorkers() {
  const [listOneWorker, setListOneWorker] = useState([]);
  const [select, setSelect] = useState([]);
  const [message, setMessage] = useState('');

  const [name, setName] = useState([]);
  const [age, setAge] = useState([]);
  const [office, setOffice] = useState([]);

  const [teste, setTeste] = useState('');

  async function updateOneWorker(e, id) {
    e.preventDefault();
    const response = await api.put(`/workers`, { id, name, age, office });
    console.log(response);

    console.log(id);
    console.log(name);
    console.log(age);
    console.log(office);
  }

  async function loadOneWorkers() {
    const response = await api.get(`/workers/${select}`);

    const list = response.data.docs;

    setListOneWorker(list);
  }

  async function handleDelete(e, id) {
    e.preventDefault();

    const response = await api.delete(`/workers/${id}`);
    setMessage(response.data.message);

    setTimeout(() => {
      window.location.reload();
    }, 1500)
  }




  return (
    <>
    <div className="list-workers">


      <div className="select">
        <select className="select-workers" onChange={e => setSelect(e.target.value)}>
          <option hidden>Selecione um cargo</option>
          <option value="Desenvolvedor Sênior">Desenvolvedor Sênior</option>
          <option value="Desenvolvedor Pleno">Desenvolvedor Pleno</option>
          <option value="Desenvolvedor FullStack">Desenvolvedor FullStack</option>
          <option value="Desenvolvedor Front-End">Desenvolvedor Front-End</option>
          <option value="Desenvolvedor Back-End">Desenvolvedor Back-End</option>
        </select>
      </div>
      <button className="btn-list" onClick={loadOneWorkers}>Listar Cargos</button>


      { listOneWorker.map(workers => (
        <article key={workers.id}>
          <form>
            <span className="workers-title"><b>Nome: <input type="text" name="name" defaultValue={workers.name || name} onChange={e => setName(e.target.value)} /> </b></span>
            <p><b>Idade: </b> <input type="text" name="age" defaultValue={workers.age || age} onChange={e => setAge(e.target.value)} /></p>
            <p><b>Cargo: </b> <input type="text" name="office" defaultValue={workers.office || office} onChange={e => setOffice(e.target.value)} required={true} /></p>
            <div className="btns">
              <button type="submit" className="btn icons icons-edit" onClick={e => updateOneWorker(e, `${workers.id}`)}>Editar</button>
              <button className="btn icons icons-delete" onClick={e => handleDelete(e, `${workers.id}`)}>Deletar</button>
            </div>
          </form>
        </article>
      ))}

      {/* { listOneWorker.map(workers => (
        <article key={workers.id}>
          <span className="workers-title"><b>Nome: </b>{workers.name}</span>
          <p><b>Idade: </b> {workers.age} anos</p>
          <p><b>Cargo: </b> {workers.office}</p>
          <div className="btns">
            <button className="btn icons icons-edit">Editar</button>
            <button className="btn icons icons-delete" onClick={e => handleDelete(e, `${workers.id}`)}>Deletar</button>
          </div>
        </article>
      ))} */}

      <span>{message}</span>
    </div>

    </>
  );
}

export default ListWorkers;
