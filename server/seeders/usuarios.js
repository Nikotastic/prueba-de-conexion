const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const conexion = require ('../scripts/db');

const archivoCSV = path.join(__dirname, '../data/usuarios.csv');
fs.createReadStream(archivoCSV)
.pipe(csv())
.on('data', (row) => {
    const {id_usuario, nombre_completo, numero_identificacion, correo, telefono} = row;
    const sql = 'INSERT INTO usuarios (id_usuario, nombre_completo, numero_identificacion, correo, telefono) VALUES (?,?,?,?,?)';
    conexion.query(sql, [id_usuario, nombre_completo, numero_identificacion, correo, telefono], (err) => {
    if (err) console.log("Error al insertar datos", err);
    else 
        console.log(`Insertado: ${nombre_completo}`);
    })
})

.on('end', () => {
    console.log("Importacion completada")
});