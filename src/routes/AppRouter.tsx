import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import PromocionesScreen from '../screens/PromocionesScreen';
import ServiciosScreen from '../screens/ServiciosScreen';
import ContactoScreen from '../screens/ContactoScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BusquedaScreen from '../screens/BusquedaScreen';
import { AuthProvider } from '../context/AuthContext';
import PaqueteDetalleScreen from '../screens/PaqueteDetalleScreen';

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/promociones" element={<PromocionesScreen />} />
          <Route path="/servicios" element={<ServiciosScreen />} />
          <Route path="/contacto" element={<ContactoScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/buscar" element={<BusquedaScreen />} />
          <Route path="/paquete/:id" element={<PaqueteDetalleScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;