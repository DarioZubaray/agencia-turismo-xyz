import promocionesData from '../data/promociones.json';

// Simula una llamada a API con delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const promocionesService = {
  // Obtener todas las promociones
  getAllPromociones: async () => {
    await delay(500); // Simula latencia de red
    return promocionesData;
  },

  // Obtener promoción por ID
  getPromocionById: async (id: number) => {
    await delay(300);
    return promocionesData.find(promo => promo.id === id);
  },

  // Obtener promociones destacadas (primeras 3)
  getPromocionesDestacadas: async () => {
    await delay(400);
    return promocionesData.slice(0, 3);
  }
};