export interface Paquete {
  id: number;
  destino: string;
  ubicacion: string;
  descripcion: string;
  precio: number;
  imagen: string;
  duracionDias: number;
  tipoViaje: string;
  serviciosIncluidos: {
    hospedaje: boolean;
    transporte: boolean;
    pension: boolean;
  };
}

export interface FiltrosBusqueda {
  destino: string;
  fechaInicio: string;
  fechaFin: string;
  presupuestoMax: number;
  tipoViaje: string;
  duracionDias: number;
  numeroPersonas: number;
  hospedaje: boolean;
  transporte: boolean;
  pension: boolean;
}