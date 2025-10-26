
import type { Planet } from './types';

export const SUN = {
  radius: 30,
  color: '#FFD700',
};

export const PLANETS: Planet[] = [
  { name: 'Mercury', radius: 2, color: '#A9A9A9', orbitalRadius: 50, speed: 4.7 },
  { name: 'Venus', radius: 4, color: '#FFA500', orbitalRadius: 80, speed: 3.5 },
  { name: 'Earth', radius: 5, color: '#4169E1', orbitalRadius: 115, speed: 2.9 },
  { name: 'Mars', radius: 3, color: '#FF4500', orbitalRadius: 155, speed: 2.4 },
  { name: 'Jupiter', radius: 15, color: '#D2B48C', orbitalRadius: 220, speed: 1.3 },
  { name: 'Saturn', radius: 12, color: '#F0E68C', orbitalRadius: 290, speed: 0.9 },
  { name: 'Uranus', radius: 8, color: '#ADD8E6', orbitalRadius: 360, speed: 0.6 },
  { name: 'Neptune', radius: 7, color: '#4682B4', orbitalRadius: 430, speed: 0.5 },
];

export const COMET = {
  path: 'M 450, 980 C 500, 600, 850, 250, 980, 500', // Highly eccentric elliptical path
  radius: 3,
  color: '#FFFFFF',
};

export const CENTER = { x: 500, y: 500 };
