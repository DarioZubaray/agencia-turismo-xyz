import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import PromocionesScreen from '../screens/PromocionesScreen';
import ServiciosScreen from '../screens/ServiciosScreen';
import ContactoScreen from '../screens/ContactoScreen';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomeScreen />} />
        
        {/* Rutas de la aplicación */}
        <Route path="/promociones" element={<PromocionesScreen />} />
        <Route path="/servicios" element={<ServiciosScreen />} />
        <Route path="/contacto" element={<ContactoScreen />} />
        
        {/* Ruta 404 - Redirecciona a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;