import { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import PromocionCard, { type Promocion } from '../agencia/PromocionCard';
import { promocionesService } from '../services/promocionesService';

function PromocionesScreen() {
  const [promociones, setPromociones] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        setLoading(true);
        const data = await promocionesService.getAllPromociones();
        setPromociones(data);
      } catch (err) {
        setError('Error al cargar las promociones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromociones();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título */}
          <h1 className="text-5xl font-bold text-center text-blue-600 mb-4">
            Promociones Destacadas
          </h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Descubre nuestras mejores ofertas y vive experiencias inolvidables
          </p>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
              {error}
            </div>
          )}

          {/* Grid de Promociones */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promociones.map((promocion: Promocion) => (
                <PromocionCard key={promocion.id} promocion={promocion} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && promociones.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl">No hay promociones disponibles en este momento.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default PromocionesScreen;