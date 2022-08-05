import { Formik, Form, Field } from "formik";
import React from "react";
import Peticion from "../../helpers/Peticiones";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  nombre: Yup.string().required('El campo nombre es requerido!'),
  apellidoPaterno: Yup.string().required('El campo apellidoPaterno es requerido!'),
  apellidoMaterno: Yup.string().required('El campo apellidoMaterno es requerido!'),
  sexo: Yup.string().required('El campo sexo es requerido!'),
  correo: Yup.string().required('El campo correo es requerido!'),
  fechaNacimiento: Yup.string().required('El campo fechaNacimiento es requerido!'),
  rude: Yup.string().required('El campo Rude es requerido!')
});

const Agregar = () => {

  const dataTutor = new Peticion('/tutores').getDataId()
  const dataCursos = new Peticion('/cursos').getDataId()
  const navigate = useNavigate();
  const handleEnviar = (values) => {
    values.rol = 3
    values.usuario = values.rude
    values.clave = values.rude
    new Peticion("/auth/signUp").createItem(values);
    setTimeout(() => {
      navigate('/estudiantes');
    }, 1000);
  };

  return (
    <>
      <div className="contenedor  pr-5">
        <div
          style={{ "paddingRight": "100px" }}
          className="d-flex justify-content-between"
        >
          <h3 className="titulo">Agregar Estudiantes</h3>
          <button className="productAddButton" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>

        <hr />

        <div className="medio">
          <div className="my-card-form">
            <Formik
              initialValues={{
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                sexo: '',
                correo: '',
                fechaNacimiento: '',
                rude: '',
                idTutor: '',
                direccion: '',
                telefono: '',
                idCurso: ''
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

                  <label className="form-label">Rude</label>
                  <Field type="text" className="form-control" name="rude" />
                  {errors.rude && touched.rude ? (
                    <div className="error">{errors.rude}</div>
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


                  <label className="form-label">Tutor</label>
                  <Field type="text" as="select" className="form-control" name="idTutor" >
                    <option value=''>Seleccionar...</option>
                    {!!dataTutor && Object.values(dataTutor.response).map(tutor => {
                      return (
                        <option key={tutor.id.toString()} value={tutor.id}>{tutor.nombre}</option>
                      )
                    })
                    }
                  </Field>

                  <label className="form-label">Curso</label>
                  <Field type="text" as="select" className="form-control" name="idCurso" >
                    <option value=''>Seleccionar...</option>
                    {!!dataCursos && Object.values(dataCursos.response).map(curso => {
                      return (
                        <option key={curso.id.toString()} value={curso.id}>{curso.nombre}</option>
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
    </>
  );
};

export default Agregar;
