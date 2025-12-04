export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  dni: string;
  direccion: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  dni: string;
  direccion: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}