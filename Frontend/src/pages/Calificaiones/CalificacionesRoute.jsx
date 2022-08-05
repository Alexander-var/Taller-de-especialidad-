import React from "react";
import { Route, Routes } from "react-router-dom";
import Agregar from "./Agregar";
import List from "./List";
import Update from "./Update";
import ListaMaterias from "./ListaMaterias";
import ListaEstudiantes from "./ListaEstudiantes";


const CalificacionesRoutes = () => {
  return (
    <>

      <Routes>
        <Route to="/" index element={<List />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/add" element={<Agregar />} />
        <Route path="/add/:id" element={<ListaMaterias />} />
        <Route path="/materia/:id" element={<ListaEstudiantes />} />
      </Routes>

    </>
  );
};

export default CalificacionesRoutes;
