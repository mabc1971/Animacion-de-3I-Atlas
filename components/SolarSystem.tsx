
import React, { useState, useEffect, useRef } from 'react';
import { SUN, PLANETS, COMET, CENTER } from '../constants';
import type { Planet } from '../types';

interface SolarSystemProps {
  cometProgress: number;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ cometProgress }) => {
  const [time, setTime] = useState(0);
  const cometPathRef = useRef<SVGPathElement>(null);
  const [cometPosition, setCometPosition] = useState({ x: 0, y: 0 });
  const [cometTailPoints, setCometTailPoints] = useState('');

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => setTime(Date.now()));
    return () => cancelAnimationFrame(animationFrame);
  }, [time]);

  useEffect(() => {
    if (cometPathRef.current) {
      const pathLength = cometPathRef.current.getTotalLength();
      const point = cometPathRef.current.getPointAtLength(cometProgress * pathLength);
      setCometPosition(point);

      // Calculate tail pointing away from the sun
      const dx = point.x - CENTER.x;
      const dy = point.y - CENTER.y;
      const distanceToSun = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      
      const tailLength = Math.max(0, 150 - distanceToSun) * 0.7; // Tail is longer when closer to the sun
      const tailWidth = tailLength * 0.2;

      const p1x = point.x + Math.cos(angle + Math.PI / 2) * tailWidth / 2;
      const p1y = point.y + Math.sin(angle + Math.PI / 2) * tailWidth / 2;
      
      const p2x = point.x - Math.cos(angle) * tailLength;
      const p2y = point.y - Math.sin(angle) * tailLength;

      const p3x = point.x + Math.cos(angle - Math.PI / 2) * tailWidth / 2;
      const p3y = point.y + Math.sin(angle - Math.PI / 2) * tailWidth / 2;

      setCometTailPoints(`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`);
    }
  }, [cometProgress]);

  return (
    <div className="w-full aspect-square max-w-4xl mx-auto">
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
           <radialGradient id="sunGradient">
            <stop offset="0%" stopColor="#FFF7A0" />
            <stop offset="60%" stopColor={SUN.color} />
            <stop offset="100%" stopColor="rgba(255,165,0,0.5)" />
          </radialGradient>
        </defs>

        {/* Sun */}
        <circle cx={CENTER.x} cy={CENTER.y} r={SUN.radius} fill="url(#sunGradient)" filter="url(#glow)" />
        
        {/* Planet Orbits */}
        {PLANETS.map((planet) => (
          <circle
            key={`${planet.name}-orbit`}
            cx={CENTER.x}
            cy={CENTER.y}
            r={planet.orbitalRadius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Planets */}
        {PLANETS.map((planet: Planet) => {
          const angle = (time * planet.speed) / 20000;
          const x = CENTER.x + planet.orbitalRadius * Math.cos(angle);
          const y = CENTER.y + planet.orbitalRadius * Math.sin(angle);
          return <circle key={planet.name} cx={x} cy={y} r={planet.radius} fill={planet.color} />;
        })}

        {/* Comet Path */}
        <path
          ref={cometPathRef}
          d={COMET.path}
          fill="none"
          stroke="rgba(0, 191, 255, 0.4)"
          strokeWidth="2"
          strokeDasharray="5 10"
        />

        {/* Comet Tail */}
        {cometPosition.x > 0 && (
          <polygon points={cometTailPoints} fill="rgba(255, 255, 255, 0.5)" filter="url(#glow)" />
        )}

        {/* Comet Head */}
        {cometPosition.x > 0 && (
          <circle
            cx={cometPosition.x}
            cy={cometPosition.y}
            r={COMET.radius}
            fill={COMET.color}
            filter="url(#glow)"
          />
        )}
      </svg>
    </div>
  );
};

export default SolarSystem;
