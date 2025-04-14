"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useHelper } from "@react-three/drei";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { PlanetSidebar } from "./PlanetSidebar";
import { Button } from "@/components/ui/button";
import { X, List } from "lucide-react";

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomSize() {
  return Math.random() * (8 - 3.0) + 3.0;
}

interface Portfolio {
  id: number;
  name: string;
  subdomain: string;
  description: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
}

const portfolios = shuffleArray([
  {
    id: 1,
    name: "Henrique Teixeira",
    subdomain: "henriqueteixeira.dev",
    description: "Desenvolvedor apaixonado por criar soluções criativas com design moderno.",
    color: "#FF4500",
    orbitRadius: 60,
    orbitSpeed: 0.05,
  },
  {
    id: 2,
    name: "Leonardo",
    subdomain: "leonardo",
    description: "Explorador de código que transforma ideias em experiências digitais incríveis.",
    color: "#FFD700",
    orbitRadius: 120,
    orbitSpeed: 0.04,
  },
  {
    id: 3,
    name: "Lk Giovani",
    subdomain: "lkgiovani",
    description: "Desenvolvedor full-stack com projetos inovadores em React e Node.js.",
    color: "#1E90FF",
    orbitRadius: 180,
    orbitSpeed: 0.03,
  },
  {
    id: 4,
    name: "Luiz Bello",
    subdomain: "luizpbello",
    description: "Mestre em construir sistemas robustos e interfaces elegantes.",
    color: "#8A2BE2",
    orbitRadius: 240,
    orbitSpeed: 0.025,
  },
  {
    id: 5,
    name: "Matheus",
    subdomain: "matheusvp2",
    description: "Criador de aplicações dinâmicas com foco em performance e usabilidade.",
    color: "#FF6347",
    orbitRadius: 280,
    orbitSpeed: 0.02,
  },
  {
    id: 6,
    name: "Mathwz",
    subdomain: "mathwz",
    description: "Entusiasta de tecnologia que une criatividade e lógica em cada projeto.",
    color: "#00CED1",
    orbitRadius: 320,
    orbitSpeed: 0.015,
  },
  {
    id: 7,
    name: "Michel",
    subdomain: "micode",
    description: "Arquiteto de software com uma paixão por códigos limpos e eficientes.",
    color: "#FFA500",
    orbitRadius: 360,
    orbitSpeed: 0.01,
  },
  {
    id: 8,
    name: "Railsinho",
    subdomain: "railsinho",
    description: "Especialista em Rails que entrega soluções rápidas e escaláveis.",
    color: "#9370DB",
    orbitRadius: 420,
    orbitSpeed: 0.008,
  },
  {
    id: 9,
    name: "Raposo",
    subdomain: "raposo",
    description: "Desenvolvedor versátil com um toque de inovação em cada linha de código.",
    color: "#20B2AA",
    orbitRadius: 480,
    orbitSpeed: 0.006,
  },
  {
    id: 10,
    name: "Thales Gonçalves",
    subdomain: "thalesgoncalves",
    description: "Visionário tech que constrói o futuro, um commit de cada vez.",
    color: "#C9B2AA",
    orbitRadius: 540,
    orbitSpeed: 0.006,
  },
  {
    id: 11,
    name: "Erick Marllon",
    subdomain: "ErickMarllon",
    description: "Visionário tech que constrói o futuro, um commit de cada vez.",
    color: "#B0AA",
    orbitRadius: 620,
    orbitSpeed: 0.006,
  },
  {
    id: 12,
    name: "Brayan",
    subdomain: "strilgui",
    description: "Visionário tech que constrói o futuro, um commit de cada vez.",
    color: "#20b",
    orbitRadius: 680,
    orbitSpeed: 0.006,
  },
  {
    id: 13,
    name: "Rossado",
    subdomain: "rossado",
    description: "Visionário tech que constrói o futuro, um commit de cada vez.",
    color: "#7000cc",
    orbitRadius: 740,
    orbitSpeed: 0.006,
  },
  {
    id: 14,
    name: "Saron Lujan",
    subdomain: "saronlujan",
    description: "Visionário tech que constrói o futuro, um commit de cada vez.",
    color: "#7000cc",
    orbitRadius: 740,
    orbitSpeed: 0.006,
  },
  {
    id: 15,
    name: "Vitor Lana",
    subdomain: "vitin",
    description: "Visionário tech que constrói o futuro, um commit de cada vez.",
    color: "#7000cc",
    orbitRadius: 740,
    orbitSpeed: 0.006,
  },
]).map((portfolio, index) => ({
  ...portfolio,
  size: getRandomSize(),
  orbitRadius: 30 + index * 20,
  orbitSpeed: 0.05 - index * 0.003,
}));

// Componente para criar órbitas visíveis
function Orbit({ radius, color }: { radius: number; color: string }) {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length} array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  );
}

// Componente para criar nebulosas
function Nebula({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const points = useMemo(() => {
    const pts = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * size;
      const y = (Math.random() - 0.5) * size;
      const z = (Math.random() - 0.5) * size;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [size]);

  return (
    <points position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length} array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.5} transparent opacity={0.3} />
    </points>
  );
}

