import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import ServicioCard from '../agencia/ServicioCard';
import type { Servicio } from '../types/servicio.types';

function ServiciosScreen() {
  // Datos estáticos de servicios
  const servicios: Servicio[] = [
    {
      id: 1,
      titulo: "Reservas de Vuelos",
      descripcion: "Encuentra los mejores vuelos a precios competitivos.",
      icono: "✈️"
    },
    {
      id: 2,
      titulo: "Hoteles y Alojamientos",
      descripcion: "Selecciona hospedajes que se adapten a tu presupuesto.",
      icono: "🏨"
    },
    {
      id: 3,
      titulo: "Tours Guiados",
      descripcion: "Experiencias únicas con guías locales expertos.",
      icono: "🗺️"
    },
    {
      id: 4,
      titulo: "Alquiler de Vehículos",
      descripcion: "Transporte cómodo para explorar destinos.",
      icono: "🚗"
    }
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Imagen de fondo con overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')",
          zIndex: -1
        }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-blue-900/85"></div>
      </div>

      <Navbar />
      
      <div className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título */}
          <h1 className="text-5xl font-bold text-center text-white mb-4 drop-shadow-lg">
            Nuestros Servicios
          </h1>
          <p className="text-center text-blue-100 mb-12 text-lg">
            Soluciones completas para tu experiencia de viaje perfecta
          </p>
          
          {/* Grid de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {servicios.map((servicio) => (
              <ServicioCard key={servicio.id} servicio={servicio} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ServiciosScreen;