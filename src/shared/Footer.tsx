const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TurismoXYZ</h3>
            <p className="text-gray-400">Tu compañero de viajes ideal</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Inicio</a></li>
              <li><a href="#" className="hover:text-white transition">Promociones</a></li>
              <li><a href="#" className="hover:text-white transition">Servicios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">info@turismoxyz.com</p>
            <p className="text-gray-400">+54 11 1234-5678</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 TurismoXYZ. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;