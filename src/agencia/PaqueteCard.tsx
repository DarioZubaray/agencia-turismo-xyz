import { useNavigate } from 'react-router-dom';
import type { Paquete } from '../types/paquete.types';

interface PaqueteCardProps {
  paquete: Paquete;
}

function PaqueteCard({ paquete }: PaqueteCardProps) {
  const navigate = useNavigate();

  const handleVerDetalle = () => {
    navigate(`/paquete/${paquete.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
      {/* Imagen */}
      <div className="relative">
        <img 
          src={paquete.imagen} 
          alt={paquete.destino}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {paquete.duracionDias} días
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📍</span>
          <h3 className="text-xl font-bold text-gray-800">{paquete.destino}</h3>
        </div>
        
        <p className="text-gray-600 mb-3 text-sm">
          {paquete.ubicacion}
        </p>
        
        <p className="text-gray-700 mb-4">
          {paquete.descripcion}
        </p>

        {/* Servicios incluidos */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {paquete.serviciosIncluidos.hospedaje && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              🏨 Hospedaje
            </span>
          )}
          {paquete.serviciosIncluidos.transporte && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              🚗 Transporte
            </span>
          )}
          {paquete.serviciosIncluidos.pension && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
              🍽️ Pensión
            </span>
          )}
        </div>
        
        {/* Precio y botones */}
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">
            ${paquete.precio}
          </span>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm font-semibold"
                onClick={handleVerDetalle}>
              Elegir Paquete
            </button>
            <button className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition text-sm font-semibold">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaqueteCard;