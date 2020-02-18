import React, { useState, useEffect } from "react";

import api from "../services/api";

import "./styles.css";

function ListWorkers() {
  const [professionalsList, setListProfessionalsList] = useState([]);
  const [professionalsByRole, setListProfessionalsByRole] = useState([]);

  async function handleSearchProfessionals() {
    const response = await api.get("/workers");
    setListProfessionalsList(response.data.docs);
  }

  async function handleSearchProfessionalsByRole(data) {
    const response = await api.get(`/workers/${data}`);
    setListProfessionalsByRole(response.data.docs);
  }

  useEffect(() => {
    handleSearchProfessionals();
  }, []);

  function handleListRoles(array) {
    let rolesFiltered = [];
    array.map(
      item =>
        !rolesFiltered.includes(item.office) && rolesFiltered.push(item.office)
    );

    return rolesFiltered.map(item => (
      <option key={item} value={`${item}`}>
        {item}
      </option>
    ));
  }

  return (
    <>
      <div className="list-workers">
        <div className="select">
          <select
            className="select-workers"
            onChange={e => handleSearchProfessionalsByRole(e.target.value)}
          >
            <option hidden>Selecione um cargo</option>
            {professionalsList && handleListRoles(professionalsList)}
          </select>
        </div>

        {professionalsByRole.map(item => (
          <article key={item.id}>
            <span className="workers-title">
              <b>Nome: </b>{item.name}</span>
              <p><b>Idade: </b> {item.age} anos</p>
              <p><b>Cargo: </b> {item.office}</p>
              <div className="btns">
              <button className="btn icons icons-edit">Editar</button>
              <button className="btn icons icons-delete">Deletar</button>
            </div>
          </article>
        ))}

        {/* {listOneWorker.map(workers => (
          <article key={workers.id}>
            <form>
              <span className="workers-title">
                <b>
                  Nome:{" "}
                  <input
                    type="text"
                    name="name"
                    defaultValue={workers.name || name}
                    onChange={e => setName(e.target.value)}
                  />{" "}
                </b>
              </span>
              <p>
                <b>Idade: </b>{" "}
                <input
                  type="text"
                  name="age"
                  defaultValue={workers.age || age}
                  onChange={e => setAge(e.target.value)}
                />
              </p>
              <p>
                <b>Cargo: </b>{" "}
                <input
                  type="text"
                  name="office"
                  defaultValue={workers.office || office}
                  onChange={e => setOffice(e.target.value)}
                  required={true}
                />
              </p>
              <div className="btns">
                <button
                  type="submit"
                  className="btn icons icons-edit"
                  onClick={e => updateOneWorker(e, `${workers.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn icons icons-delete"
                  onClick={e => handleDelete(e, `${workers.id}`)}
                >
                  Deletar
                </button>
              </div>
            </form>
          </article>
        ))} */}

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

        {/* <span>{message}</span> */}
      </div>
    </>
  );
}

export default ListWorkers;
