import { Formik, Field, Form } from "formik";
import React from "react";
import Peticion from "../../helpers/Peticiones";
import { useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  nombre: Yup.string().required('El campo nombre es requerido!'),
  // apellidoPaterno: Yup.string().required('El campo apellidoPaterno es requerido!'),
  // apellidoMaterno: Yup.string().required('El campo apellidoMaterno es requerido!'),
  sexo: Yup.string().required('El campo sexo es requerido!'),
  correo: Yup.string().required('El campo correo es requerido!'),
  fechaNacimiento: Yup.string().required('El campo fechaNacimiento es requerido!'),
  telefono: Yup.string().required('El campo telefono es requerido!'),

});

const Update = () => {
  const url = useLocation();
  const id = url.pathname.split("/").pop();
  let data = new Peticion(`/tutores/${id}`).getDataId();
  data = !!data && data.response;
  const navigate = useNavigate();
  const handleEnviar = (values) => {
    new Peticion(`/tutores`).updateItem(data, values);
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
            <h3 className="titulo">Actualizar Tutor</h3>
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
                  apellidoPaterno: data.apellidoPaterno,
                  apellidoMaterno: data.apellidoMaterno,
                  sexo: data.sexo,
                  correo: data.correo,
                  fechaNacimiento: data.fechaNacimiento,
                  direccion:data.direccion,
                  telefono:data.telefono,
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
                  <Field type="text" className="form-control" name="nombre" />
                  {errors.nombre && touched.nombre ? (
                    <div className="error">{errors.nombre}</div>
                  ) : null}

                  <label className="form-label">ApellidoPaterno</label>
                  <Field type="text" className="form-control" name="apellidoPaterno" />
                  {errors.apellidoPaterno && touched.apellidoPaterno ? (
                    <div className="error">{errors.apellidoPaterno}</div>
                  ) : null}

                  <label className="form-label">Apellido Materno</label>
                  <Field type="text" className="form-control" name="apellidoMaterno" />
                  {errors.apellidoMaterno && touched.apellidoMaterno ? (
                    <div className="error">{errors.apellidoMaterno}</div>
                  ) : null}

                  <label className="form-label">Sexo</label>
                  <Field type="text" className="form-control" as="select" name="sexo" >
                    <option value="">
                      Seleccionar...
                    </option>
                    <option value="Masculino">
                      Masculino
                    </option>
                    <option value="Femenino">
                      Femenino
                    </option>
                  </Field>
                  {errors.sexo && touched.sexo ? (
                    <div className="error">{errors.sexo}</div>
                  ) : null}

                  <label className="form-label">Correo</label>
                  <Field type="email" className="form-control" name="correo" />
                  {errors.correo && touched.correo ? (
                    <div className="error">{errors.correo}</div>
                  ) : null}

                  <label className="form-label">fechaNacimiento</label>
                  <Field type="date" className="form-control" name="fechaNacimiento" />
                  {errors.fechaNacimiento && touched.fechaNacimiento ? (
                    <div className="error">{errors.fechaNacimiento}</div>
                  ) : null}


                  <label className="form-label">Direccion</label>
                  <Field type="text" className="form-control" name="direccion" />
                  {errors.direccion && touched.direccion ? (
                    <div className="error">{errors.direccion}</div>
                  ) : null}

                  <label className="form-label">Telefono:</label>
                  <Field type="text" className="form-control" name="telefono" />
                  {errors.telefono && touched.telefono ? (
                    <div className="error">{errors.telefono}</div>
                  ) : null}


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
