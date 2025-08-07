async function getPrestamos() {
    try {
        const res = await fetch('http://localhost:3000/prestamos');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching prestamos:', error);
        return []; // Devuelve un array vacío en caso de error
    }
}

function renderPrestamosTable(prestamos, container) {
    let tableHTML = `
        <h2>Listado de Préstamos</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ID Usuario</th>
                    <th>ISBN</th>
                    <th>Fecha Préstamo</th>
                    <th>Fecha Devolución</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (prestamos.length > 0) {
        prestamos.forEach(p => {
            tableHTML += `
                <tr>
                    <td>${p.id_prestamo}</td>
                    <td>${p.id_usuario}</td>
                    <td>${p.isbn}</td>
                    <td>${new Date(p.fecha_prestamo).toLocaleDateString()}</td>
                    <td>${new Date(p.fecha_devolucion).toLocaleDateString()}</td>
                    <td>${p.estado}</td>
                </tr>
            `;
        });
    } else {
        tableHTML += '<tr><td colspan="6">No hay préstamos para mostrar.</td></tr>';
    }

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

export async function prestamosDashboard(container) {
    container.innerHTML = '<p>Cargando préstamos...</p>';
    const prestamos = await getPrestamos();
    renderPrestamosTable(prestamos, container);
}