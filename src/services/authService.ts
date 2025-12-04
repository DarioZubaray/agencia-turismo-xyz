import type { User, RegisterData, LoginData } from '../types/auth.types';

const USERS_KEY = 'turismo_users';
const SESSION_KEY = 'turismo_session';

export const authService = {
  // Registrar nuevo usuario
  register: (data: RegisterData): { success: boolean; message: string; user?: User } => {
    try {
      // Obtener usuarios existentes
      const users = authService.getAllUsers();
      
      // Verificar si el email ya existe
      if (users.find(u => u.email === data.email)) {
        return { success: false, message: 'El correo electrónico ya está registrado' };
      }
      
      // Verificar si el DNI ya existe
      if (users.find(u => u.dni === data.dni)) {
        return { success: false, message: 'El DNI ya está registrado' };
      }
      
      // Crear nuevo usuario
      const newUser: User = {
        id: Date.now().toString(),
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
        fechaNacimiento: data.fechaNacimiento,
        dni: data.dni,
        direccion: data.direccion
      };
      
      // Guardar usuario con contraseña (en producción NUNCA hacer esto!)
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(`password_${data.email}`, data.password);
      
      return { success: true, message: 'Usuario registrado exitosamente', user: newUser };
    } catch (error) {
      return { success: false, message: 'Error al registrar usuario' };
    }
  },

  // Iniciar sesión
  login: (data: LoginData): { success: boolean; message: string; user?: User } => {
    try {
      const users = authService.getAllUsers();
      const user = users.find(u => u.email === data.email);
      
      if (!user) {
        return { success: false, message: 'Usuario no encontrado' };
      }
      
      const storedPassword = localStorage.getItem(`password_${data.email}`);
      
      if (storedPassword !== data.password) {
        return { success: false, message: 'Contraseña incorrecta' };
      }
      
      // Guardar sesión
      authService.setSession(user);
      
      return { success: true, message: 'Inicio de sesión exitoso', user };
    } catch (error) {
      return { success: false, message: 'Error al iniciar sesión' };
    }
  },

  // Cerrar sesión
  logout: (): void => {
    localStorage.removeItem(SESSION_KEY);
  },

  // Obtener sesión actual
  getSession: (): User | null => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  },

  // Guardar sesión
  setSession: (user: User): void => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  // Verificar si hay sesión activa
  isAuthenticated: (): boolean => {
    return authService.getSession() !== null;
  },

  // Obtener todos los usuarios (privado, solo para demo)
  getAllUsers: (): User[] => {
    const usersData = localStorage.getItem(USERS_KEY);
    return usersData ? JSON.parse(usersData) : [];
  }
};