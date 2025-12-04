export type Promocion = {
    id: string,
    imagen: string,
    titulo: string,
    descripcion: string,
    precio: number
}

function PromocionCard({promocion}: any) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
      {/* Imagen de fondo */}
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${promocion.imagen})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          {promocion.titulo}
        </h3>
        <p className="text-gray-600 mb-4">
          {promocion.descripcion}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-green-600">
            {promocion.precio}
          </span>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold">
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromocionCard;