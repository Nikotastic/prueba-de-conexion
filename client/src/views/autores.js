async function getAutores() {
    try {
        const res = await fetch('http://localhost:3000/autores');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching prestamos:', error);
        return []; // Devuelve un array vacío en caso de error
    }
}

function renderAutoresTable(autores, container) {
    let tableHTML = `
        <h2>Listado de autores</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre completo</th>

                </tr>
            </thead>
            <tbody>
    `;

    if (autores.length > 0) {
        autores.forEach(a => {
            tableHTML += `
                <tr>
                    <td>${a.id_autor}</td>
                    <td>${a.nombre_completo}</td>
                </tr>
            `;
        });
    } else {
        tableHTML += '<tr><td colspan="6">No hay préstamos para mostrar.</td></tr>';
    }

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

export async function autoresDashboard(container) {
    container.innerHTML = '<p>Cargando autores...</p>';
    const autores = await getAutores();
    renderAutoresTable(autores, container);
}
