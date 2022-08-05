/*eslint-disable */
const fs = require("fs");
const path = require("path");

const { inquireMenu, pausa, leerInput } = require("./helpers/inquirer");

const Crear = require("./crearArchivos");

console.clear();
const main = async () => {
  let opt = "";

  do {
    // imprimir el menu***
    opt = await inquireMenu();

    switch (opt) {
      case "1":
        // TODO: solicitar Datos
        const nombre = await leerInput("Nombre carpeta:");
        const nombrePath = path.join(__dirname, "../src/pages/", nombre);
        const endPoint = await leerInput("End Point:");
        let camposListado = await leerInput("Campos Listado:");
        camposListado = camposListado.split(",");
        let camposRequeridos = await leerInput("Campos Requeridos:");

        const crear = new Crear(
          nombre,
          nombrePath,
          endPoint,
          camposListado,
          camposRequeridos
        );
        // TODO: Creamos la carpeta
        fs.mkdirSync(`${nombrePath}`, { recursive: true });
        crear.main();

        // const pathRutas = path.join(__dirname, '../src/constants/menu.js')
        // const menu = fs.readFileSync(pathRutas, 'utf8')
        // let result = menu.replace(
        //   '// rutas',
        //   ",{ iconImage: 'Pruebas',\n  label: 'menu." +
        //     nombre +
        //     "', \n  to: `${adminRoot}/config-two/" +
        //     nombre +
        //     '`} \n\n // rutas'
        // )
        // fs.writeFileSync(pathRutas, result)

        break;
    }

    await pausa();
  } while (opt !== "0");
};

main();
