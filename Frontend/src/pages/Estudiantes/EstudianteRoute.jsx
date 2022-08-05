import React from "react";
import { Route, Routes } from "react-router-dom";
import Agregar from "./Agregar";
import List from "./List";
import Update from "./Update";


const EstudianteRoutes = () => {
  return (
    <>

      <Routes>
        <Route to="/" index element={<List />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/add" element={<Agregar />} />

      </Routes>

    </>
  );
};

export default EstudianteRoutes;
