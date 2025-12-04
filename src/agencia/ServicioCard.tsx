import type { Servicio } from "../types/servicio.types";

interface ServicioCardProps {
  servicio: Servicio;
}

function ServicioCard({ servicio }: ServicioCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
      {/* Icono */}
      <div className="flex justify-center mb-6">
        <div className="text-6xl text-blue-600">
          {servicio.icono}
        </div>
      </div>
      
      {/* Contenido */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {servicio.titulo}
      </h3>
      <p className="text-gray-600 text-center leading-relaxed">
        {servicio.descripcion}
      </p>
    </div>
  );
}

export default ServicioCard;