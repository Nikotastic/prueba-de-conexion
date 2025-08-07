const fs = require('fs'); 
const path = require('path');
const csv = require('csv-parser');
const conexion = require('../scripts/db');

const archivoCSV = path.join(__dirname, '../data/prestamos.csv'); // __dirname es la ruta actual donde está el archivo .js.
fs.createReadStream(archivoCSV)
.pipe(csv()) // transforma cada línea del archivo CSV en un objeto JavaScript
.on('data', (row) => { // se ejecuta cada vez que se lee una fila 
const {id_prestamo, id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado} = row; // contiene un objeto
const sql = 'INSERT INTO prestamos (id_prestamo, id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES (?,?,?,?,?,?)';
conexion.query(sql, [id_prestamo, id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado], (err) => {
    if (err) console.log("Error al insertar datos", err);
    else 
        console.log(`Insertados los datos`);
});
})

.on('end', () => {
    console.log("Importacion completada")
});