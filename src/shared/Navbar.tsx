import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string): boolean => location.pathname === path;

  const linkClasses = (path: string): string =>
    isActive(path)
      ? "text-blue-200 border-b-2 border-blue-200"
      : "text-white hover:text-blue-200 transition";

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition">
            TurismoXYZ
          </Link>

          {/* MENU HAMBURGUESA (solo mobile) */}
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* LINKS DESKTOP */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={linkClasses("/")}>Inicio</Link>
            <Link to="/promociones" className={linkClasses("/promociones")}>Promociones</Link>
            <Link to="/servicios" className={linkClasses("/servicios")}>Servicios</Link>
            <Link to="/contacto" className={linkClasses("/contacto")}>Contacto</Link>
          </div>

          {/* ACCIONES USUARIO (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <span className="text-white font-semibold">Hola, {user.nombre.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-blue-600 transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>

        {/* MENU MOBILE */}
        {isOpen && (
          <div className="md:hidden mt-2 pb-4 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-2 text-white text-lg">
              <Link onClick={() => setIsOpen(false)} to="/" className={linkClasses("/")}>Inicio</Link>
              <Link onClick={() => setIsOpen(false)} to="/promociones" className={linkClasses("/promociones")}>Promociones</Link>
              <Link onClick={() => setIsOpen(false)} to="/servicios" className={linkClasses("/servicios")}>Servicios</Link>
              <Link onClick={() => setIsOpen(false)} to="/contacto" className={linkClasses("/contacto")}>Contacto</Link>
            </div>

            <div className="pt-3 border-t border-blue-300 flex flex-col space-y-2">
              {isAuthenticated && user ? (
                <>
                  <span className="text-white font-semibold">Hola, {user.nombre.split(' ')[0]}</span>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full py-2 text-center border border-white text-white rounded hover:bg-white hover:text-blue-600 transition"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-2 text-center bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
