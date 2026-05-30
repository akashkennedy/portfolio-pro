"use client";

import React, { useCallback } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const particlesOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab" as const,
      },
    },
    modes: {
      grab: {
        distance: 100,
        links: {
          opacity: 0.25,
        },
      },
    },
  },
  particles: {
    color: {
      value: ["#7F77DD", "#534AB7"],
    },
    links: {
      color: "#7F77DD",
      distance: 120,
      enable: true,
      opacity: 0.08,
      width: 0.5,
    },
    move: {
      direction: "none" as const,
      enable: true,
      outModes: {
        default: "out" as const,
      },
      random: false,
      speed: 0.4,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 60,
    },
    opacity: {
      value: 0.25,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1.5, max: 2.5 },
    },
  },
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: {
            value: 30,
          },
        },
      },
    },
  ],
  detectRetina: true,
};

function ParticlesCanvas() {
  return (
    <div className="absolute inset-0 -z-50 pointer-events-none min-h-screen">
      <Particles
        id="tsparticles"
        className="h-full w-full"
        options={particlesOptions}
      />
    </div>
  );
}

export default function Background() {
  const initEngine = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={initEngine}>
      <ParticlesCanvas />
    </ParticlesProvider>
  );
}
