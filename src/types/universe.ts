export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Portfolio {
  id: number;
  name: string;
  subdomain: string;
  description: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  website: {
    url: string;
    previewImage?: string;
    technologies: string[];
    features: string[];
  };
  visible?: boolean;
}

export interface CameraConfig {
  initial: {
    position: [number, number, number];
    fov: number;
  };
  controls: {
    minDistance: number;
    maxDistance: number;
    rotateSpeed: number;
    zoomSpeed: number;
    dampingFactor: number;
  };
}

export interface SunConfig {
  size: number;
  color: string;
  intensity: number;
  glow: {
    size: number;
    intensity: number;
  };
}

export interface PlanetConfig {
  minSize: number;
  maxSize: number;
  orbitSpacing: number;
  baseOrbitRadius: number;
  baseSpeed: number;
  speedDecrement: number;
}

export interface NebulaConfig {
  position: [number, number, number];
  color: string;
  size: number;
}

export interface StarsConfig {
  count: number;
  radius: number;
  depth: number;
  factor: number;
  saturation: number;
  speed: number;
}

export interface UniverseConfig {
  camera: CameraConfig;
  sun: SunConfig;
  planets: PlanetConfig;
  nebulas: NebulaConfig[];
  stars: StarsConfig;
}

export interface PlanetProps extends Portfolio {
  initialRotation: number;
  onFocusPlanet: (id: number) => void;
}

export interface PlanetSidebarProps {
  portfolios: Portfolio[];
  onSelectPlanet: (id: number) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}
