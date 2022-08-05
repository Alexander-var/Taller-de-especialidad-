// Clase para realizar las peticiones
import { useEffect, useState } from "react";
import Notification from "./Notification";

class Peticion {
  /* eslint-disable */
  constructor(baseUrl) {
    this.baseUrl = "http://localhost:7000/api/v1" + baseUrl;
    // this.token = localStorage.getItem("token");
    this.token = localStorage.getItem("token_colegio");
  }

  //   * Funcion para traer los datos de un endpoint
  getData(change, history) {
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetchAPI = async () => {
        try {
          const res = await fetch(this.baseUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          const dat = await res.json();
          if (res.status === 200) setData(dat);
          else console.log("Notificacion");
        } catch (error) {
          console.log(error);
        }
      };
      fetchAPI();
    }, [change]);
    return data;
  }

  getDataId(history) {
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetchAPI = async () => {
        try {
          const res = await fetch(this.baseUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          const dat = await res.json();
          if (res.status === 200) setData(dat);
          else Notification(res.status, dat, history);
          setData(dat);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAPI();
    }, []);
    return data;
  }

  //   * Funcion para crear un item
  createItem(datos = { name: "Usuario nuevo", code: "COD-1" }, history) {
    const fetchAPI = async () => {
      try {
        const res = await fetch(this.baseUrl, {
          method: "POST",
          body: JSON.stringify(datos),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        const message = await res.json();
        Notification(res.status, message, null);
      } catch (error) {
        Notification(500, { message: "Error in Connection" });
      }
    };
    fetchAPI();
  }

  //   * Funcion para crear un item con imagen
  createItemWithImage(datos = {}, history) {
    const fetchAPI = async () => {
      try {
        const res = await fetch(this.baseUrl, {
          method: "POST",
          body: datos,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        const message = await res.json();
        Notification(res.status, message, history);
      } catch (error) {
        Notification(500, { message: "Error in Connection" });
      }
    };
    fetchAPI();
  }
  //   * Funcion para editar un item con imagen
  updateItemWithImage(item = null, datos = {}, history) {
    const fetchAPI = async () => {
      try {
        const res = await fetch(
          this.baseUrl + (item !== null ? `/${item.id}` : ""),
          {
            method: "PUT",
            body: datos,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const message = await res.json();
        Notification(res.status, message, history);
        location.reload()
      } catch (error) {
        Notification(500, { message: "Error in Connection" });
      }
    };
    fetchAPI();
  }

  //  * Funcion para actualizar el item por ID
  updateItem(
    item = null,
    datos = { name: "Nombre Actualizado", code: "Codigo actualizado" },
    history
  ) {
    const fetchAPI = async () => {
      try {
        const res = await fetch(
          this.baseUrl + (item !== null ? `/${item.id}` : ""),
          {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        const message = await res.json();
        Notification(res.status, message, history);
      } catch (error) {
        Notification(500, { message: "Error in Connection" });
      }
    };
    fetchAPI();
  }

  //   * Funcion para eliminar un item por ID
  deleteItem(id) {
    const fetchAPI = async () => {
      try {
        const res = await fetch(this.baseUrl + `/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        const message = await res.json();
        Notification(res.status, message);
      } catch (error) {
        Notification(500, { message: "Error in Connection" });
      }
    };
    fetchAPI();
  }

  // * Funcion para obtener imagen por ID
  getImageID(history) {
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetchAPI = async () => {
        try {
          const res = await fetch(this.baseUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          const dat = await res.json();
          if (res.status === 200) setData(`data:image/jpg;base64,${dat.base}`);
          else Notification(res.status, dat, history);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAPI();
    }, []);
    return data;
  }
}

export default Peticion;
