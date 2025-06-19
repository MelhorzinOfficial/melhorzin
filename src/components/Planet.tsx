import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Ring, Html } from "@react-three/drei";
import * as THREE from "three";
import { Portfolio } from "@/types/universe";

type PlanetProps = Portfolio & {
  initialRotation: number;
  onFocusPlanet: (id: number) => void;
  globalSpeed?: number;
};

export function Planet({
  id,
  name,
  color,
  size,
  orbitRadius,
  orbitSpeed,
  description,
  initialRotation,
  onFocusPlanet,
  globalSpeed = 1,
}: PlanetProps): React.ReactElement {
  const meshRef = useRef<THREE.Mesh>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState(initialRotation);
  
  // Planet position calculation
  useFrame((_, delta) => {
    setRotation((prev) => prev + orbitSpeed * globalSpeed * delta * 60);
    
    if (meshRef.current) {
      // Update planet position
      meshRef.current.position.x = Math.cos(rotation) * orbitRadius;
      meshRef.current.position.z = Math.sin(rotation) * orbitRadius;
      
      // Rotate planet on its axis
      meshRef.current.rotation.y += 0.005 * globalSpeed * delta * 60;
    }
    
    if (atmosphereRef.current) {
      atmosphereRef.current.position.copy(meshRef.current.position);
      atmosphereRef.current.scale.setScalar(hovered ? 1.2 : 1.15);
    }
  });

  // Generate unique surface pattern for each planet
  const surfacePattern = new THREE.TextureLoader().load(
    'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" />
        </filter>
        <rect width="100" height="100" filter="url(#noise)" />
      </svg>
    `)
  );

  return (
    <group>
      {/* Planet atmosphere */}
      <Sphere
        ref={atmosphereRef}
        args={[size * 1.1, 32, 32]}
        name={`atmosphere-${id}`}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Planet core */}
      <Sphere
        ref={meshRef}
        args={[size, 32, 32]}
        name={`planet-${id}`}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onFocusPlanet(id)}
      >
        <meshPhongMaterial
          color={color}
          shininess={10}
          bumpMap={surfacePattern}
          bumpScale={0.5}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Planet rings (for certain planets) */}
      {id % 3 === 0 && (
        <Ring
          position={meshRef.current?.position || [0, 0, 0]}
          args={[size * 1.4, size * 1.8, 64]}
          rotation={[Math.PI / 3, 0, 0]}
        >
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </Ring>
      )}

      {/* Hover info card */}
      {hovered && (
        <Html
          position={[
            meshRef.current?.position.x || 0,
            (meshRef.current?.position.y || 0) + size * 1.5,
            meshRef.current?.position.z || 0,
          ]}
          center
          className="pointer-events-none"
        >
          <div className="bg-black/80 text-white px-4 py-2 rounded-lg border border-white/20 min-w-[200px]">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-gray-300">{description}</p>
            <div className="mt-2 text-xs text-gray-400">
              Clique para explorar
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
