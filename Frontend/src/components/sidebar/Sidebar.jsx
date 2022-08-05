import "./sidebar.css";


import { NavLink } from "react-router-dom";
import Peticion from "../../helpers/Peticiones";
export default function Sidebar() {
  const data = new Peticion("/principal").getData();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">

            {!!data &&
              Object.values(data).map((item) => {
                if (item.Modulo.seccion === 'Principal') {
                  console.log(item.Modulo.seccion)
                  const url = item.Modulo.url.split("/").pop();
                  return (
                    <NavLink
                      key={item.id}
                      to={`/${url}`}
                      className={({ isActive }) => {
                        // console.log(isActive);
                        return isActive ? "link active" : "link";
                      }}
                    >
                      <li className="sidebarListItem">
                        <i className={item.Modulo.icono}></i>
                        {item.Modulo.nombre}
                      </li>
                    </NavLink>
                  );
                }
              })}
          </ul>
        </div>


        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Gestion de Incripciones</h3>
          <ul className="sidebarList">

            {!!data &&
              Object.values(data).map((item) => {
                if (item.Modulo.seccion === 'Personas') {
                  console.log(item.Modulo.seccion)
                  const url = item.Modulo.url.split("/").pop();
                  return (
                    <NavLink
                      key={item.id}
                      to={`/${url}`}
                      className={({ isActive }) => {
                        // console.log(isActive);
                        return isActive ? "link active" : "link";
                      }}
                    >
                      <li className="sidebarListItem">
                        <i className={item.Modulo.icono}></i>
                        {item.Modulo.nombre}
                      </li>
                    </NavLink>
                  );
                }
              })}
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Gestion de Colegio</h3>
          <ul className="sidebarList">

            {!!data &&
              Object.values(data).map((item) => {
                if (item.Modulo.seccion === 'Colegio') {
                  console.log(item.Modulo.seccion)
                  const url = item.Modulo.url.split("/").pop();
                  return (
                    <NavLink
                      key={item.id}
                      to={`/${url}`}
                      className={({ isActive }) => {
                        // console.log(isActive);
                        return isActive ? "link active" : "link";
                      }}
                    >
                      <li className="sidebarListItem">
                        <i className={item.Modulo.icono}></i>
                        {item.Modulo.nombre}
                      </li>
                    </NavLink>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
