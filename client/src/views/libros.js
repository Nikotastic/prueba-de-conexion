async function getLibros() {
    try {
        const res = await fetch('http://localhost:3000/libros');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching libros:', error);
        return []; // Devuelve un array vacío en caso de error
    }
}

function renderLibrosTable(libros, container) {
    let tableHTML = `
        <h2>Listado de libros</h2>
        <table>
            <thead>
                <tr>
                    <th>ISBN</th>
                    <th>Titulo</th>
                    <th>Año publicacion</th>
                    <th>id autor</th>

                </tr>
            </thead>
            <tbody>
    `;

    if (libros.length > 0) {
        libros.forEach(l => {
            tableHTML += `
                <tr>
                    <td>${l.isbn}</td>
                    <td>${l.titulo}</td>
                    <td>${l.anio_publicacion}</td>
                    <td>${l.id_autor}</td>
                </tr>
            `;
        });
    } else {
        tableHTML += '<tr><td colspan="6">No hay préstamos para mostrar.</td></tr>';
    }

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

export async function librosDashboard(container) {
    container.innerHTML = '<p>Cargando libros...</p>';
    const libros = await getLibros();
    renderLibrosTable(libros, container);
}
