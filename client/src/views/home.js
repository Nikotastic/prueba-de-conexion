export function dashboard(container) {
  container.innerHTML = `
    <section class="landing">
      <div class="landing-content">
        <h1>Cargar datos</h1>
        <p>Trae tus datos del backend</p>
        <div class="landing-buttons">
          <a href="#/dashboard" class="btn primary">Mirar datos</a>
        </div>
      </div>
    </section>
  `;
}
