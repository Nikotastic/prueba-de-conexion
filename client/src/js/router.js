import { dashboard } from "../views/home";
import { error } from "../views/notFound";
import { prestamosDashboard } from "../views/prestamos";
import { usuariosDashboard } from "../views/usuarios";
import { homeDashboard } from "../views/dashboard";
import { librosDashboard } from "../views/libros";
import { autoresDashboard } from "../views/autores";  


export async function router() {
  const route = location.hash.slice(1);
  const app = document.getElementById("app");


  switch (route) {
    case "":
    case "/":
      dashboard(app);
      break;

    case "/dashboard":
      homeDashboard(app);
      break;

    case "/prestamos":
      prestamosDashboard(app);
      break;

    case "/libros":
      librosDashboard(app);
      break;

    case "/autores":
      autoresDashboard(app);
      break;

    case "/usuarios":
      usuariosDashboard(app);
      break;

    default:
      error(app);
      break;
  }
}
