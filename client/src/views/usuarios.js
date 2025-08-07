async function getUsuarios() {
    try {
        const res = await fetch('http://localhost:3000/usuarios');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching usuarios:', error);
        return []; // Devuelve un array vacío en caso de error
    }
}

function renderUsuariosTable(usuarios, container) {
    let tableHTML = `
        <h2>Listado de Usuarios</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Numero de Identificacion</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (usuarios.length > 0) {
        usuarios.forEach(u => {
            tableHTML += `
                <tr>
                    <td>${u.id_usuario}</td>
                    <td>${u.nombre_completo}</td>
                    <td>${u.numero_identificacion}</td>
                    <td>${u.correo}</td>
                    <td>${u.telefono}</td>
                </tr>
            `;
        });
    } else {
        tableHTML += `
            <tr>
                <td colspan="5">No hay usuarios disponibles</td>
            </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;
    container.innerHTML = tableHTML;
}

export async function usuariosDashboard(container) {
    container.innerHTML = '<p>Cargando usuarios...</p>';
    const usuarios = await getUsuarios();
    renderUsuariosTable(usuarios, container);
}
