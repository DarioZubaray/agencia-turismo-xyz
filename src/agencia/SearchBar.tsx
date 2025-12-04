import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [destino, setDestino] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (destino.trim()) {
      navigate(`/buscar?destino=${encodeURIComponent(destino)}`);
    } else {
      navigate('/buscar');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto -mt-8 relative z-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Encuentra tu próximo destino
      </h3>
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          placeholder="¿A dónde quieres viajar?"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold whitespace-nowrap"
        >
          🔍 Buscar Paquetes
        </button>
      </form>
    </div>
  );
}

export default SearchBar;