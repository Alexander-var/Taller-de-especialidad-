import { DataGrid } from "@material-ui/data-grid";
import { Field } from "formik";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Notification from "../../helpers/Notification";
import Peticion from "../../helpers/Peticiones";
const ListaEstudiantes = () => {
    const [data, setData] = useState(false);

    const url = useLocation();
    const id = url.pathname.split("/").pop();
    const fullDatos = new Peticion(`/calificaciones?idCurso=${id}`).getData(data);
    const datos = !!fullDatos && fullDatos.estudiante;

    let notas = new Peticion(`/calificaciones/filtro?idCursoMateria=${localStorage.getItem('cursomateria')}`).getData()
    notas = !!notas && Object.values(notas)
    const calificaciones = {
        idEstudiante: '',
        idProfesor: 1,
        idCursoMateria: localStorage.getItem('cursomateria'),
        ser: '',
        saber: '',
        hacer: '',
        decidir: '',
        autoEvaluacion: ''
    }

    const registrar = (data) => {
        console.log(data);
        calificaciones.idEstudiante = data.id
        new Peticion("/calificaciones").createItem(calificaciones);
    }

    // Notificacion al whatsapp
    const notificacionAlWhatsapp = async (data) => {
        const filterNotas = Object.values(notas).filter(e => e.idEstudiante == data.id)
        console.log(notas);
        const promedio = (filterNotas[0].ser + filterNotas[0].saber + filterNotas[0].decidir + filterNotas[0].hacer + filterNotas[0].autoEvaluacion) 
        const textEnviar = `
        LAS CALIFICACIONES del estudiante : ${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}\n
        Materia: ${filterNotas[0].nombreMateria}\n
        SER:${filterNotas[0].ser}
        SABER:${filterNotas[0].saber}
        HACER:${filterNotas[0].hacer}
        DECIDIR:${filterNotas[0].decidir}
        AUTOEVALUACION:${filterNotas[0].autoEvaluacion}\n
        Promedio: ${promedio}
        `
        const template = {
            "messaging_product": "whatsapp",
            "to": `591${data.telefono}`,
            "type": "template",
            "template": {
                "name": "hello_world",
                "language": {
                    "code": "en_US"
                }
            }
        }

        const mensage = {
            "messaging_product": "whatsapp",
            "to": `591${data.telefono}`,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": `${textEnviar}`
            }
        }

        const response = await fetch(`https://graph.facebook.com/v13.0/111344541647897/messages`,
            {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(mensage),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer EAAIASGA29LsBANjD1oFB8A87BlTu3EPg5ZCL8RZARSmFxmgRhfv9mGh2KYkGohXBJMZACDEIUT9vUshaHsk1yTZCWIgwRjD0gGxb3TTehK0an5vBg7JNgHmccHf135vwkFXuQWGDvVTExyZC4GB88ZC8V1vm4hmGXXUEZC7d33l9kZBRrVgn3iDqMR7gB8g1AUfLIjrP0woM5QZDZD`
                }
            }
        )
        const dataResponse = await response.json()
        if (dataResponse.messaging_product !== undefined) {
            Notification(200, {message:"Las notas se enviaron a Whatsapp"}, null);
        }else{
            Notification(404, {message:"Error, hubo un problema"}, null);

        }
        console.log(dataResponse);
    }

    const columns = [
        {
            field: "nombre", headerName: "Nombre Completo", width: 300,
            renderCell: (params) => {
                return <span>{params.row.nombre} {params.row.apellidoPaterno} {params.row.apellidoMaterno}</span>
            }
        },
        {
            field: "rude", headerName: "Rude", width: 150,
        },
        {
            field: "ser", headerName: "Ser", width: 150,
            renderCell: (params) => {
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i].idEstudiante == params.row.id) {
                        return <input onChange={(e) => {
                            const a = e.target.value
                            calificaciones.ser = a
                        }} type="number" placeholder="0/10" required={true} minLength={0} maxLength={20} className="form-control" defaultValue={notas[i].ser} name="ser" />
                    }

                }
                return <input onChange={(e) => {
                    const a = e.target.value
                    calificaciones.ser = a
                }} type="number" placeholder="0/10" required={true} minLength={0} maxLength={100} className="form-control" name="ser" />
            }
        },
        {
            field: "saber", headerName: "Saber", width: 150,
            renderCell: (params) => {
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i].idEstudiante == params.row.id) {
                        return <input onChange={(e) => {
                            const a = e.target.value
                            calificaciones.saber = a
                        }} type="number"placeholder="0/35" required={true}   minLength={0} maxLength={100} className="form-control" defaultValue={notas[i].saber} name="ser" />
                    }

                }
                return <input onChange={(e) => {
                    const a = e.target.value
                    calificaciones.saber = a
                }} type="number" placeholder="0/35" required={true}  minLength={0} maxLength={100} className="form-control" name="saber" />
            }
        },
        {
            field: "decidir", headerName: "Decidir", width: 150,
            renderCell: (params) => {
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i].idEstudiante == params.row.id) {
                        return <input onChange={(e) => {
                            const a = e.target.value
                            calificaciones.decidir = a
                        }} type="number" placeholder="0/10" required={true}  minLength={0} maxLength={100} className="form-control" defaultValue={notas[i].decidir} name="ser" />
                    }

                }
                return <input onChange={(e) => {
                    const a = e.target.value
                    calificaciones.decidir = a
                }} type="number" placeholder="0/10" required={true}  minLength={0} maxLength={100} className="form-control" name="decidir" />
            }
        },

        {
            field: "hacer", headerName: "Hacer", width: 150,
            renderCell: (params) => {
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i].idEstudiante == params.row.id) {
                        return <input onChange={(e) => {
                            const a = e.target.value
                            calificaciones.hacer = a
                        }} type="number" placeholder="0/35" required={true}  minLength={0} maxLength={100} className="form-control" defaultValue={notas[i].hacer} name="ser" />
                    }

                }
                return <input onChange={(e) => {
                    const a = e.target.value
                    calificaciones.hacer = a
                }} type="number" placeholder="0/35" required={true}  minLength={0} maxLength={100} className="form-control" name="hacer" />
            }
        },
        {
            field: "autoEvaluacion", headerName: "Auto Evaluacion", width: 200,
            renderCell: (params) => {
                for (let i = 0; i < notas.length; i++) {
                    if (notas[i].idEstudiante == params.row.id) {
                        return <input onChange={(e) => {
                            const a = e.target.value
                            calificaciones.autoEvaluacion = a
                        }} type="number" placeholder="0/10" required={true}  minLength={0} maxLength={100} className="form-control" defaultValue={notas[i].autoEvaluacion} name="ser" />
                    }

                }
                return <input onChange={(e) => {
                    const a = e.target.value
                    calificaciones.autoEvaluacion = a
                }} type="number" placeholder="0/10" required={true}  minLength={0} maxLength={100} className="form-control" name="ser" />
            }
        },
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <>
                        <button className="btn btn-outline-primary mr-3" onClick={() => registrar(params.row)}>
                            <i className="bi bi-check-circle m-0"></i>
                        </button>
                        <button className="btn btn-outline-success" onClick={() => notificacionAlWhatsapp(params.row)}>
                            <i className="bi bi-whatsapp m-0"></i>
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
                        <h2 className="productTitle">Estudiantes Inscritos</h2>
                        <Link to={`/calificaciones/add/` + id}>
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

export default ListaEstudiantes;
