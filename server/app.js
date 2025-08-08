const express = require('express');
const app = express()
const db = require('./scripts/db');
const cors = require('cors');

app.use(cors()); // Habilita que el frontend pueda hacer peticiones
app.use(express.json());


// GET PRESTAMOS
app.get('/prestamos', (req, res) => {
  db.query('SELECT * FROM prestamos', (err, datas) => {
    if(err){
      console.log("Error al hacer la consulta", err)
      res.status(500).json({error: 'Error en el servidor'})
      return;
    
    }
    res.json(datas)
  })
})



// GET PRESTAMOS POR ID
app.get('/prestamos/:id_prestamo', (req, res) => {
  const { id_prestamo } = req.params;

  db.query('SELECT * FROM prestamos WHERE id_prestamo = ?', [id_prestamo], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar el préstamo' });
    }

    if (data.length === 0) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }

    res.json({
      mensaje: 'Préstamo encontrado',
      data
    });
  });
});


// CREAR PRESTAMO
app.post('/prestamos', (req, res) => {
  const {id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado} = req.body;
  db.query('INSERT INTO prestamos (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) VALUES (?, ?, ?, ?, ?)', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el préstamo' });
    }
    res.json({
      mensaje: 'Préstamo creado',
      data
    });
  })
})

// ACTUALIZAR PRESTAMO
app.put('/prestamos/:id_prestamo', (req, res) => {
  const {id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado} = req.body;
  const {id_prestamo} = req.params;
  db.query('UPDATE prestamos SET id_usuario = ?, isbn = ?, fecha_prestamo = ?, fecha_devolucion = ?, estado = ? WHERE id_prestamo = ?', [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado, id_prestamo], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el préstamo' });
    }
    res.json({
      mensaje: 'Préstamo actualizado',
      data
    });
  })
})


// DELETE PRESTAMO
app.delete('/prestamos/:id_prestamo', (req, res) => {
  const { id_prestamo } = req.params;
  db.query('DELETE FROM prestamos WHERE id_prestamo = ?', [id_prestamo], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el préstamo' });
    }

    if (data.length === 0) {
      return res.status(404).json({ mensaje: 'Préstamo no encontrado' });
    }

    res.json({
      mensaje: 'Préstamo eliminado',
      data
    });
  });
});


// GET PRESTAMOS POR ID USUARIO
app.get('/prestamos/usuario/:id_usuario', (req, res) => {
  const {id_usuario} = req.params;
  db.query('SELECT * FROM prestamos WHERE id_usuario = ?', [id_usuario], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar el préstamo' });
    }
    res.json({
      mensaje: 'Préstamo encontrado',
      data
    });
  })
})

// GET PRESTAMOS ACTIVOS
app.get('/prestamos/estado/activo', (req, res) => {
  db.query('SELECT * FROM prestamos WHERE estado = ?', ['activo'], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los préstamos activos' });
    }
    res.json({
      mensaje: 'Préstamos activos',
      data
    });
  });
});

// GET USUARIOS
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los usuarios' });
    }
     res.json(data)
  });
});

//GET LIBROS
app.get ('/libros', (req, res) => {
  db.query('SELECT * FROM libros', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los libros' });
    }
    res.json(data)
  })
})

// GET AUTORES
app.get ('/autores', (req, res) => {
  db.query('SELECT * FROM autores', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los autores' });
    }
    res.json(data)
  })
})

// GET LIBROS MAS PRESTADOS 
app.get('/libros/prestados', (req, res) => {
  db.query('SELECT libros.titulo, COUNT(prestamos.id_prestamo) AS total_prestados FROM libros JOIN prestamos ON libros.isbn = prestamos.isbn GROUP BY libros.titulo ORDER BY total_prestados DESC LIMIT 5', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los libros más prestados' });
    }
    res.json(data)
  })
})

// GET USUARIOS PRESTAMOS RETRASADOS
app.get('/usuarios/prestamos/retrasados', (req, res) => {
  db.query('SELECT usuarios.nombre_completo, COUNT(prestamos.id_prestamo) AS total_retrasados FROM usuarios JOIN prestamos ON usuarios.id_usuario = prestamos.id_usuario WHERE prestamos.estado = "retrasado" GROUP BY usuarios.nombre_completo', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar los usuarios con préstamos retrasados' });
    }
    res.json(data)
  })
})

// GET HISTORIAL DE LIBRO POR ISBN
app.get('/libros/historial/:isbn', (req, res) => {
  const {isbn} = req.params;
  db.query('SELECT * FROM historial WHERE isbn = ?', [isbn], (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar el historial del libro' });
    }
    res.json(data)
  })
})

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});