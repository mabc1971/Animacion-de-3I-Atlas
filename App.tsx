
import React, { useState, useEffect, useCallback, useRef } from 'react';
import SolarSystem from './components/SolarSystem';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const totalDuration = 60000; // 60 seconds for a full orbit

  const animate = useCallback((timestamp: number) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = timestamp;
    }
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    setProgress(prev => {
      const nextProgress = prev + deltaTime / totalDuration;
      return nextProgress >= 1 ? 0 : nextProgress; // Loop animation
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = null;
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, animate]);

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    setProgress(parseFloat(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1920/1080?blur=5&grayscale')"}}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full max-w-7xl">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
            Animación de la Trayectoria del Cometa 3i/ATLAS
          </h1>
        </header>
        <main className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-grow">
            <SolarSystem cometProgress={progress} />
          </div>
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <InfoPanel />
            <Controls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              progress={progress}
              onProgressChange={handleProgressChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
