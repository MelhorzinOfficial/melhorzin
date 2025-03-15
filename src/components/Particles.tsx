import React, { memo, useMemo } from 'react';
import { useTheme } from "../contexts/ThemeContext";
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import Particles from 'react-tsparticles';

export const ParticlesR: React.FC = memo(() => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const { theme } = useTheme();

  const handleParticlesLoaded = async (container: Container | undefined): Promise<void> => {
    if (!container) return;
    // Exemplo: adiciona um event listener para remover algumas partículas após um tempo
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

  const options = useMemo(() => ({
    fullScreen: false,
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: {
        // Mescla duas cores dependendo do tema
        value: theme === "dark" ? ["#00eaff", "#ffffff"] : ["#004466", "#000000"],
      },
      links: {
        enable: true,
        distance: 150,
        color: theme === "dark" ? "#ffffff" : "#000000",
        opacity: 0.2,
        width: 1,
        shadow: { enable: false },
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none" as const,
        outModes: { default: "out" as const },
        random: false,
      },
      number: { 
        density: { enable: true, area: 1000 }, 
        value: 30,
      },
      opacity: {
        value: 0.7,
        random: false,
        animation: { enable: false },
      },
      // Usa múltiplos tipos de forma para um efeito inovador
      shape: { type: ["circle"] },
      size: {
        value: { min: 2, max: 5 },
        random: true,
        animation: { enable: false },
      },
      // Efeito de twinkle para dar um brilho pulsante
      twinkle: { particles: { enable: true, frequency: 0.05, opacity: 1 }, links: { enable: false } },
      roll: { enable: false },
      // Rotação ativada com valor aleatório para cada partícula
      rotate: { enable: true, random: true, speed: 5 },
    },
    interactivity: {
      events: {
        // No hover, as partículas se afastam
        onHover: { enable: true, mode: "repulse" },
        // Em clique, novas partículas são adicionadas
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: { 
        push: { quantity: 4 },
        repulse: { distance: 100 }
      },
    },
    detectRetina: true,
  }), [theme]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={handleParticlesLoaded}
      options={options}
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