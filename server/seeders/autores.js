const fs = require('fs'); // módulo nativo de Node.js para leer archivos.
const path = require('path');
const csv = require('csv-parser');
const conexion = require('../scripts/db'); // convierte el contenido del archivo .csv en objetos JavaScript.



const archivoCSV = path.join(__dirname, '../data/autores.csv'); // __dirname es la ruta actual donde está el archivo .js.
fs.createReadStream(archivoCSV)
.pipe(csv()) // transforma cada línea del archivo CSV en un objeto JavaScript
.on('data', (row) => { // se ejecuta cada vez que se lee una fila 
const {id_autor, nombre_completo} = row; // contiene un objeto
const sql = 'INSERT INTO autores (id_autor, nombre_completo) VALUES (?,?)';
conexion.query(sql, [id_autor, nombre_completo], (err) => {
    if (err) console.log("Error al insertar datos", err);
    else 
        console.log(`Insertado: ${nombre_completo}`);
});
})

.on('end', () => {
    console.log("Importacion completada")
});