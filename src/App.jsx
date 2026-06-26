import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import ListaNotas from "./pages/ListaNotas";
import CrearNota from './pages/CrearNota';
function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
        <span className="navbar-brand">Gestor Notas</span>
        <div className="navbar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Ver Notas
          </NavLink>
          <NavLink
            to="/crear"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Nueva Nota
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ListaNotas />} />
        <Route path="/crear" element={<CrearNota />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
