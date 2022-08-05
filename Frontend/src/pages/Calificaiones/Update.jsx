import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import Peticion from "../../helpers/Peticiones";
import { useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import SelectRelationEdit from "../../components/SelectRelationEdit";

const SignupSchema = Yup.object().shape({
  nombre: Yup.string().required('El campo nombre es requerido!'),
  paralelo: Yup.string().required('El campo paralelo es requerido!'),
  nivel: Yup.string().required('El campo nivel es requerido!')
});

const Update = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const url = useLocation();
  const id = url.pathname.split("/").pop();
  let data = new Peticion(`/cursos/${id}`).getDataId();
  data = !!data && data.response;
  const navigate = useNavigate();

  const handleEnviar = (values) => {
    const misIds = selectedOptions.map(item => {
      return item.key
    })
    values.idMaterias = misIds
    new Peticion(`/cursos`).updateItem(data, values);

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
            <h3 className="titulo">Actualizar curso</h3>
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
                  paralelo: data.paralelo,
                  nivel: data.nivel,
                  estado: data.estado,
                  idMaterias: data.idMaterias
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

                    <label className="form-label">nombre</label>
                    <Field type="text" className="form-control" name="nombre" />
                    {errors.nombre && touched.nombre ? (
                      <div className="error">{errors.nombre}</div>
                    ) : null}

                    <label className="form-label">paralelo</label>
                    <Field type="text" className="form-control" name="paralelo" />
                    {errors.paralelo && touched.paralelo ? (
                      <div className="error">{errors.paralelo}</div>
                    ) : null}

                    <label className="form-label">nivel</label>
                    <Field type="text" as='select' className="form-control" name="nivel" >
                      <option value="">Seleccionar...</option>
                      <option value="Primario">Primario</option>
                      <option value="Secundario">Secundario</option>
                    </Field>
                    {errors.nivel && touched.nivel ? (
                      <div className="error">{errors.nivel}</div>
                    ) : null}

                    <label className="form-label">Materia</label>
                    <SelectRelationEdit
                      label=""
                      setSelectedOptions={setSelectedOptions}
                      selectedOptions={selectedOptions}
                      endPointCurrent="/materias/filtro?q=activo"
                      endPoint="/cursos"
                    />
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
