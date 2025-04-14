"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Criar textura de brilho para o sol
  const glowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 200, 0, 0.8)");
      gradient.addColorStop(0.4, "rgba(255, 150, 0, 0.6)");
      gradient.addColorStop(0.6, "rgba(255, 100, 0, 0.4)");
      gradient.addColorStop(1, "rgba(255, 50, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }

    if (glowRef.current) {
      glowRef.current.rotation.z += 0.002;
      glowRef.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      glowRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Sol central */}
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={() => window.open("https://github.com/RaposoG/melhorzin", "_blank")}
      >
        <Sphere args={[15, 64, 64]}>
          <meshStandardMaterial color={new THREE.Color("#FDB813")} emissive={new THREE.Color("#FDB813")} emissiveIntensity={1} roughness={0.7} metalness={0.3} />
        </Sphere>

        {/* Efeito de brilho ao redor do sol */}
        <Sphere args={[15.5, 64, 64]}>
          <meshBasicMaterial color={new THREE.Color("#FDB813")} transparent={true} opacity={0.3} />
        </Sphere>

        {/* Efeito de brilho pulsante */}
        <mesh ref={glowRef}>
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial map={glowTexture} transparent={true} opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>

        <pointLight color="#FDB813" intensity={1.5} distance={100} decay={2} />
      </mesh>

      {/* Informações ao passar o mouse */}
      {hovered && (
        <Html distanceFactor={15} position={[0, 25, 0]}>
          <div className="bg-black/90 text-white p-6 rounded-xl shadow-2xl border border-white/20 backdrop-blur-md w-[400px]">
            <h3 className="font-bold text-2xl mb-2">Repositório Melhorzin</h3>
            <p className="text-sm text-white/80 mb-4">O coração do nosso universo de talentos. Aqui convergem todas as habilidades e projetos da nossa equipe.</p>
            <Button variant="default" className="w-full" onClick={() => window.open("https://github.com/RaposoG/melhorzin", "_blank")}>
              Visitar Repositório
            </Button>
          </div>
        </Html>
      )}
    </group>
  );
}
