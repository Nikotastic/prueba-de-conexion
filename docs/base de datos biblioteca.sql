-- 1. Crear la base de datos
CREATE DATABASE biblioteca;
USE biblioteca;



-- 2. Tabla: Usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    numero_identificacion VARCHAR(255) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Tabla: Autores
CREATE TABLE autores (
    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Tabla: Libros
CREATE TABLE libros (
    isbn VARCHAR(30) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    anio_publicacion YEAR NOT NULL,
    id_autor INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor)
    ON UPDATE CASCADE 
    ON DELETE SET NULL
);

-- 5. Tabla: Prestamos
CREATE TABLE prestamos (
    id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    isbn VARCHAR(30),
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    estado ENUM('entregado', 'retrasado', 'activo') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON UPDATE CASCADE 
    ON DELETE SET NULL,
    FOREIGN KEY (isbn) REFERENCES libros(isbn)
    ON UPDATE CASCADE 
    ON DELETE SET NULL
);

select * from autores;
select * from usuarios;
select * from libros;


