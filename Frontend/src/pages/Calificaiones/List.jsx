import React, { useState } from "react";
import { Link } from "react-router-dom";
import Peticion from "../../helpers/Peticiones";
const List = () => {
  const [data, setData] = useState(false);
  


  let datos = new Peticion("/cursos").getData(data);
  datos = !!datos && datos.response;

  return (
    <>
      <div className="my-card">

        <div className="row mb-3">
          <div className="productTitleContainer">
            <h2 className="productTitle">Cursos</h2>
            <Link to="/cursos/add">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          <div className="row">
          </div>
        </div>



        {/* Listamos las materias */}
        {!!datos && (
          // <DataGrid
          //   rows={datos}
          //   style={{ height: '90%' }}
          //   // disableSelectionOnClick
          //   columns={columns}
          //   pageSize={8}
          // // checkboxSelection
          // ></DataGrid>
          datos.map(element => {
            return (
              <div className="my-card-cursos">
                <h4 className="mb-0">{element.nombre} - {element.paralelo}</h4>

                <span className="mb-3">{element.nivel}</span>
                <Link to={`/calificaciones/add/` + element.id}>
                  Ir...
                </Link>
              </div>
            )
          })
        )}
      </div>


    </>
  );
};

export default List;
