import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const ServiciosScreen = () => {
  const servicios = [
    {
      id: 1,
      titulo: "Asesoramiento Personalizado",
      descripcion: "Te ayudamos a planificar tu viaje ideal",
      icono: "🎯"
    },
    {
      id: 2,
      titulo: "Paquetes a Medida",
      descripcion: "Creamos experiencias únicas para ti",
      icono: "✈️"
    },
    {
      id: 3,
      titulo: "Soporte 24/7",
      descripcion: "Estamos contigo en todo momento",
      icono: "💬"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
            Nuestros Servicios
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicios.map((servicio) => (
              <div key={servicio.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition duration-300">
                <div className="text-5xl mb-4">{servicio.icono}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{servicio.titulo}</h3>
                <p className="text-gray-600">{servicio.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServiciosScreen;