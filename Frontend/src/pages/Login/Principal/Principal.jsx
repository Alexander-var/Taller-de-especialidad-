import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import Home from "../../home/Home";
import Product from "../../product/Product";
import ProductList from "../../productList/ProductList";
import MateriaRoutes from "../../materias/MateriaRoutes";
import CursoRoutes from "../../Curso/CursoRoute";
import ProfesorRoutes from "../../Profesor/ProfesorRoute";
import EstudianteRoutes from "../../Estudiantes/EstudianteRoute";
import TutoresRoutes from "../../Tutor/TutorRoute";
import CalificacionesRoutes from "../../Calificaiones/CalificacionesRoute";
const Principal = () => {
  return (
    <>
      <Topbar />
      <div className="row m-0 p-0">
        <div className="col-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/materias/*" element={<MateriaRoutes />} />
            <Route path="/cursos/*" element={<CursoRoutes />} />
            <Route path="/profesores/*" element={<ProfesorRoutes />} />
            <Route path="/estudiantes/*" element={<EstudianteRoutes />} />
            <Route path="/tutores/*" element={<TutoresRoutes />} />
            <Route path="/calificaciones/*" element={<CalificacionesRoutes />} />


            <Route path="/products" element={<ProductList />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Principal;
