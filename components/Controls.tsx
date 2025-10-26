
import React from 'react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  progress: number;
  onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlayIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 00-.75.75v12a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H6.75zm8.25 0a.75.75 0 00-.75.75v12a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-.75z" clipRule="evenodd" />
  </svg>
);

const Controls: React.FC<ControlsProps> = ({ isPlaying, onPlayPause, progress, onProgressChange }) => {
  return (
    <div className="w-full p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-2xl mt-4 md:mt-0 flex items-center space-x-4">
      <button
        onClick={onPlayPause}
        className="p-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
        aria-label={isPlaying ? 'Pausar animación' : 'Reproducir animación'}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="flex-grow flex items-center space-x-2">
        <span className="text-gray-300 text-xs font-mono">0%</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          onChange={onProgressChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
          aria-label="Progreso de la trayectoria"
        />
        <span className="text-gray-300 text-xs font-mono">100%</span>
      </div>
    </div>
  );
};

export default Controls;
