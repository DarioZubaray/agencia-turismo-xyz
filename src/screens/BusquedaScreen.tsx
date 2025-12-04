import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import PaqueteCard from '../agencia/PaqueteCard';
import { paquetesService } from '../services/paquetesService';
import type { Paquete, FiltrosBusqueda } from '../types/paquete.types';

function BusquedaScreen() {
  const [searchParams] = useSearchParams();
  const destinoParam = searchParams.get('destino') || '';

  const [paquetes, setPaquetes] = useState<Paquete[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState<Partial<FiltrosBusqueda>>({
    destino: destinoParam,
    fechaInicio: '',
    fechaFin: '',
    presupuestoMax: 3000,
    tipoViaje: 'Todos',
    duracionDias: 0,
    numeroPersonas: 2,
    hospedaje: false,
    transporte: false,
    pension: false
  });

  useEffect(() => {
    buscarPaquetes();
  }, []);

  const buscarPaquetes = async () => {
    setLoading(true);
    try {
      const resultados = await paquetesService.buscarPaquetes(filtros);
      setPaquetes(resultados);
    } catch (error) {
      console.error('Error al buscar paquetes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (campo: keyof FiltrosBusqueda, valor: any) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filtros laterales */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-blue-600 mb-6">
                  Filtros de Búsqueda
                </h2>

                {/* Destino */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Destino
                  </label>
                  <input
                    type="text"
                    value={filtros.destino}
                    onChange={(e) => handleFiltroChange('destino', e.target.value)}
                    placeholder="Ej: Caribe, Europa"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Fecha de inicio */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    value={filtros.fechaInicio}
                    onChange={(e) => handleFiltroChange('fechaInicio', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Fecha de fin */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Fin
                  </label>
                  <input
                    type="date"
                    value={filtros.fechaFin}
                    onChange={(e) => handleFiltroChange('fechaFin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Presupuesto máximo */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Presupuesto Máximo ($): {filtros.presupuestoMax}
                  </label>
                  <input
                    type="number"
                    value={filtros.presupuestoMax}
                    onChange={(e) => handleFiltroChange('presupuestoMax', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                {/* Tipo de viaje */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Viaje
                  </label>
                  <select
                    value={filtros.tipoViaje}
                    onChange={(e) => handleFiltroChange('tipoViaje', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Playa">Playa</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Relax">Relax</option>
                  </select>
                </div>

                {/* Duración */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duración (días): {filtros.duracionDias || 'Cualquiera'}
                  </label>
                  <input
                    type="number"
                    value={filtros.duracionDias}
                    onChange={(e) => handleFiltroChange('duracionDias', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    placeholder="Máximo días"
                  />
                </div>

                {/* Número de personas */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Personas
                  </label>
                  <input
                    type="number"
                    value={filtros.numeroPersonas}
                    onChange={(e) => handleFiltroChange('numeroPersonas', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                {/* Servicios incluidos */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Servicios Incluidos:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filtros.hospedaje}
                        onChange={(e) => handleFiltroChange('hospedaje', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Hospedaje</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filtros.transporte}
                        onChange={(e) => handleFiltroChange('transporte', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Transporte</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filtros.pension}
                        onChange={(e) => handleFiltroChange('pension', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Pensión</span>
                    </label>
                  </div>
                </div>

                {/* Botón buscar */}
                <button
                  onClick={buscarPaquetes}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                >
                  Buscar Paquetes
                </button>
              </div>
            </aside>

            {/* Resultados */}
            <main className="lg:col-span-3">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Resultados de Búsqueda
                </h1>
                <p className="text-gray-600">
                  {loading ? 'Buscando...' : `${paquetes.length} paquete(s) encontrado(s)`}
                </p>
              </div>

              {/* Loading */}
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                </div>
              )}

              {/* Resultados */}
              {!loading && paquetes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paquetes.map((paquete) => (
                    <PaqueteCard key={paquete.id} paquete={paquete} />
                  ))}
                </div>
              )}

              {/* Sin resultados */}
              {!loading && paquetes.length === 0 && (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No se encontraron paquetes
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Intenta ajustar los filtros de búsqueda
                  </p>
                  <button
                    onClick={() => {
                      setFiltros({
                        destino: '',
                        fechaInicio: '',
                        fechaFin: '',
                        presupuestoMax: 3000,
                        tipoViaje: 'Todos',
                        duracionDias: 0,
                        numeroPersonas: 2,
                        hospedaje: false,
                        transporte: false,
                        pension: false
                      });
                      buscarPaquetes();
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default BusquedaScreen;