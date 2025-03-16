import React, { memo, useMemo } from 'react';
import { useTheme } from "../contexts/ThemeContext";
import { loadFull } from 'tsparticles';
import type { Container, Engine, IOptions, RecursivePartial } from 'tsparticles-engine';
import Particles from 'react-tsparticles';
import type { Theme } from "../contexts/ThemeContext";

export const ParticlesR: React.FC = memo(() => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  // Removi setSelectedTheme, visto que não é usado
  const { theme, themeColors } = useTheme();

  const handleParticlesLoaded = async (container: Container | undefined): Promise<void> => {
    if (!container) return;
    container.canvas.element?.addEventListener('click', () => {
      setTimeout(() => {
        const count = container.particles.count;
        const removeCount = Math.floor(count * 0.3);
        for (let i = 0; i < removeCount; i++) {
          const randomIndex = Math.floor(Math.random() * container.particles.count);
          container.particles.removeAt(randomIndex);
        }
      }, 15000);
    });
  };

  // Configurações específicas para cada tema
  const getThemeParticles = (currentTheme: Theme) => {
    switch (currentTheme) {
      case 'light':
        return {
          color: { value: ["#2196F3", "#64B5F6", "#BBDEFB"] },
          links: {
            enable: true,
            distance: 150,
            color: "#90CAF9",
            opacity: 0.4,
            width: 1,
          },
          number: { density: { enable: true, area: 1200 }, value: 40 },
          move: {
            enable: true,
            speed: 1,
            direction: "none" as const,
            outModes: { default: "out" as const },
          },
          shape: { type: ["circle"] },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 4 } },
          twinkle: { particles: { enable: true, frequency: 0.05, opacity: 1 } },
        };
      case 'dark':
        return {
          color: { value: ["#4D7AFF", "#8E24AA", "#00E5FF"] },
          links: {
            enable: true,
            distance: 150,
            color: "#4D7AFF",
            opacity: 0.3,
            width: 1,
          },
          number: { density: { enable: true, area: 1000 }, value: 50 },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none" as const,
            outModes: { default: "out" as const },
            trail: {
              enable: true,
              length: 5,
              fillColor: "#111111",
            },
          },
          shape: { type: ["circle"] },
          opacity: { value: 0.8 },
          size: { value: { min: 1, max: 5 } },
          rotate: { enable: true, value: { min: 0, max: 360 }, animation: { enable: true, speed: 10 } },
        };
      case 'fire':
        return {
          color: { value: ["#F9A826", "#FF7043", "#FFEB3B"] },
          links: {
            enable: true,
            distance: 100,
            color: "#F9A826",
            opacity: 0.3,
            width: 1,
          },
          number: { density: { enable: true, area: 800 }, value: 60 },
          move: {
            enable: true,
            speed: 3,
            direction: "top" as const,
            outModes: { default: "destroy" as const, top: "none" as const },
            gravity: { enable: true, acceleration: -0.2 },
          },
          shape: { type: ["circle", "triangle"] },
          opacity: { value: { min: 0.3, max: 0.8 }, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
          size: { value: { min: 2, max: 6 }, animation: { enable: true, speed: 2, minimumValue: 0.1 } },
          twinkle: { particles: { enable: true, frequency: 0.2, opacity: 1 } },
          life: { duration: { value: 3 }, count: 1 },
          emitters: [
            { direction: "top", position: { x: 50, y: 100 }, rate: { delay: 0.1, quantity: 1 } }
          ],
        };
      case 'water':
        return {
          color: { value: ["#0ACDFF", "#2E8BC0", "#80DEEA"] },
          links: {
            enable: true,
            distance: 150,
            color: "#0ACDFF",
            opacity: 0.3,
            width: 1,
            triangles: { enable: true, opacity: 0.1 }
          },
          number: { density: { enable: true, area: 1000 }, value: 45 },
          move: {
            enable: true,
            speed: 1,
            direction: "none" as const,
            random: true,
            outModes: { default: "bounce" as const },
            path: { enable: true, delay: { value: 0.1 }, options: { size: 5, draw: false } },
          },
          shape: { type: ["circle"] },
          opacity: { value: 0.6, animation: { enable: true, speed: 0.2, minimumValue: 0.3, sync: false } },
          size: { value: { min: 1, max: 4 } },
          twinkle: { particles: { enable: true, frequency: 0.1, opacity: 0.8 } },
          wobble: { enable: true, distance: 5, speed: 5 },
        };
      case 'earth':
        return {
          color: { value: ["#4CAF50", "#8BC34A", "#CDDC39"] },
          links: {
            enable: true,
            distance: 150,
            color: "#4CAF50",
            opacity: 0.3,
            width: 1,
          },
          number: { density: { enable: true, area: 1000 }, value: 60 },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none" as const,
            outModes: { default: "bounce" as const },
            attract: { enable: true, rotateX: 600, rotateY: 1200 },
          },
          shape: { type: ["circle", "square"] },
          opacity: { value: 0.7 },
          size: { value: { min: 2, max: 6 } },
          twinkle: { particles: { enable: true, frequency: 0.05, opacity: 0.7 } },
        };
      case 'air':
        return {
          color: { value: ["#83C5BE", "#FFDDD2", "#E29578"] },
          links: {
        enable: true,
        distance: 200,
        color: "#83C5BE",
        opacity: 0.2,
        width: 0.8,
          },
          number: { density: { enable: true, area: 1500 }, value: 30 },
          move: {
        enable: true,
        speed: 2,
        direction: "none" as const,
        outModes: { default: "out" as const },
        straight: false,
        random: true,
          },
          shape: { type: ["circle"] },
          opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
          size: { value: { min: 1, max: 3 } },
          twinkle: { particles: { enable: false } },
          roll: { enable: true, speed: 5 },
        };
        case 'galactic':
          return {
            color: { value: ["#FFF"] }, // Cor das estrelas e do brilho
            links: {
              enable: true, // Desabilitado para focar nas partículas
              distance: 10,
              opacity: 22,
              width: 0.2,
              shadow: { enable: false },
            },
            number: {
              density: { enable: true, area: 2000 }, // Densidade ajustada para maior agrupamento de partículas
              value: 50, // Menos partículas para diminuir o efeito de congestionamento
            },
            move: {
              enable: true,
              speed: 20, // Velocidade ajustada para um movimento mais suave
              direction: "none" as const, // Direção aleatória
              outModes: { default: "out" }, // Recocheteamento nas bordas
              random: true,
              trail: {
                enable: true, // Ativando rastro para algumas partículas
                length: 3, // Tamanho do rastro
                fillColor: themeColors.background, // Cor do rastro
              },
            },
            shape: { type: "circle" }, // Formato de estrela com círculos
            opacity: {
              value: 1, // Opacidade mais alta para uma aparência mais brilhante
              animation: {
                enable: true,
                speed: 0.1, // A opacidade diminui de forma suave
                minimumValue: 0.01, // Opacidade mínima do rastro
              },
            },
            size: {
              value: { min: 1, max: 2 }, // Tamanho das partículas
              animation: { enable: true, speed: 1, minimumValue: 1 },
            },
            twinkle: {
              particles: { enable: true, frequency: 0.05, opacity: 1 }, // Partículas brilhantes
              lines: { enable: false },
            },
            rotate: {
              enable: true,
              value: { min: 0, max: 660 },
              animation: { enable: true, speed: 300, sync: false }, // Rotação mais suave
            },
            orbit: {
              enable: true,
              opacity: 2000, // Opacidade das órbitas
              width: 20,
              rotation: {
                random:   true, // Rotação aleatória
                value: 180, // Rotação em 90 graus
                animation: {
                  enable: true,
                  speed: 200, // Reduzido para uma rotação mais lenta e visível
                  sync: true,
                },
              },
            },
            life: {
              enable: true,
              duration: 3, // Duração das partículas
              count: 1,
              delay: 0,
            },
            trail: {
              enable: true, // Ativando o rastro
              length: 3, // Menor comprimento de rastro
              opacity: 0.3, // Opacidade reduzida para tornar os rastros mais suaves
              width: 0.5, // Largura do rastro
            },
          };
      
      default:
        return {
          color: { value: ["#2196F3", "#64B5F6", "#BBDEFB"] },
          links: {
            enable: true,
            distance: 150,
            color: "#90CAF9",
            opacity: 0.4,
            width: 1,
          },
          number: { density: { enable: true, area: 1200 }, value: 40 },
          move: {
            enable: true,
            speed: 1,
            direction: "none" as const,
            outModes: { default: "out" as const },
          },
          shape: { type: ["circle"] },
          opacity: { value: 0.6 },
          size: { value: { min: 1, max: 4 } },
          twinkle: { particles: { enable: true, frequency: 0.05, opacity: 1 } },
        };
    }
  };

  const options = useMemo(() => {
    const themeParticles = getThemeParticles(theme);

    return {
      fullScreen: false,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        ...themeParticles,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: theme === 'fire'
                ? "bubble"
                : theme === 'water'
                  ? "connect"
                  : "repulse"
            },
            onClick: {
              enable: true,
              mode: theme === 'earth'
                ? "trail"
                : theme === 'galactic'
                  ? "attract"
                  : "push"
            },
            resize: true,
          },
          modes: {
            attract: { distance: 100, duration: 0.4, factor: 3 },
            bubble: { distance: 200, size: 12, duration: 2 },
            connect: { distance: 80, links: { opacity: 0.5 }, radius: 60 },
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
            // Foi substituído "themes[theme].accent" por "themeColors.accent"
            trail: { delay: 0.005, quantity: 5, particles: { color: { value: themeColors.accent }, size: { value: 2 } } },
          },
        },
      },
      detectRetina: true,
    };
  }, [theme, themeColors]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={handleParticlesLoaded}
      options={options as RecursivePartial<IOptions>}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
});