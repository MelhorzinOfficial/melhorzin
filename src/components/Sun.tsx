import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { UNIVERSE_CONFIG } from '@/config/universe.config';

interface SunProps {
  intensity?: number;
}

export function Sun({ intensity = 1.5 }: SunProps): React.ReactElement {
  const sunRef = useRef<THREE.Mesh>(null!);
  const coronaRef = useRef<THREE.Mesh>(null!);
  const flareRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (sunRef.current) {
      // Pulsating effect
      const scale = 1 + Math.sin(time) * 0.02;
      sunRef.current.scale.setScalar(scale);
    }

    if (coronaRef.current) {
      // Rotating corona effect
      coronaRef.current.rotation.z += 0.0002;
      coronaRef.current.rotation.y -= 0.0001;
      
      // Breathing effect for corona
      const coronaScale = 1 + Math.sin(time * 0.5) * 0.05;
      coronaRef.current.scale.setScalar(coronaScale);
    }

    // Animate flares
    flareRefs.current.forEach((flare, index) => {
      if (flare) {
        const offset = index * (Math.PI * 2) / flareRefs.current.length;
        const x = Math.cos(time * 0.5 + offset) * UNIVERSE_CONFIG.sun.size * 1.2;
        const z = Math.sin(time * 0.5 + offset) * UNIVERSE_CONFIG.sun.size * 1.2;
        flare.position.set(x, 0, z);
      }
    });
  });

  return (
    <group>
      {/* Sun core */}
      <Sphere ref={sunRef} args={[UNIVERSE_CONFIG.sun.size, 64, 64]}>
        <meshStandardMaterial
          color={UNIVERSE_CONFIG.sun.color}
          emissive={UNIVERSE_CONFIG.sun.color}
          emissiveIntensity={intensity}
          roughness={0.9}
          metalness={0}
        />
      </Sphere>

      {/* Sun corona */}
      <Sphere
        ref={coronaRef}
        args={[UNIVERSE_CONFIG.sun.size * 1.2, 64, 64]}
      >
        <meshBasicMaterial
          color={UNIVERSE_CONFIG.sun.color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Sun glow */}
      <Sphere args={[UNIVERSE_CONFIG.sun.glow.size, 32, 32]}>
        <meshBasicMaterial
          color={UNIVERSE_CONFIG.sun.color}
          transparent
          opacity={UNIVERSE_CONFIG.sun.glow.intensity * intensity}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Solar flares */}
      {[...Array(8)].map((_, i) => (
        <Trail
          key={i}
          width={2}
          length={4}
          color={new THREE.Color(UNIVERSE_CONFIG.sun.color)}
          attenuation={(t) => t * t}
        >
          <mesh
            ref={(el) => {
              if (el) flareRefs.current[i] = el;
            }}
            position={[
              Math.cos((i / 8) * Math.PI * 2) * UNIVERSE_CONFIG.sun.size * 1.2,
              0,
              Math.sin((i / 8) * Math.PI * 2) * UNIVERSE_CONFIG.sun.size * 1.2,
            ]}
          >
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial
              color={UNIVERSE_CONFIG.sun.color}
              transparent
              opacity={0.8 * intensity}
            />
          </mesh>
        </Trail>
      ))}

      {/* Light source */}
      <pointLight
        color={UNIVERSE_CONFIG.sun.color}
        intensity={intensity}
        distance={1000}
        decay={2}
      />
    </group>
  );
}
