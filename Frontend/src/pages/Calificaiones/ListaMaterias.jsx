import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Peticion from "../../helpers/Peticiones";
const ListaMaterias = () => {
    const [data, setData] = useState(false);

    const url = useLocation();
    const id = url.pathname.split("/").pop();

    const fullDatos = new Peticion(`/calificaciones?idCurso=${id}`).getData(data);
    const datos = !!fullDatos && fullDatos.materias;
    const datosCurso = !!fullDatos && fullDatos.curso;

    const columns = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "nombre", headerName: "Nombre", width: 400 },
        { field: "sigla", headerName: "Sigla", width: 300 },
        {
            field: "estado",
            headerName: "Estado",
            width: 300,
            renderCell: (params) => {
                console.log()
                return params.row.estado ? <span className="spanBack Approved">SI</span> : <span className="spanBack Declined">No</span>
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                console.log(params.row);
                return (
                    <>
                        <Link to={`/calificaciones/materia/` + id}>
                            <button className="btn btn-outline-primary" onClick={() => {
                                localStorage.setItem('cursomateria', params.row.idCursoMateria)
                            }}>
                                <i className="bi bi-pencil-square"></i>
                            </button>
                        </Link>
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
                        <h2 className="productTitle">Calificar del  <span style={{ "color": '#922c88' }}> Curso </span></h2>
                        <Link to="/calificaciones">
                            <button className="productAddButton">Cancelar</button>
                        </Link>
                    </div>
                    <div className="row">
                    </div>
                </div>


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

export default ListaMaterias;
