import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { paquetesService } from '../services/paquetesService';
import type { Paquete } from '../types/paquete.types';
import type { PersonalizacionPaquete } from '../types/reserva.types';

function PaqueteDetalleScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [paquete, setPaquete] = useState<Paquete | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [personalizacion, setPersonalizacion] = useState<PersonalizacionPaquete>({
    fechaInicio: '',
    fechaFin: '',
    numeroPersonas: 2,
    hotel: '',
    tipoPension: 'Pensión Completa',
    toursAdicionales: {
      excursionBote: false,
      diaSpa: false,
      tourCultural: false
    }
  });

  useEffect(() => {
    cargarPaquete();
  }, [id]);

  const cargarPaquete = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const data = await paquetesService.getPaqueteById(Number(id));
      if (data) {
        setPaquete(data);
      } else {
        alert('Paquete no encontrado');
        navigate('/buscar');
      }
    } catch (error) {
      console.error('Error al cargar paquete:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campo: keyof PersonalizacionPaquete, valor: any) => {
    setPersonalizacion(prev => ({ ...prev, [campo]: valor }));
  };

  const handleTourChange = (tour: keyof PersonalizacionPaquete['toursAdicionales']) => {
    setPersonalizacion(prev => ({
      ...prev,
      toursAdicionales: {
        ...prev.toursAdicionales,
        [tour]: !prev.toursAdicionales[tour]
      }
    }));
  };

  const calcularPrecioTotal = (): number => {
    if (!paquete) return 0;
    
    let total = paquete.precio * personalizacion.numeroPersonas;
    
    // Agregar costo de tours adicionales
    if (personalizacion.toursAdicionales.excursionBote) total += 150 * personalizacion.numeroPersonas;
    if (personalizacion.toursAdicionales.diaSpa) total += 100 * personalizacion.numeroPersonas;
    if (personalizacion.toursAdicionales.tourCultural) total += 80 * personalizacion.numeroPersonas;
    
    return total;
  };

  const handleRealizarReserva = () => {
    // Validaciones
    if (!personalizacion.fechaInicio || !personalizacion.fechaFin) {
      alert('Por favor selecciona las fechas de inicio y fin');
      return;
    }
    
    if (!personalizacion.hotel) {
      alert('Por favor selecciona un hotel');
      return;
    }

    const mensaje = `
¡Reserva Confirmada! ✅

Paquete: ${paquete?.destino}
Fechas: ${personalizacion.fechaInicio} - ${personalizacion.fechaFin}
Personas: ${personalizacion.numeroPersonas}
Hotel: ${personalizacion.hotel}
Pensión: ${personalizacion.tipoPension}

Precio Total: $${calcularPrecioTotal()}

¡Gracias por tu reserva!
    `.trim();

    alert(mensaje);
    navigate('/');
  };

  const handleEditarPaquete = () => {
    alert('Funcionalidad de edición en desarrollo');
  };

  const handleCancelar = () => {
    if (confirm('¿Estás seguro de que deseas cancelar?')) {
      navigate('/buscar');
    }
  };

  const handleCalcular = () => {
    alert(`Precio Total Calculado: $${calcularPrecioTotal()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!paquete) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fondo con imagen */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop')",
          zIndex: -1
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/85 to-blue-900/90"></div>
      </div>

      <Navbar />
      
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda - Detalles del paquete */}
            <div className="bg-white rounded-lg shadow-2xl p-8">
              {/* Imagen */}
              <div className="mb-6">
                <img 
                  src={paquete.imagen} 
                  alt={paquete.destino}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Información del paquete */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Paquete {paquete.destino} Relax
              </h1>

              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-semibold">Destino:</span> {paquete.ubicacion}
                </p>
                <p>
                  <span className="font-semibold">Duración:</span> {paquete.duracionDias} días
                </p>
                <p>
                  <span className="font-semibold">Precio Base:</span> ${paquete.precio}
                </p>
                <p>
                  <span className="font-semibold">Servicios Incluidos:</span>{' '}
                  {paquete.serviciosIncluidos.hospedaje && 'Hospedaje, '}
                  {paquete.serviciosIncluidos.transporte && 'Transporte, '}
                  {paquete.serviciosIncluidos.pension && 'Pensión Completa'}
                </p>
                <p>
                  <span className="font-semibold">Fechas Disponibles:</span> Junio - Agosto 2025
                </p>
                <p>
                  <span className="font-semibold">Cupos:</span> 10 disponibles
                </p>
              </div>

              {/* Botones de acción del paquete */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleRealizarReserva}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Realizar Reserva
                </button>
                <button
                  onClick={handleEditarPaquete}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-semibold"
                >
                  Editar Paquete
                </button>
                <button
                  onClick={handleCancelar}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>

            {/* Columna derecha - Formulario de personalización */}
            <div className="bg-white rounded-lg shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-6">
                Personalizar Paquete
              </h2>

              <form className="space-y-4">
                {/* Fecha de inicio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    value={personalizacion.fechaInicio}
                    onChange={(e) => handleChange('fechaInicio', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Fecha de fin */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Fin
                  </label>
                  <input
                    type="date"
                    value={personalizacion.fechaFin}
                    onChange={(e) => handleChange('fechaFin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Número de personas */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Personas
                  </label>
                  <input
                    type="number"
                    value={personalizacion.numeroPersonas}
                    onChange={(e) => handleChange('numeroPersonas', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="10"
                    required
                  />
                </div>

                {/* Hotel */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hotel
                  </label>
                  <select
                    value={personalizacion.hotel}
                    onChange={(e) => handleChange('hotel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Hotel Estándar</option>
                    <option value="Hotel Premium">Hotel Premium</option>
                    <option value="Hotel Luxury">Hotel Luxury</option>
                    <option value="Resort All Inclusive">Resort All Inclusive</option>
                  </select>
                </div>

                {/* Tipo de pensión */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Pensión
                  </label>
                  <select
                    value={personalizacion.tipoPension}
                    onChange={(e) => handleChange('tipoPension', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Solo Alojamiento">Solo Alojamiento</option>
                    <option value="Desayuno Incluido">Desayuno Incluido</option>
                    <option value="Media Pensión">Media Pensión</option>
                    <option value="Pensión Completa">Pensión Completa</option>
                  </select>
                </div>

                {/* Tours adicionales */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tours Adicionales:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                      <div>
                        <span className="font-medium text-gray-800">Excursión en Bote</span>
                        <span className="text-sm text-gray-600 ml-2">(+$150)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={personalizacion.toursAdicionales.excursionBote}
                        onChange={() => handleTourChange('excursionBote')}
                        className="w-5 h-5"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                      <div>
                        <span className="font-medium text-gray-800">Día de Spa</span>
                        <span className="text-sm text-gray-600 ml-2">(+$100)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={personalizacion.toursAdicionales.diaSpa}
                        onChange={() => handleTourChange('diaSpa')}
                        className="w-5 h-5"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
                      <div>
                        <span className="font-medium text-gray-800">Tour Cultural</span>
                        <span className="text-sm text-gray-600 ml-2">(+$80)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={personalizacion.toursAdicionales.tourCultural}
                        onChange={() => handleTourChange('tourCultural')}
                        className="w-5 h-5"
                      />
                    </label>
                  </div>
                </div>

                {/* Precio total */}
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Precio Total:
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      ${calcularPrecioTotal()}
                    </span>
                  </div>
                </div>

                {/* Botón calcular */}
                <button
                  type="button"
                  onClick={handleCalcular}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Calcular
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default PaqueteDetalleScreen;