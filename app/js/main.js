// Usar fetch para consultar la API de usuarios
fetch('http://localhost:3000/usuarios')
  .then(response => response.json())
  .then(data => {
    const lista = document.getElementById('usuarios');
    data.forEach(usuario => {
      const item = document.createElement('li');
      item.textContent = `${usuario.nombre} - ${usuario.correo}`;
      lista.appendChild(item);
    });
  })
  .catch(error => {
    console.error('Error al obtener los usuarios:', error);
  });
