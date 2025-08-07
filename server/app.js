const express = require('express');
const app = express()
const db = require('./scripts/db');
const cors = require('cors');

app.use(cors()); // Habilita que el frontend pueda hacer peticiones
app.use(express.json());


// GET GENERAL 
app.get('/prestamos', (req, res) => {
  db.query('SELECT * FROM prestamos', (err, results) => {
    if(err){
      console.log("Error al hacer la consulta", err)
      res.status(500).json({error: 'Error en el servidor'})
      return;
    
    }
    res.json(results)
  })
})

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

// GET POR ID

app.get('/prestamos/:id_prestamo', (req, res) => {
  const { id_prestamo } = req.params;

  db.query('SELECT * FROM prestamos WHERE id_prestamo = ?', [id_prestamo], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar el préstamo' });
    }

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }

    res.json({
      mensaje: 'Préstamo encontrado',
      result
    });
  });
});


// crear un nuevo prestamo
app.post('/prestamos', (req, res) => {
  const {id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado} = req.body;
  db.query('INSERT INTO prestamos (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES (?, ?, ?, ?, ?)', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el préstamo' });
    }
    res.json({
      mensaje: 'Préstamo creado',
      result
    });
  })
})

// actualizar un prestamo 
app.put('/prestamos/:id_prestamo', (req, res) => {
  const {id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado} = req.body;
  const {id_prestamo} = req.params;
  db.query('UPDATE prestamos SET id_usuario = ?, isbn = ?, fecha_prestamo = ?, fecha_devolucion = ?, estado = ? WHERE id_prestamo = ?', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado, id_prestamo], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el préstamo' });
    }
    res.json({
      mensaje: 'Préstamo actualizado',
      result
    });
  })
})


// eliminar un prestamo 
app.delete('/prestamos/:id_prestamo', (req, res) => {
  const { id_prestamo } = req.params;
  db.query('DELETE FROM prestamos WHERE id_prestamo = ?', [id_prestamo], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el préstamo' });
    }

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }

    res.json({
      mensaje: 'Préstamo eliminado',
      result
    });
  });
});


// GET POR ID USUARIO
app.get('/prestamos/usuario/:id_usuario', (req, res) => {
  const {id_usuario} = req.params;
  db.query('SELECT * FROM prestamos WHERE id_usuario = ?', [id_usuario], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar el préstamo' });
    }
    res.json({
      mensaje: 'Préstamo encontrado',
      result
    });
  })
})

// GET prestamos ACTIVOS
app.get('/prestamos/estado/activo', (req, res) => {
  db.query('SELECT * FROM prestamos WHERE estado = ?', ['activo'], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los préstamos activos' });
    }
    res.json({
      mensaje: 'Préstamos activos',
      result
    });
  });
});

// GET usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los usuarios' });
    }
     res.json(result)
  });
});

//GET ibros 
app.get ('/libros', (req, res) => {
  db.query('SELECT * FROM libros', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los libros' });
    }
    res.json(result)
  })
})

// GET autores
app.get ('/autores', (req, res) => {
  db.query('SELECT * FROM autores', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los autores' });
    }
    res.json(result)
  })
})