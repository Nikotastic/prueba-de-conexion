export function homeDashboard(container) {
  container.innerHTML = `
   <section class="features">
  <div class="feature">
    <h2>Usuarios</h2>
    <p>Visualiza y gestiona los usuarios.</p>
    <a href="#/usuarios" class="btn-feature">Ver usuarios</a>
  </div>
  <div class="feature">
    <h2>Libros</h2>
    <p>Administra la biblioteca de libros.</p>
    <a href="#/libros" class="btn-feature">Ver libros</a>
  </div>
  <div class="feature">
    <h2>Préstamos</h2>
    <p>Controla los préstamos de libros.</p>
    <a href="#/prestamos" class="btn-feature">Ver préstamos</a>
  </div>
  <div class="feature">
    <h2>Autores</h2>
    <p>Controla los préstamos de autores.</p>

    <a href="#/autores" class="btn-feature">Ver autores</a>
  </div>
</section>


  `;
}
