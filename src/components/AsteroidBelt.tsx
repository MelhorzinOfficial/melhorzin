import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
  count?: number;
  radius?: number;
  width?: number;
  height?: number;
}

export function AsteroidBelt({
  count = 2000,
  radius = 80,
  width = 30,
  height = 4,
}: AsteroidBeltProps): React.ReactElement {
  const asteroids = useRef<THREE.Points>(null!);
  const rotationSpeed = useRef(Math.random() * 0.0002 + 0.0001);

  // Generate random asteroids
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random angle and radius within the belt
      const angle = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * width;
      
      // Calculate position
      const x = Math.cos(angle) * r;
      const y = (Math.random() - 0.5) * height;
      const z = Math.sin(angle) * r;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Random size for each asteroid
      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    return [positions, sizes];
  }, [count, radius, width, height]);

  // Animation
  useFrame((state) => {
    if (asteroids.current) {
      asteroids.current.rotation.y += rotationSpeed.current;
    }
  });

  return (
    <points ref={asteroids}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        sizeAttenuation={true}
        color="#888888"
        transparent
        opacity={0.8}
        depthWrite={false}
      >
        <canvasTexture
          attach="map"
          args={[(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d')!;
            const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 32, 32);
            return canvas;
          })()]}
        />
      </pointsMaterial>
    </points>
  );
}
