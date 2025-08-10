const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

// Configura dotenv para cargar el archivo .env desde el directorio raíz
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

connection.connect((err)  => {
    if(err) {
        console.log("Error en la conexion", err);
        return;
    }
    console.log("conexion exitosa a mysql")
});

module.exports = connection