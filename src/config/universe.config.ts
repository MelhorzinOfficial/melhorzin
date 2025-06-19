import { UniverseConfig } from "@/types/universe";

export const UNIVERSE_CONFIG: UniverseConfig = {
  camera: {
    initial: {
      position: [0, 40, 100],
      fov: 60,
    },
    controls: {
      minDistance: 15,
      maxDistance: 500,
      rotateSpeed: 0.5,
      zoomSpeed: 0.7,
      dampingFactor: 0.1,
    },
  },
  sun: {
    size: 15,
    color: "#FDB813",
    intensity: 1.5,
    glow: {
      size: 15.5,
      intensity: 0.3,
    },
  },
  planets: {
    minSize: 3.0,
    maxSize: 8.0,
    orbitSpacing: 25,
    baseOrbitRadius: 40,
    baseSpeed: 0.005, // 10x slower
    speedDecrement: 0.0003,
  },
  nebulas: [
    { position: [-200, -100, -300], color: "#ff3366", size: 200 },
    { position: [300, 150, -200], color: "#3366ff", size: 250 },
    { position: [-150, 200, 100], color: "#33ff66", size: 180 },
  ],
  stars: {
    count: 20000,
    radius: 300,
    depth: 60,
    factor: 7,
    saturation: 0,
    speed: 1,
  },
};
