import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import HeroSection from '../agencia/HeroSection';
import PromocionesSection from '../agencia/PromocionesSection';

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <HeroSection />
      <PromocionesSection />
      <Footer />
    </div>
  );
}

export default HomeScreen;