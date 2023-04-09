const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    this.ipServer();

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }

  ipServer() {
    var os = require("os");
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      var alias = 0;
      ifaces[dev].forEach(function (details) {
        if (details.family == "IPv4") {
          console.log(dev + (alias ? ":" + alias : ""), details.address);
          ++alias;
        }
      });
    }
  }
}

module.exports = Server;
