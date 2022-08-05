import React from "react";
import Notification from "../../helpers/Notification";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();
    const user = document.getElementById("typeEmailX").value;
    const password = document.getElementById("typePasswordX").value;

    // Opciones por defecto estan marcadas con un *
    const response = await fetch("http://localhost:7000/api/v1/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: user,
        clave: password,
      }), // body data type must match "Content-Type" header
    });
    const dataRespuesta = await response.json();
    if (response.ok) {
      localStorage.setItem("token_colegio", dataRespuesta.token);
      console.log(dataRespuesta, response);
      Notification(response.status, { message: "Bienvenido" }, null);
      navigate("/");
      return;
    } else {
      Notification(response.status, dataRespuesta, null);
    }
  }
  return (
    <>
      <form>
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white">
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Por favor ingrese su usuario y su contraceña?
                      </p>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typeEmailX">
                          usuario
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typePasswordX">
                          contraseña
                        </label>
                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          olvido su contraseña?
                        </a>
                      </p>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        onClick={login}
                      >
                        Login
                      </button>

                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Login;
