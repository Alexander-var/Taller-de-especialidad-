import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import Peticion from "../../helpers/Peticiones";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import SelectRelationAdd from "../../components/SelectRelationAdd";

const SignupSchema = Yup.object().shape({
  nombre: Yup.string().required('El campo nombre es requerido!'),
  paralelo: Yup.string().required('El campo paralelo es requerido!'),
  nivel: Yup.string().required('El campo nivel es requerido!'),
  // idMaterias: Yup.string().required('Debe enviar al menos una materia!')
});

const Agregar = () => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleEnviar = (values) => {
    const misIds = selectedOptions.map(item => {
      return item.key
    })
    values.idMaterias = misIds
    new Peticion("/cursos").createItem(values);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <>
      <div className="contenedor  pr-5">
        <div
          style={{ "paddingRight": "100px" }}
          className="d-flex justify-content-between"
        >
          <h3 className="titulo">Agregar curso</h3>
          <button className="productAddButton" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>

        <hr />

        <div className="medio">
          <div className="my-card-form">
            <Formik
              initialValues={{ nombre: '', paralelo: '', nivel: '', estado: true, idMaterias: [] }}
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

                  <label className="form-label">Paralelo</label>
                  <Field type="text" className="form-control" name="paralelo" />
                  {errors.paralelo && touched.paralelo ? (
                    <div className="error">{errors.paralelo}</div>
                  ) : null}

                  <label className="form-label">Nivel</label>
                  <Field type="text" as='select' className="form-control" name="nivel" >
                    <option value="">Seleccionar...</option>
                    <option value="Primario">Primario</option>
                    <option value="Secundario">Secundario</option>
                  </Field>
                  {errors.nivel && touched.nivel ? (
                    <div className="error">{errors.nivel}</div>
                  ) : null}


                  <label className="form-label">Materia</label>
                  <SelectRelationAdd
                    label="Materias"
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                    endPoint="/materias/filtro?q=activo"
                    setLoading={setLoading}
                    loading={loading}
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
    </>
  );
};

export default Agregar;
