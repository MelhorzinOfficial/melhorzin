"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { PlanetSidebar } from "./PlanetSidebar";
import { UniverseControls } from "./UniverseControls";
import { WebsitePreview } from "./WebsitePreview";
import { UNIVERSE_CONFIG } from "@/config/universe.config";
import { portfolioData } from "@/data/portfolios";
import { AsteroidBelt } from "./AsteroidBelt";
import { ShootingStars } from "./ShootingStars";
import { DiscordButton } from "./DiscordButton";

// Orbit Component [Previous implementation remains the same...]
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
        <bufferAttribute args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]} attach="attributes-position" count={points.length} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  );
}

// Nebula Component [Previous implementation remains the same...]
function Nebula({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const points = useMemo(() => {
    const pts = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size,
        (Math.random() - 0.5) * size
      ));
    }
    return pts;
  }, [size]);

  return (
    <points position={position}>
      <bufferGeometry>
        <bufferAttribute args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]} attach="attributes-position" count={points.length} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.5} transparent opacity={0.3} />
    </points>
  );
}

// Background Stars [Previous implementation remains the same...]
function BackgroundStars() {
  const { scene } = useThree();
  const starsRef = useRef<THREE.Points>(null!);

  const [geometry, material] = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 10000; i++) {
      vertices.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
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

// Camera Controller [Previous implementation remains the same...]
function CameraController({ focusTarget, portfolios }: { focusTarget: number | null; portfolios: typeof portfolioData }) {
  const { camera, scene } = useThree();
  const controlsRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isFollowingRef = useRef<boolean>(false);

  useEffect(() => {
    const cleanup = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    if (focusTarget !== null) {
      isFollowingRef.current = true;

      const followPlanet = () => {
        if (!isFollowingRef.current || !controlsRef.current) return;

        const planetMesh = scene.getObjectByName(`planet-${focusTarget}`);
        if (planetMesh) {
          const portfolio = portfolios.find((p) => p.id === focusTarget);
          if (portfolio) {
            const planetPosition = new THREE.Vector3();
            planetMesh.getWorldPosition(planetPosition);

            const distance = (portfolio.size || 5) * 3;
            controlsRef.current.target.copy(planetPosition);

            const cameraTargetPosition = new THREE.Vector3(
              planetPosition.x + distance * 0.8,
              planetPosition.y + distance * 0.4,
              planetPosition.z + distance * 0.8
            );

            camera.position.lerp(cameraTargetPosition, 0.05);
            controlsRef.current.update();

            animationFrameRef.current = requestAnimationFrame(followPlanet);
          }
        }
      };

      followPlanet();
    } else {
      isFollowingRef.current = false;
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
      }
    }

    return cleanup;
  }, [camera, focusTarget, portfolios, scene]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.1;
    }
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      {...UNIVERSE_CONFIG.camera.controls}
    />
  );
}

export default function Universe() {
  const [focusPlanetId, setFocusPlanetId] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [globalSpeed, setGlobalSpeed] = useState(1);
  const [sunIntensity, setSunIntensity] = useState(1.5);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showNebulas, setShowNebulas] = useState(true);
  const [portfolios, setPortfolios] = useState(portfolioData);

  const handleFocusPlanet = (id: number) => {
    setFocusPlanetId(id);
    setShowPreview(true);
  };

  return (
    <div className="fixed inset-0 isolate overflow-hidden">
      <DiscordButton />
      
      {/* Layer 1: Universe Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{
            position: UNIVERSE_CONFIG.camera.initial.position,
            fov: UNIVERSE_CONFIG.camera.initial.fov,
          }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 100, 400]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={1.5} />

          <Stars
            radius={UNIVERSE_CONFIG.stars.radius}
            depth={UNIVERSE_CONFIG.stars.depth}
            count={UNIVERSE_CONFIG.stars.count}
            factor={UNIVERSE_CONFIG.stars.factor}
            saturation={UNIVERSE_CONFIG.stars.saturation}
            fade
            speed={UNIVERSE_CONFIG.stars.speed}
          />
          <BackgroundStars />
          <ShootingStars />
          <AsteroidBelt radius={65} width={20} count={3000} />

          {showNebulas && UNIVERSE_CONFIG.nebulas.map((nebula, index) => (
            <Nebula key={index} position={nebula.position} color={nebula.color} size={nebula.size} />
          ))}

          <Sun intensity={sunIntensity} />

          {portfolios.map((portfolio) => (
            portfolio.visible !== false && (
              <group key={portfolio.id}>
                {showOrbits && (
                  <Orbit radius={portfolio.orbitRadius!} color={portfolio.color} />
                )}
                <Planet
                  {...portfolio}
                  initialRotation={Math.random() * Math.PI * 2}
                  globalSpeed={globalSpeed}
                  onFocusPlanet={handleFocusPlanet}
                />
              </group>
            )
          ))}

          <CameraController focusTarget={focusPlanetId} portfolios={portfolios} />

          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              kernelSize={3}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Layer 2: Sidebar */}
      <div className="absolute inset-y-0 left-0 z-10">
        <PlanetSidebar
          portfolios={portfolios}
          onSelectPlanet={handleFocusPlanet}
          isOpen={showSidebar}
          onToggleOpen={() => setShowSidebar(!showSidebar)}
        />
      </div>

      {/* Layer 3: Controls */}
      <div className="absolute inset-y-0 right-0 z-20">
        <UniverseControls
          portfolios={portfolios}
          onUpdatePlanetSpeed={(id, speed) => {
            setPortfolios(prev =>
              prev.map(p => p.id === id ? { ...p, orbitSpeed: speed } : p)
            );
          }}
          onUpdatePlanetSize={(id, size) => {
            setPortfolios(prev =>
              prev.map(p => p.id === id ? { ...p, size } : p)
            );
          }}
          onTogglePlanetVisibility={(id) => {
            setPortfolios(prev =>
              prev.map(p => p.id === id ? { ...p, visible: p.visible === false ? true : false } : p)
            );
          }}
          onUpdateGlobalSpeed={setGlobalSpeed}
          onToggleOrbitLines={() => setShowOrbits(!showOrbits)}
          onToggleNebulas={() => setShowNebulas(!showNebulas)}
          onUpdateSunIntensity={setSunIntensity}
          isOpen={showControls}
          onToggleOpen={() => setShowControls(!showControls)}
        />
      </div>

      {/* Layer 4: Website Preview */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <WebsitePreview
          portfolio={portfolios.find(p => p.id === focusPlanetId) || null}
          onClose={() => setShowPreview(false)}
          isVisible={showPreview}
        />
      </div>
    </div>
  );
}
