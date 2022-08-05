import { Formik, Field, Form } from "formik";
import React from "react";
import Peticion from "../../helpers/Peticiones";
import { useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  nombre: Yup.string().required(" El nombre es Requerido"),
  sigla: Yup.string().required("La sigla es Requerdia"),
  idProfesor: Yup.string().required("El profesor es Requerdio"),
});

const Update = () => {
  const url = useLocation();
  const id = url.pathname.split("/").pop();
  let data = new Peticion(`/materias/${id}`).getDataId();
  const dataProfes = new Peticion("/profesores").getData();

  data = !!data && data.response;
  const navigate = useNavigate();

  const handleEnviar = (values) => {
    new Peticion(`/materias`).updateItem(data, values);

    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <>
      {data ? (
        <div className="contenedor">
          <div
            style={{ "paddingRight": "100px" }}
            className="d-flex justify-content-between"
          >
            <h3 className="titulo">Actualizar Materia</h3>
            <button className="productAddButton" onClick={() => navigate(-1)}>
              Cancelar
            </button>
          </div>
          <hr />
          <div className="medio">
            <div className="my-card-form">
              <Formik
                initialValues={{
                  nombre: data.nombre,
                  sigla: data.sigla,
                  idProfesor: data.idProfesor,
                  estado: data.estado,
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => handleEnviar(values)}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-end">
                      <div className="form-check form-switch ">
                        <Field
                          style={{ width: "60px", height: "30px", color: "" }}
                          type="checkbox"
                          className="form-check-input"
                          name="estado"
                        />
                      </div>
                    </div>

                    <label className="form-label">Nombre</label>

                    <Field
                      type="nombre"
                      className="form-control"
                      name="nombre"
                    />
                    {errors.nombre && touched.nombre ? (
                      <div className="error">{errors.nombre}</div>
                    ) : null}

                    <label className="form-label">Sigla</label>
                    <Field type="sigla" className="form-control" name="sigla" />
                    {errors.sigla && touched.sigla ? (
                      <div className="error">{errors.sigla}</div>
                    ) : null}


                    <label className="form-label">Profesor</label>
                    <Field type="idProfesor" as="select" className="form-control" name="idProfesor" >
                      <option value=''>Seleccionar...</option>
                      {!!dataProfes && Object.values(dataProfes.response).map(profe => {
                        return (
                          <>
                            <option key={profe.id.toString()} value={profe.id}>{profe.nombre}</option>
                          </>
                        )
                      })
                      }

                    </Field>

                    <button
                      type="submit"
                      className="productAddButton btnAgregar"
                      disabled={isSubmitting}
                    >
                      Registrar
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <div>Cargando..</div>
      )}
    </>
  );
};

export default Update;
