/// <reference types="vite/client" />

declare module 'vanta/dist/vanta.halo.min' {
  import type * as THREE from 'three';

  export interface VantaHaloOptions {
    el: HTMLElement | string;
    THREE?: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
    baseColor?: number;
    color2?: number;
    size?: number;
    amplitudeFactor?: number;
    ringFactor?: number;
    rotationFactor?: number;
    xOffset?: number;
    yOffset?: number;
    speed?: number;
    mouseEase?: boolean;
  }

  export interface VantaEffect {
    setOptions: (options: Partial<VantaHaloOptions>) => void;
    resize: () => void;
    destroy: () => void;
  }

  export default function HALO(options: VantaHaloOptions): VantaEffect;
}
