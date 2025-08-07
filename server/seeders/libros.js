const fs = require('fs');
const path = require('path');
const csv = require ('csv-parser');
const conexion = require('../scripts/db');


const archivoCSV = path.join(__dirname, '../data/libros.csv');
fs.createReadStream(archivoCSV)
.pipe(csv())
.on('data', (row) => {
    const {isbn, titulo, anio_publicacion, id_autor} = row;
    const sql = 'INSERT INTO libros (isbn, titulo, anio_publicacion, id_autor) VALUES (?,?,?,?)';
    conexion.query(sql,[isbn, titulo, anio_publicacion, id_autor], (err) => {
        if (err) console.log("Error al insertar datos", err);
    else 
        console.log(`Insertado: ${titulo}`);
    })
})

.on('end', () => {
    console.log("Importacion completada")
});