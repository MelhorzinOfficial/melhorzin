"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink, X } from "lucide-react";

interface PlanetProps {
  id: number;
  name: string;
  subdomain: string;
  description: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  initialRotation: number;
  onFocusPlanet: (id: number) => void;
}

export function Planet({ id, name, subdomain, description, color, size, orbitRadius, orbitSpeed, initialRotation, onFocusPlanet }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewLoading, setPreviewLoading] = useState(true);
  const [previewError, setPreviewError] = useState(false);

  // Gerar uma imagem de preview do site
  useEffect(() => {
    // Inicialmente define um placeholder
    const colorCode = color.replace("#", "");
    const contrastColor = isLightColor(color) ? "000000" : "FFFFFF";
    const placeholderUrl = `https://placehold.co/800x600/${colorCode}/${contrastColor}?text=Carregando...`;
    setPreviewUrl(placeholderUrl);

    // Tenta carregar um screenshot real do site
    const fetchScreenshot = async () => {
      try {
        // Usar um serviço de captura de tela
        const screenshotUrl = `https://api.apiflash.com/v1/urltoimage?access_key=38a824c737db490ca0853318356f603f&url=https://${subdomain}.melhorzin.com&format=jpeg&quality=70&width=800&height=600`;

        // Verificar se a imagem carrega corretamente
        const img = new Image();
        img.onload = () => {
          setPreviewUrl(screenshotUrl);
          setPreviewLoading(false);
        };

        img.onerror = () => {
          // Fallback para o placeholder se o screenshot falhar
          const fallbackUrl = `https://placehold.co/800x600/${colorCode}/${contrastColor}?text=${name.replace(/ /g, "+")}`;
          setPreviewUrl(fallbackUrl);
          setPreviewLoading(false);
          setPreviewError(true);
        };

        img.src = screenshotUrl;
      } catch (error) {
        // Fallback para o placeholder em caso de erro
        const fallbackUrl = `https://placehold.co/800x600/${colorCode}/${contrastColor}?text=${name.replace(/ /g, "+")}`;
        setPreviewUrl(fallbackUrl);
        setPreviewLoading(false);
        setPreviewError(true);
      }
    };

    fetchScreenshot();
  }, [color, name, subdomain]);

  // Determinar se uma cor é clara para escolher o texto contrastante
  const isLightColor = (hexColor: string) => {
    // Remove o # se existir
    hexColor = hexColor.replace("#", "");

    // Converter para RGB
    const r = parseInt(hexColor.substr(0, 2), 16) || 0;
    const g = parseInt(hexColor.substr(2, 2), 16) || 0;
    const b = parseInt(hexColor.substr(4, 2), 16) || 0;

    // Calcular a luminância (fórmula aproximada)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Se a luminância é maior que 0.5, é considerada uma cor clara
    return luminance > 0.5;
  };

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();

      if (!hovered) {
        meshRef.current.position.x = Math.sin(t * orbitSpeed + initialRotation) * orbitRadius;
        meshRef.current.position.z = Math.cos(t * orbitSpeed + initialRotation) * orbitRadius;
        meshRef.current.rotation.y += 0.01;
      }
    }
  });

  const openSite = () => {
    window.open(`https://${subdomain}.melhorzin.com`, "_blank");
  };

  return (
    <mesh
      ref={meshRef}
      name={`planet-${id}`}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={() => {
        onFocusPlanet(id);
        setShowPreview(true);
      }}
    >
      <Sphere args={[size, 32, 32]}>
        <meshStandardMaterial color={new THREE.Color(color)} emissive={new THREE.Color(color)} emissiveIntensity={hovered ? 0.8 : 0.3} roughness={0.7} metalness={0.3} />
      </Sphere>

      {/* Efeito de brilho ao redor do planeta quando hover */}
      {hovered && (
        <Sphere args={[size * 1.1, 32, 32]}>
          <meshBasicMaterial color={new THREE.Color(color)} transparent={true} opacity={0.2} />
        </Sphere>
      )}

      {/* Preview do site com imagem placeholder */}
      {showPreview && (
        <Html distanceFactor={15} position={[0, size * 2, 0]} transform occlude>
          <div className="bg-black/90 text-white p-6 rounded-xl shadow-2xl border border-white/20 backdrop-blur-md w-[700px] flex flex-col scale-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-2xl">{name}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-black/50 border-white/20 text-white hover:bg-white/10" onClick={() => setShowPreview(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Fechar
                </Button>
                <Button variant="default" size="sm" onClick={openSite}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visitar Site
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-lg border border-white/10 mb-4 flex flex-col">
              <div className="h-[350px] w-full bg-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
                {/* Indicador de carregamento */}
                {previewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                    <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Imagem de preview */}
                <img src={previewUrl} alt={`Preview de ${name}`} className="max-w-full max-h-full object-contain rounded-md" />

                {/* Indicador de erro (opcional) */}
                {previewError && <div className="absolute bottom-4 right-4 bg-black/70 text-xs text-white/70 px-2 py-1 rounded">Preview não disponível</div>}
              </div>

              <div className="flex-1 p-4 bg-black/70">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-medium">{subdomain}.melhorzin.com</span>
                </div>
                <p className="text-sm text-white/80">{description}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-black/50 border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  onFocusPlanet(id);
                  setShowPreview(false);
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                Orbitar Planeta
              </Button>

              <Button variant="default" className="flex-1" onClick={openSite}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Visitar Site
              </Button>
            </div>
          </div>
        </Html>
      )}

      {/* Informações básicas ao passar o mouse */}
      {hovered && !showPreview && (
        <Html distanceFactor={15} position={[0, size * 1.5, 0]} transform occlude>
          <div className="bg-black/80 text-white p-6 rounded-lg shadow-xl border border-white/20 backdrop-blur-sm w-96">
            <h3 className="font-bold text-2xl mb-3">{name}</h3>
            <p className="text-sm text-white/80 mb-4">{description}</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="default"
                className="flex-1 bg-black/50 border-white/20 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onFocusPlanet(id);
                }}
              >
                <Eye className="h-5 w-5 mr-2" />
                Seguir Planeta
              </Button>
              <Button
                variant="default"
                size="default"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  openSite();
                }}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Visitar
              </Button>
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
}
