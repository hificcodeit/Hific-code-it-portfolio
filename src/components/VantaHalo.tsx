import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import HALO, { VantaEffect } from 'vanta/dist/vanta.halo.min';

/**
 * VantaHalo Component
 * Renders an interactive 3D WebGL Halo background across all pages,
 * tuned to match hifi_codeit's dark purple/pink/blue theme.
 */
const VantaHalo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Expose THREE on window because Vanta's internal shader helpers read window.THREE
    (window as Window & { THREE?: typeof THREE }).THREE = THREE;

    let vantaEffect: VantaEffect | null = null;

    try {
      vantaEffect = HALO({
        el,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        // Deep obsidian-violet canvas & purple/magenta/indigo halo matching site theme
        backgroundColor: 0x05020d,
        baseColor: 0x6b21a8,
        color2: 0x3b82f6,
        size: 1.35,
        amplitudeFactor: 1.15,
        xOffset: 0.0,
        yOffset: 0.0,
        speed: 1.0,
        mouseEase: true,
      });
    } catch (err) {
      // Fallback gracefully to the container's dark CSS background if WebGL is unavailable
      console.warn('[VantaHalo] WebGL initialization skipped:', err);
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none bg-[#05020d]"
    />
  );
};

export default VantaHalo;
