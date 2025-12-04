export interface PersonalizacionPaquete {
  fechaInicio: string;
  fechaFin: string;
  numeroPersonas: number;
  hotel: string;
  tipoPension: string;
  toursAdicionales: {
    excursionBote: boolean;
    diaSpa: boolean;
    tourCultural: boolean;
  };
}