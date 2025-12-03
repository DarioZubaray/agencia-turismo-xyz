const HeroSection = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)]">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=900&fit=crop')"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 drop-shadow-lg">
          Viajes Inolvidables a tu Alcance
        </h2>
        
        <button className="px-8 py-4 bg-green-500 text-white text-xl rounded-lg shadow-xl hover:bg-green-600 transform hover:scale-105 transition duration-300">
          Regístrate y Empieza tu Aventura
        </button>
        
        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      {/* Floating Cards */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="bg-white rounded-lg shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition duration-300">
          <p className="text-gray-600 font-semibold">✈️ Descuentos hasta 50%</p>
        </div>
      </div>
      
      <div className="absolute top-1/4 right-10 hidden lg:block">
        <div className="bg-white rounded-lg shadow-2xl p-6 transform -rotate-3 hover:rotate-0 transition duration-300">
          <p className="text-gray-600 font-semibold">🌴 Destinos Exóticos</p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;