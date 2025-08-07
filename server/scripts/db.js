const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',     
  user: 'root',          
  password: 'niko',  /* Qwe.123* */
  database: 'biblioteca'
});

connection.connect((err)  => {
    if(err) {
        console.log("Error en la conexion", err);
        return;
    }
    console.log("conexion exitosa a mysql")
});

module.exports = connection