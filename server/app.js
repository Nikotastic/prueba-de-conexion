const express = require('express');
const app = express()
const db = require('./scripts/db');
const cors = require('cors');

const sendError = (res, req, message, statusCode = 500) => {
  res.status(statusCode).json({
    status: 'error',
    endpoint: req.originalUrl,
    method: req.method,
    message: message
  });
};

app.use(cors()); // Habilita que el frontend pueda hacer peticiones
app.use(express.json());

/************* */
/* PRESTAMOS */
/************* */
app.get('/prestamos', (req, res) => {
  db.query('SELECT p.*, u.nombre_completo FROM prestamos as p JOIN usuarios as u ON p.id_usuario = u.id_usuario; ', (err, datas) => {
    if(err){
      console.log("Error al hacer la consulta", err)
      sendError(res, req, 'Error en el servidor');
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
      return sendError(res, req, 'Error al buscar el préstamo');
    }

    if (data.length === 0) {
      return sendError(res, req, 'Préstamo no encontrado', 404);
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
      return sendError(res, req, 'Error al crear el préstamo');
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
      return sendError(res, req, 'Error al actualizar el préstamo');
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
      return sendError(res, req, 'Error al eliminar el préstamo');
    }

    if (data.length === 0) {
      return sendError(res, req, 'Préstamo no encontrado', 404);
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
      return sendError(res, req, 'Error al buscar el préstamo');
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
      return sendError(res, req, 'Error al buscar los préstamos activos');
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
      return sendError(res, req, 'Error al buscar los usuarios');
    }
     res.json(data)
  });
});

// CREAR USUARIO
app.post('/usuarios', (req, res) => {
  const {id_usuario, nombre_completo, numero_identificacion, correo, telefono} = req.body;
  db.query('INSERT INTO usuarios (id_usuario, nombre_completo, numero_identificacion, correo, telefono) VALUES (?, ?, ?, ?, ?)', [id_usuario, nombre_completo, numero_identificacion, correo, telefono], (err, data) => {
    if (err) {
      return sendError(res, req, 'Error al crear el usuario');
    }
    res.json({
      mensaje: 'Usuario creado',
    });
  })
})

// UPDATE USUARIO
app.put('/usuarios/:id_usuario', (req, res) => {  
  const {nombre_completo, numero_identificacion, correo, telefono} = req.body;
  const {id_usuario} = req.params;
  db.query('UPDATE usuarios SET nombre_completo = ?, numero_identificacion = ?, correo = ?, telefono = ? WHERE id_usuario = ?', [nombre_completo, numero_identificacion, correo, telefono, id_usuario], (err, data) => {
    if (err) {
      return sendError(res, req, 'Error al actualizar el usuario');
    } 
    res.json({
      mensaje: 'Usuario actualizado',
      data
    })
  })
})

// DELETE USUARIO
app.delete('/usuarios/:id_usuario', (req,res) => {
  const {id_usuario} = req.params;
  db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, data) => {
    if (err) {
      return sendError(res, req, 'Error al eliminar el usuario');
    } 
    res.json({
      mensaje: 'Usuario eliminado',
      data
    })
  })
})

//GET LIBROS
app.get ('/libros', (req, res) => {
  db.query('SELECT l. *, a.nombre_completo FROM libros as l JOIN autores as a ON l.id_autor = a.id_autor', (err, data) => {
    if (err) {
      return sendError(res, req, 'Error al buscar los libros');
    }
    res.json(data)
  })
})


// GET AUTORES
app.get ('/autores', (req, res) => {
  db.query('SELECT * FROM autores', (err, data) => {
    if (err) {
      return sendError(res, req, 'Error al buscar los autores');
    }
    res.json(data)
  })
})

// GET LIBROS MAS PRESTADOS 
app.get('/libros/prestados', (req, res) => {
  db.query('SELECT libros.titulo, COUNT(prestamos.id_prestamo) AS total_prestados FROM libros JOIN prestamos ON libros.isbn = prestamos.isbn GROUP BY libros.titulo ORDER BY total_prestados DESC LIMIT 5', (err, data) => {
    if (err) {
      return sendError(res, req, 'Error al buscar los libros más prestados');
    }
    res.json(data)
  })
})

// GET USUARIOS PRESTAMOS RETRASADOS
app.get('/usuarios/prestamos/retrasados', (req, res) => {
  db.query('SELECT usuarios.nombre_completo, COUNT(prestamos.id_prestamo) AS total_retrasados FROM usuarios JOIN prestamos ON usuarios.id_usuario = prestamos.id_usuario WHERE prestamos.estado = "retrasado" GROUP BY usuarios.nombre_completo', (err, data) => {
    if (err) {
      return sendError(res, req, 'Error al buscar los usuarios con préstamos retrasados');
    }
    res.json(data)
  })
})

// GET HISTORIAL DE LIBRO POR ISBN
app.get('/libros/historial/:isbn', (req, res) => {
  const { isbn } = req.params;
  
  db.query(
    `SELECT libros.titulo, COUNT(prestamos.id_prestamo) AS total_prestados 
     FROM libros 
     JOIN prestamos ON libros.isbn = prestamos.isbn 
     WHERE libros.isbn = ?
     GROUP BY libros.titulo`, 
    [isbn], 
    (err, data) => {
      if (err) {
        return sendError(res, req, 'Error al buscar el historial del libro');
      }
      res.json(data);
    }
  );
});


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});