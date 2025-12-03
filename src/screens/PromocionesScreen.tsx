import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import PromocionesSection from '../agencia/PromocionesSection';

export default function PromocionesScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="py-16">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          Todas Nuestras Promociones
        </h1>
        <PromocionesSection />
      </div>
      <Footer />
    </div>
  );
}
