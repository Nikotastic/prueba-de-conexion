# Proyecto de Biblioteca

Este es un proyecto full-stack que consiste en un backend con Node.js y Express que gestiona una base de datos de una biblioteca, y un frontend construido con Vite y JavaScript puro para interactuar con la API del backend.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- `/server`: Contiene todo el código del backend, incluyendo el servidor Express, la conexión a la base de datos y los endpoints de la API.
- `/client`: Contiene todo el código del frontend, construido con Vite.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [NPM](https://www.npmjs.com/)
- Un servidor de base de datos MySQL en ejecución.

## Configuración

1.  **Clona el repositorio:**

    ```bash
    git clone <https://github.com/Nikotastic/prueba-de-conexion.git>
    cd <https://github.com/Nikotastic/prueba-de-conexion.git>
    ```

2.  **Configura la base de datos:**

    -   Asegúrate de que tu servidor MySQL esté en funcionamiento.
    -   Importa el archivo `docs/base de datos biblioteca.sql` en tu base de datos para crear las tablas necesarias.
    -   Actualiza las credenciales de la base de datos en `server/scripts/db.js` si es necesario.

## Instalación y Ejecución

Debes instalar las dependencias y ejecutar el backend y el frontend por separado en dos terminales diferentes.

### Backend (`/server`)

1.  **Navega al directorio del servidor:**

    ```bash
    cd server
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Inicia el servidor:**

    ```bash
    npm start
    ```

    El servidor backend se ejecutará en `http://localhost:3000`.

### Frontend (`/client`)

1.  **Navega al directorio del cliente:**

    ```bash
    cd client
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo de Vite:**

    ```bash
    npm run dev
    ```

    El servidor de desarrollo del frontend se ejecutará en una URL proporcionada por Vite (normalmente `http://localhost:5173`).

## Dependencias

### Backend (`server/package.json`)

-   `cors`: Para habilitar las solicitudes de origen cruzado (CORS).
-   `csv-parser`: Para procesar archivos CSV (si es necesario para la carga de datos).
-   `express`: Framework web para Node.js.
-   `mysql`: Cliente de MySQL para Node.js.
-   `mysql2`: Cliente de MySQL para Node.js, compatible con `async/await`.

### Frontend (`client/package.json`)

-   `vite`: Herramienta de construcción y servidor de desarrollo rápido para aplicaciones web modernas.

## Endpoints de la API

El backend expone los siguientes endpoints para gestionar los préstamos:

-   `GET /prestamos`: Obtiene todos los préstamos.
-   `GET /prestamos/:id_prestamo`: Obtiene un préstamo por su ID.
-   `GET /prestamos/usuario/:id_usuario`: Obtiene todos los préstamos de un usuario específico.
-   `GET /prestamos/estado/activo`: Obtiene todos los préstamos con estado "activo".
-   `POST /prestamos`: Crea un nuevo préstamo.
-   `PUT /prestamos/:id_prestamo`: Actualiza un préstamo existente.
-   `DELETE /prestamos/:id_prestamo`: Elimina un préstamo.
-   `GET /libros:` Obtiene todos los libros.
-   `GET /autores:` Obtiene todos los autores.
