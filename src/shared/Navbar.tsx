import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const linkClasses = (path: string): string => {
    return isActive(path)
      ? "text-blue-200 border-b-2 border-blue-200"
      : "text-white hover:text-blue-200 transition duration-200";
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition">
              TurismoXYZ
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={linkClasses("/")}>
              Inicio
            </Link>
            <Link to="/promociones" className={linkClasses("/promociones")}>
              Promociones
            </Link>
            <Link to="/servicios" className={linkClasses("/servicios")}>
              Servicios
            </Link>
            <Link to="/contacto" className={linkClasses("/contacto")}>
              Contacto
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-blue-600 transition duration-200">
              Iniciar Sesión
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;