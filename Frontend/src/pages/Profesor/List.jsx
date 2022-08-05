import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Peticion from "../../helpers/Peticiones";
const List = () => {
  const [data, setData] = useState(false);

  const handleDelete = (id) => {
    console.log(id)
    new Peticion(`/profesores`).deleteItem(id)

    setData(!data)
  };

  let datos = new Peticion("/profesores").getData(data);
  datos = !!datos && datos.response;
  const columns = [
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "apellidoPaterno", headerName: "ApellidoPaterno", width: 200 },
    { field: "apellidoMaterno", headerName: "ApellidoMaterno", width: 200 },
    { field: "sexo", headerName: "Sexo", width: 200 },
    { field: "correo", headerName: "Correo", width: 200 },
    { field: "fechaNacimiento", headerName: "FechaNacimiento", width: 200 },
    { field: "direccion", headerName: "direccion", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/profesores/` + params.row.id}>
              <button className="btn btn-outline-primary">
                <i className="bi bi-pencil-square"></i>
              </button>
            </Link>

            <button
              className="m-3 btn btn-outline-danger"
              onClick={() => handleDelete(params.row.id)}
            >
              <i className="bi bi-trash"></i>

            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-card">

        <div className="row mb-3">
          <div className="productTitleContainer">
            <h2 className="productTitle">Lista de profesor</h2>
            <Link to="/profesores/add">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          <div className="row">
          </div>
        </div>



        {/* Listamos las materias */}
        {!!datos && (
          <DataGrid
            rows={datos}
            style={{ height: '90%' }}
            // disableSelectionOnClick
            columns={columns}
            pageSize={8}
          // checkboxSelection
          ></DataGrid>
        )}
      </div>


    </>
  );
};

export default List;
