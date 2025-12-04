import paquetesData from '../data/paquetes.json';
import type { Paquete, FiltrosBusqueda } from '../types/paquete.types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const paquetesService = {
  // Buscar paquetes con filtros
  buscarPaquetes: async (filtros: Partial<FiltrosBusqueda>): Promise<Paquete[]> => {
    await delay(500);
    
    let resultados = [...paquetesData];

    // Filtrar por destino
    if (filtros.destino && filtros.destino.trim() !== '') {
      const destinoLower = filtros.destino.toLowerCase();
      resultados = resultados.filter(p => 
        p.destino.toLowerCase().includes(destinoLower) ||
        p.ubicacion.toLowerCase().includes(destinoLower) ||
        p.descripcion.toLowerCase().includes(destinoLower)
      );
    }
    const presupuestoMax = filtros.presupuestoMax ?? Infinity;
    const duracionDias = filtros.duracionDias ?? Infinity;
    // Filtrar por presupuesto máximo
    if (presupuestoMax > 0) {
      resultados = resultados.filter(p => p.precio <= presupuestoMax);
    }

    // Filtrar por tipo de viaje
    if (filtros.tipoViaje && filtros.tipoViaje !== 'Todos') {
      resultados = resultados.filter(p => p.tipoViaje === filtros.tipoViaje);
    }

    // Filtrar por duración
    if (duracionDias > 0) {
      resultados = resultados.filter(p => p.duracionDias <= duracionDias);
    }

    // Filtrar por servicios incluidos
    if (filtros.hospedaje) {
      resultados = resultados.filter(p => p.serviciosIncluidos.hospedaje);
    }
    if (filtros.transporte) {
      resultados = resultados.filter(p => p.serviciosIncluidos.transporte);
    }
    if (filtros.pension) {
      resultados = resultados.filter(p => p.serviciosIncluidos.pension);
    }

    return resultados;
  },

  // Obtener todos los paquetes
  getAllPaquetes: async (): Promise<Paquete[]> => {
    await delay(400);
    return paquetesData;
  },

  // Obtener paquete por ID
  getPaqueteById: async (id: number): Promise<Paquete | undefined> => {
    await delay(300);
    return paquetesData.find(p => p.id === id);
  }
};