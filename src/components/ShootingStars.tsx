import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ShootingStars(): React.ReactElement {
  const meteorsRef = useRef<THREE.Group>(null!);
  const meteorRefs = useRef<THREE.Mesh[]>([]);

  // Create multiple meteor trails
  const meteorCount = 20;
  const meteorTrails = useMemo(() => {
    return Array.from({ length: meteorCount }).map(() => {
      const points = [];
      const length = Math.floor(Math.random() * 10) + 10;
      
      for (let i = 0; i < length; i++) {
        points.push(new THREE.Vector3(0, 0, 0));
      }
      
      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  // Initialize meteor positions
  const meteorData = useMemo(() => {
    return Array.from({ length: meteorCount }).map(() => ({
      startPosition: new THREE.Vector3(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000 + 500,
        (Math.random() - 0.5) * 1000
      ),
      direction: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        -Math.random() - 1,
        (Math.random() - 0.5) * 2
      ).normalize(),
      speed: Math.random() * 2 + 1,
      active: false,
      resetTime: Math.random() * 5000
    }));
  }, []);

  useFrame((state, delta) => {
    if (!meteorsRef.current) return;

    meteorData.forEach((meteor, i) => {
      const mesh = meteorRefs.current[i];
      if (!mesh) return;

      if (!meteor.active) {
        meteor.active = Math.random() > 0.995;
        if (meteor.active) {
          mesh.position.copy(meteor.startPosition);
        }
      }

      if (meteor.active) {
        mesh.position.add(meteor.direction.clone().multiplyScalar(meteor.speed));
        
        // Update trail
        const trail = meteorTrails[i];
        const points = trail.points;
        points.shift();
        points.push(mesh.position.clone());
        trail.points = points;

        // Reset meteor if it goes too far
        if (mesh.position.y < -500) {
          meteor.active = false;
          mesh.position.copy(meteor.startPosition);
        }
      }
    });
  });

  return (
    <group ref={meteorsRef}>
      {meteorData.map((_, i) => (
        <group key={i}>
          {/* Meteor head */}
          <mesh
            ref={(el) => {
              if (el) meteorRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Meteor trail */}
          <mesh>
            <tubeGeometry
              args={[
                meteorTrails[i],
                20,
                0.2,
                8,
                false
              ]}
            />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
