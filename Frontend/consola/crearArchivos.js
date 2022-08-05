const fs = require("fs");
const path = require("path");
const pathAll = path.join(__dirname, "./templates2/");
const index = fs.readFileSync(`${pathAll}index.txt`, "utf-8");
const list = fs.readFileSync(`${pathAll}List.txt`, "utf-8");
const edit = fs.readFileSync(`${pathAll}Update.txt`, "utf-8");
const add = fs.readFileSync(`${pathAll}Agregar.txt`, "utf-8");

module.exports = class Crear {
  constructor(nombre, nombreFolder, endPoint, camposListado, camposRequeridos) {
    this.nombreFolder = nombreFolder;
    this.endPoint = endPoint;
    this.camposListado = camposListado;
    this.camposRequeridos = camposRequeridos;
    this.camposRequeridosasd();
    this.nombreMenu = nombre;
  }

  crearIndex() {
    const result = index.replace(/{nombreClase}/g, `${this.nombreMenu}Routes`);
    // crea el index
    fs.writeFile(
      `${this.nombreFolder}/${this.nombreMenu}Route.jsx`,
      result,
      (err) => {
        if (err) throw err;
      }
    );
  }

  crearList() {
    let campos = this.camposListado.map((campo) => {
      const header = campo[0].toUpperCase() + campo.slice(1);
      return `{ field: "${campo}", headerName: "${header}", width: 100 }`;
    });

    let resultlist = list.replace(/{endpoint}/g, this.endPoint);
    resultlist = resultlist.replace(/{campos}/g, campos);
    resultlist = resultlist.replace(
        /{form}/g,
        `${this.nombreMenu.toLowerCase()}`
      );
    fs.writeFile(`${this.nombreFolder}/List.jsx`, resultlist, (err) => {
      if (err) throw err;
    });
  }

  // *  Generamos Campos Requerido
  camposRequeridosasd() {
    this.camposRequeridos = this.camposRequeridos.split(",");
    this.camposRequeridos = this.camposRequeridos.map((camR) => {
      return `${camR}: Yup.string().required('El campo ${camR} es requerido!')`;
    });
  }

  crearEdit() {
    let resultUpdate = edit.replace(
      /{camposRequeridos}/g,
      this.camposRequeridos
    );
    resultUpdate = resultUpdate.replace(/{endpoint}/g, this.endPoint);

    let valoresIniciales = this.camposListado.map((campo) => {
      return `${campo}: data.${campo}`;
    });

    resultUpdate = resultUpdate.replace(/{initialValue}/g, valoresIniciales);

    const formularioCampos = this.generarFormularios();
    resultUpdate = resultUpdate.replace(/{formCampos}/g, formularioCampos);

    resultUpdate = resultUpdate.replace(
      /{form}/g,
      `${this.nombreMenu.toLowerCase()}`
    );

    fs.writeFile(`${this.nombreFolder}/Update.jsx`, resultUpdate, (err) => {
      if (err) throw err;
      console.log("The file was succesfully saved!");
    });
  }

  crearAdd() {
    const formularioCampos = this.generarFormularios();
    let resultCreate = add.replace(
      /{camposRequeridos}/g,
      this.camposRequeridos
    );

    resultCreate = resultCreate.replace(/{endpoint}/g, this.endPoint);
    resultCreate = resultCreate.replace(/{formCampos}/g, formularioCampos);

    resultCreate = resultCreate.replace(
      /{form}/g,
      `${this.nombreMenu.toLowerCase()}`
    );

    let iniciales = this.camposListado.map((campo) => {
      return `${campo}: ''`;
    });

    resultCreate = resultCreate.replace(/{inicialValue}/g, iniciales);

    fs.writeFile(`${this.nombreFolder}/Agregar.jsx`, resultCreate, (err) => {
      if (err) throw err;
      console.log("Los archivos se creador presione Enter!");
    });
  }

  generarFormularios() {
    let formularioCampos = ``;
    this.camposListado.forEach((campo) => {
      formularioCampos += `<label className="form-label">${campo}</label>
                    <Field type="text" className="form-control" name="${campo}" />
                    {errors.${campo} && touched.${campo} ? (
                      <div className="error">{errors.${campo}}</div>
                    ) : null}\n`;
    });
    return formularioCampos;
  }

  main() {
    this.crearIndex();
    this.crearList();
    this.crearEdit();
    this.crearAdd();
  }
};