function BackgroundStars() {
  const { scene } = useThree();
  const starsRef = useRef<THREE.Points>(null!);

  const [geometry, material] = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      vertices.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      sizeAttenuation: true,
    });

    return [geometry, material];
  }, []);

  return <points ref={starsRef} geometry={geometry} material={material} />;
}

interface CameraControllerProps {
  focusTarget: number | null;
  portfolios: Portfolio[];
}

function CameraController({ focusTarget, portfolios }: CameraControllerProps) {
  const { camera, scene } = useThree();
  const controlsRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isFollowingRef = useRef<boolean>(false);

  // Limpar animação quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Efeito de foco no planeta
  useEffect(() => {
    if (focusTarget !== null) {
      isFollowingRef.current = true;

      // Função para animar a câmera seguindo o planeta
      const followPlanet = () => {
        if (!isFollowingRef.current || !controlsRef.current) {
          return;
        }

        const planetMesh = scene.getObjectByName(`planet-${focusTarget}`);
        if (planetMesh) {
          const portfolio = portfolios.find((p) => p.id === focusTarget);
          if (portfolio) {
            // Obter a posição atual do planeta
            const planetPosition = new THREE.Vector3();
            planetMesh.getWorldPosition(planetPosition);

            // Calcular a distância de visualização baseada no tamanho do planeta
            const distance = portfolio.size * 3;

            // Configurar o alvo dos controles para a posição do planeta
            controlsRef.current.target.copy(planetPosition);

            // Mover a câmera para uma posição ligeiramente afastada e acima do planeta
            const cameraTargetPosition = new THREE.Vector3(planetPosition.x + distance * 0.8, planetPosition.y + distance * 0.4, planetPosition.z + distance * 0.8);

            // Suavemente interpolamos a posição da câmera
            camera.position.lerp(cameraTargetPosition, 0.05);

            // Atualizar os controles
            controlsRef.current.update();
          }
        }

        // Continuar o loop de animação
        animationFrameRef.current = requestAnimationFrame(followPlanet);
      };

      // Iniciar o loop de animação
      followPlanet();
    } else {
      // Parar de seguir quando não há planeta selecionado
      isFollowingRef.current = false;
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [focusTarget, camera, scene, portfolios]);

  // Configuração inicial do controle da câmera
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.rotateSpeed = 0.5;
      controlsRef.current.zoomSpeed = 0.7;
      controlsRef.current.minDistance = 15;
      controlsRef.current.maxDistance = 500;
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.1;
    }
  }, []);

  return <OrbitControls ref={controlsRef} enableZoom={true} enablePan={true} enableRotate={true} minDistance={15} maxDistance={500} rotateSpeed={0.5} zoomSpeed={0.7} enableDamping={true} dampingFactor={0.1} />;
}

export default function Universe() {
  const [focusPlanetId, setFocusPlanetId] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleFocusPlanet = (id: number) => {
    setFocusPlanetId(id);
  };

  return (
    <div className="flex h-screen w-screen bg-black overflow-hidden relative">
      {/* Sidebar com lista de planetas */}
      <PlanetSidebar portfolios={portfolios} onSelectPlanet={handleFocusPlanet} isOpen={showSidebar} onToggleOpen={() => setShowSidebar(!showSidebar)} />

      {/* Botão para abrir/fechar a sidebar */}
      <Button variant="outline" size="icon" className={`fixed top-4 ${showSidebar ? "left-[320px]" : "left-4"} z-50 bg-black/80 border border-white/20 transition-all duration-300`} onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
      </Button>

      {/* Indicação do planeta em foco */}
      {focusPlanetId !== null && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 text-white px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: portfolios.find((p) => p.id === focusPlanetId)?.color || "#FFFFFF",
            }}
          />
          <span className="text-sm">Em órbita: {portfolios.find((p) => p.id === focusPlanetId)?.name || "Planeta"}</span>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 ml-2 hover:bg-white/10" onClick={() => setFocusPlanetId(null)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="flex-1">
        <Canvas
          camera={{ position: [0, 40, 100], fov: 60 }}
          gl={{ antialias: true }}
          dpr={[1, 2]} // Melhor performance em dispositivos de alta densidade
          performance={{ min: 0.5 }} // Ajuste de performance
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={1.5} />

          {/* Estrelas de fundo */}
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
          <BackgroundStars />

          {/* Nebulosas coloridas */}
          <Nebula position={[-200, -100, -300]} color="#ff3366" size={200} />
          <Nebula position={[300, 150, -200]} color="#3366ff" size={250} />
          <Nebula position={[-150, 200, 100]} color="#33ff66" size={180} />

          {/* Sol central */}
          <Sun />

          {/* Planetas e órbitas */}
          {portfolios.map((portfolio) => (
            <group key={portfolio.id}>
              <Orbit radius={portfolio.orbitRadius} color={portfolio.color} />
              <Planet id={portfolio.id} name={portfolio.name} subdomain={portfolio.subdomain} description={portfolio.description} color={portfolio.color} size={portfolio.size} orbitRadius={portfolio.orbitRadius} orbitSpeed={portfolio.orbitSpeed} initialRotation={Math.random() * Math.PI * 2} onFocusPlanet={handleFocusPlanet} />
            </group>
          ))}

          <CameraController focusTarget={focusPlanetId} portfolios={portfolios} />
        </Canvas>
      </div>
    </div>
  );
}
