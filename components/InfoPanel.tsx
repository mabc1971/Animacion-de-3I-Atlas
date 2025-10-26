
import React from 'react';

const InfoPanel: React.FC = () => {
  return (
    <div className="w-full md:w-80 lg:w-96 p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-2xl text-gray-200">
      <h2 className="text-2xl font-bold text-cyan-300 mb-3">Cometa 3i/ATLAS</h2>
      <p className="text-sm text-gray-300 mb-4">
        Una visualización de la trayectoria del cometa 3i/ATLAS a través del sistema solar. Este cometa, descubierto por el sistema ATLAS (Asteroid Terrestrial-impact Last Alert System), sigue una órbita altamente elíptica que lo acerca al Sol.
      </p>
      <div className="space-y-2 text-sm">
        <p><strong className="font-semibold text-gray-100">Tipo:</strong> Cometa de período largo</p>
        <p><strong className="font-semibold text-gray-100">Característica:</strong> Su trayectoria lo lleva desde los confines del sistema solar hasta cerca del Sol, donde su hielo se sublima creando una coma y cola visibles.</p>
        <p><strong className="font-semibold text-gray-100">Interacción:</strong> Usa los controles para reproducir, pausar o explorar manualmente la trayectoria del cometa.</p>
      </div>
    </div>
  );
};

export default InfoPanel;
