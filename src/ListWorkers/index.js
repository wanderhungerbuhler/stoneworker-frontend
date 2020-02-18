import React, { useState, useEffect } from "react";

import api from "../services/api";

import "./styles.css";

const initialState = {
  id: null,
  name: "",
  age: "",
  office: ""
};

function ListWorkers() {
  const [professionalsList, setListProfessionalsList] = useState([]);
  const [professionalsByRole, setListProfessionalsByRole] = useState([]);

  const [editMode, setEditMode] = useState(true);
  const [userEdit, setUserEdit] = useState(initialState);

  async function handleSearchProfessionals() {
    const response = await api.get("/workers");
    setListProfessionalsList(response.data.docs);
  }

  async function handleSearchProfessionalsByRole(data) {
    const response = await api.get(`/workers/${data}`);
    setListProfessionalsByRole(response.data.docs);
  }

  async function handleUpdateProfessional(e) {
    e.preventDefault();

    try {
      const response = await api.put(`/workers/${userEdit.id}`, {
        id: userEdit.id,
        name: userEdit.name,
        age: parseInt(userEdit.age),
        office: userEdit.office
      });

      if (response.status === 200) {
        setUserEdit(initialState);
        setEditMode(!editMode);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteProfessional(data) {
    console.log(data);
    try {
      const response = await api.delete(`/workers/${data}`);

      if (response.status === 200) {
        handleSearchProfessionals();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

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
        <form onSubmit={handleUpdateProfessional}>
          {professionalsByRole.map(item => (
            <article key={item.id}>
              <span>
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={item.name || userEdit.name}
                  disabled={
                    item.id === userEdit.id && userEdit.id !== null
                      ? null
                      : "disabled"
                  }
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <label htmlFor="age">Idade:</label>
                <input
                  type="text"
                  name="age"
                  defaultValue={item.age || userEdit.age.split("")}
                  disabled={
                    item.id === userEdit.id && userEdit.id !== null
                      ? null
                      : "disabled"
                  }
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <label htmlFor="office">Cargo:</label>
                <input
                  type="text"
                  name="office"
                  defaultValue={item.office || userEdit.office}
                  disabled={
                    item.id === userEdit.id && userEdit.id !== null
                      ? null
                      : "disabled"
                  }
                  onChange={handleInputChange}
                />
              </span>
              <div className="btns">
                <button
                  className={`btn icons ${
                    item.id === userEdit.id && userEdit.id !== null
                      ? "icons-close"
                      : "icons-edit"
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    setEditMode(!editMode);
                    userEdit.id === null
                      ? setUserEdit({
                          id: item.id,
                          name: item.name,
                          age: item.age,
                          office: item.office
                        })
                      : setUserEdit(initialState);
                  }}
                >
                  Editar
                </button>
                {item.id === userEdit.id && userEdit.id !== null && (
                  <button className="btn icons icons-save">Deletar</button>
                )}
                <button
                  className="btn icons icons-delete"
                  onClick={() => handleDeleteProfessional(item.id)}
                >
                  Deletar
                </button>
              </div>
            </article>
          ))}
        </form>

        {/* <span>{message}</span> */}
      </div>
    </>
  );
}

export default ListWorkers;
