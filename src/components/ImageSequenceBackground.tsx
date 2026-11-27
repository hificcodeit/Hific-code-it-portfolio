import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceBackgroundProps {
  /** Optional array of external image URLs (e.g. /frames/frame_0001.webp ...). When omitted, a themed 3D sequence is generated. */
  frameUrls?: string[];
}

const DEFAULT_FRAME_COUNT = 60;
const MAX_BUFFER_WIDTH = 960;
const MAX_BUFFER_HEIGHT = 540;

interface SeedParticle {
  baseAngle: number;
  radius: number;
  yBase: number;
  zDepth: number;
  size: number;
  hue: 'purple' | 'pink' | 'blue';
  speedMul: number;
}

const PARTICLES: SeedParticle[] = Array.from({ length: 48 }, (_, i) => {
  const s1 = Math.sin(i * 12.9898) * 43758.5453;
  const s2 = Math.sin(i * 78.233) * 19341.123;
  const s3 = Math.sin(i * 45.164) * 91823.431;
  const r1 = s1 - Math.floor(s1);
  const r2 = s2 - Math.floor(s2);
  const r3 = s3 - Math.floor(s3);
  const hues: Array<'purple' | 'pink' | 'blue'> = ['purple', 'pink', 'blue'];

  return {
    baseAngle: r1 * Math.PI * 2,
    radius: 0.25 + r2 * 0.65,
    yBase: (r3 - 0.5) * 1.1,
    zDepth: 0.2 + r2 * 0.9,
    size: 1.5 + r3 * 3.5,
    hue: hues[i % 3],
    speedMul: 0.6 + r1 * 0.8,
  };
});

/**
 * Renders a single frame of the themed 3D cosmic purple/pink/blue wave-mesh & particle sequence
 * onto an offscreen canvas buffer for smooth GSAP ScrollTrigger playback.
 */
function renderSequenceFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number
): void {
  const t = progress * Math.PI * 2;

  // 1. Deep cosmic obsidian base
  ctx.fillStyle = '#05020d';
  ctx.fillRect(0, 0, w, h);

  // 2. Orbiting ambient nebula glows (purple, blue, magenta)
  const glowConfigs = [
    {
      cx: w * (0.28 + Math.cos(t) * 0.14),
      cy: h * (0.32 + Math.sin(t) * 0.12),
      r: Math.max(w, h) * 0.55,
      colorInner: 'rgba(147, 51, 234, 0.20)',
      colorMid: 'rgba(88, 28, 135, 0.08)',
    },
    {
      cx: w * (0.74 + Math.cos(t + 2.1) * 0.14),
      cy: h * (0.64 + Math.sin(t + 2.1) * 0.14),
      r: Math.max(w, h) * 0.5,
      colorInner: 'rgba(59, 130, 246, 0.16)',
      colorMid: 'rgba(37, 99, 235, 0.06)',
    },
    {
      cx: w * (0.52 + Math.sin(t * 0.5) * 0.18),
      cy: h * (0.52 + Math.cos(t) * 0.1),
      r: Math.max(w, h) * 0.42,
      colorInner: 'rgba(236, 72, 153, 0.11)',
      colorMid: 'rgba(168, 85, 247, 0.04)',
    },
  ];

  for (const g of glowConfigs) {
    const grad = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.r);
    grad.addColorStop(0, g.colorInner);
    grad.addColorStop(0.5, g.colorMid);
    grad.addColorStop(1, 'rgba(5, 2, 13, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  // 3. 3D Perspective-Projected Flowing Ribbon Wave Mesh
  const cols = 32;
  const rows = 14;
  const fov = 460;
  const yaw = Math.sin(t * 0.5) * 0.28 - 0.15;
  const pitch = 0.42 + Math.cos(t * 0.5) * 0.08;
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const cosP = Math.cos(pitch);
  const sinP = Math.sin(pitch);

  const projected: Array<Array<{ x: number; y: number; depth: number }>> = [];
  const scaleBase = Math.min(w, h) * 0.95;

  for (let r = 0; r < rows; r++) {
    const rowArr: Array<{ x: number; y: number; depth: number }> = [];
    const vNorm = r / (rows - 1) - 0.5; // -0.5 .. 0.5

    for (let c = 0; c < cols; c++) {
      const uNorm = c / (cols - 1) - 0.5; // -0.5 .. 0.5

      const wx = uNorm * 2.2;
      const wz = vNorm * 1.8;
      // Multi-harmonic 3D wave surface morphing smoothly across sequence frames
      const wave1 = Math.sin(wx * 3.1 + t) * 0.16;
      const wave2 = Math.cos(wz * 3.6 - t * 1.0) * 0.14;
      const wave3 = Math.sin((wx + wz) * 2.4 + t * 2.0) * 0.07;
      const wy = wave1 + wave2 + wave3 + 0.18;

      // Rotate around Y (yaw) then X (pitch)
      const rx = wx * cosY - wz * sinY;
      const rz1 = wx * sinY + wz * cosY;
      const ry = wy * cosP - rz1 * sinP;
      const rz = wy * sinP + rz1 * cosP + 2.4;

      const perspective = fov / (fov + rz * 190);
      const sx = w * 0.5 + rx * scaleBase * perspective;
      const sy = h * 0.56 + ry * scaleBase * perspective;

      rowArr.push({ x: sx, y: sy, depth: rz });
    }
    projected.push(rowArr);
  }

  // Draw latitude ribbon curves
  ctx.lineCap = 'round';
  for (let r = 0; r < rows; r++) {
    const rowRatio = r / (rows - 1);
    const alpha = 0.09 + Math.sin(rowRatio * Math.PI) * 0.22;

    const lineGrad = ctx.createLinearGradient(0, h * 0.3, w, h * 0.8);
    lineGrad.addColorStop(0, `rgba(168, 85, 247, ${alpha})`);
    lineGrad.addColorStop(0.5, `rgba(236, 72, 153, ${alpha * 1.15})`);
    lineGrad.addColorStop(1, `rgba(59, 130, 246, ${alpha})`);

    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1.1 + rowRatio * 0.8;
    ctx.beginPath();

    for (let c = 0; c < cols; c++) {
      const pt = projected[r][c];
      if (c === 0) {
        ctx.moveTo(pt.x, pt.y);
      } else {
        const prev = projected[r][c - 1];
        const mx = (prev.x + pt.x) * 0.5;
        const my = (prev.y + pt.y) * 0.5;
        ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
      }
    }
    ctx.stroke();
  }

  // Subtle cross-meridian links & glowing crest nodes
  for (let c = 0; c < cols; c += 2) {
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.075)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let r = 0; r < rows; r++) {
      const pt = projected[r][c];
      if (r === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
  }

  for (let r = 1; r < rows - 1; r += 2) {
    for (let c = 1; c < cols - 1; c += 3) {
      const pt = projected[r][c];
      const depthAlpha = Math.max(0.08, Math.min(0.45, 1.3 - pt.depth * 0.35));
      ctx.fillStyle =
        (r + c) % 2 === 0
          ? `rgba(192, 132, 252, ${depthAlpha})`
          : `rgba(96, 165, 250, ${depthAlpha})`;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 4. Orbital 3D depth particles
  for (const p of PARTICLES) {
    const angle = p.baseAngle + t * p.speedMul * 0.5;
    const px = Math.cos(angle) * p.radius * w * 0.52 + w * 0.5;
    const py = (p.yBase + Math.sin(angle * 0.7) * 0.14) * h * 0.5 + h * 0.5;
    const alpha = 0.14 + (1 - p.zDepth) * 0.25;

    ctx.fillStyle =
      p.hue === 'purple'
        ? `rgba(168, 85, 247, ${alpha})`
        : p.hue === 'pink'
          ? `rgba(236, 72, 153, ${alpha})`
          : `rgba(59, 130, 246, ${alpha})`;
    ctx.beginPath();
    ctx.arc(px, py, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * ImageSequenceBackground Component
 * Uses GSAP + ScrollTrigger + HTML5 Canvas to scrub through a pre-rendered
 * 3D cosmic purple/pink/blue frame sequence across all pages of the site.
 */
const ImageSequenceBackground: React.FC<ImageSequenceBackgroundProps> = ({ frameUrls }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cancelled = false;
    let idleHandle: number | null = null;
    let resizeTimer: number | null = null;
    const frameCount = frameUrls?.length ?? DEFAULT_FRAME_COUNT;
    const frames: Array<HTMLCanvasElement | HTMLImageElement | null> = new Array(frameCount).fill(null);

    const state = {
      scrollFrame: 0,
      ambientOffset: 0,
      mouseX: 0,
      mouseY: 0,
    };

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getBufferDimensions = () => {
      const vw = Math.max(window.innerWidth, 320);
      const vh = Math.max(window.innerHeight, 320);
      const ratio = vw / vh;
      const bufW = Math.min(vw, MAX_BUFFER_WIDTH);
      const bufH = Math.min(Math.round(bufW / ratio), MAX_BUFFER_HEIGHT);
      return { vw, vh, bufW: Math.max(bufW, 320), bufH: Math.max(bufH, 240) };
    };

    const drawCurrentFrame = () => {
      if (cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(window.innerWidth * dpr);
      const targetH = Math.round(window.innerHeight * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const rawIndex = state.scrollFrame + state.ambientOffset;
      const wrapped = ((Math.round(rawIndex) % frameCount) + frameCount) % frameCount;
      const frame = frames[wrapped] ?? frames[0];

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      if (frame) {
        // Slight overscan (1.03x) allows smooth cursor parallax without edge clipping
        const overscan = 1.03;
        const drawW = canvas.width * overscan;
        const drawH = canvas.height * overscan;
        const offsetX = (canvas.width - drawW) * 0.5 + state.mouseX * dpr;
        const offsetY = (canvas.height - drawH) * 0.5 + state.mouseY * dpr;
        ctx.drawImage(frame, offsetX, offsetY, drawW, drawH);
      } else {
        ctx.fillStyle = '#05020d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const buildFrames = () => {
      if (frameUrls && frameUrls.length > 0) {
        frameUrls.forEach((url, idx) => {
          const img = new Image();
          img.onload = () => {
            if (cancelled) return;
            frames[idx] = img;
            if (idx === 0) drawCurrentFrame();
          };
          img.src = url;
        });
        return;
      }

      const { bufW, bufH } = getBufferDimensions();

      const createFrameAt = (index: number) => {
        const offscreen = document.createElement('canvas');
        offscreen.width = bufW;
        offscreen.height = bufH;
        const offCtx = offscreen.getContext('2d');
        if (offCtx) {
          renderSequenceFrame(offCtx, bufW, bufH, index / frameCount);
        }
        frames[index] = offscreen;
      };

      // Render frame 0 immediately for instant first paint
      createFrameAt(0);
      drawCurrentFrame();

      if (prefersReducedMotion) return;

      // Progressively populate remaining sequence frames without blocking main thread
      let cursor = 1;
      const populateBatch = () => {
        if (cancelled) return;
        const batchEnd = Math.min(cursor + 4, frameCount);
        while (cursor < batchEnd) {
          createFrameAt(cursor);
          cursor++;
        }
        if (cursor < frameCount) {
          idleHandle = window.requestAnimationFrame(populateBatch);
        }
      };
      idleHandle = window.requestAnimationFrame(populateBatch);
    };

    buildFrames();

    // GSAP ScrollTrigger scrubs the image sequence across the full page scroll
    let gsapCtx: gsap.Context | null = null;
    if (!prefersReducedMotion) {
      gsapCtx = gsap.context(() => {
        gsap.to(state, {
          scrollFrame: frameCount - 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
          onUpdate: drawCurrentFrame,
        });

        // Subtle continuous ambient motion so short pages (e.g. Contact) remain alive
        gsap.to(state, {
          ambientOffset: 6,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          onUpdate: drawCurrentFrame,
        });
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      gsap.to(state, {
        mouseX: -nx * 18,
        mouseY: -ny * 12,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: drawCurrentFrame,
      });
    };

    const handleResize = () => {
      drawCurrentFrame();
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!cancelled && !frameUrls) {
          buildFrames();
          ScrollTrigger.refresh();
        }
      }, 250);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      if (idleHandle !== null) window.cancelAnimationFrame(idleHandle);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (gsapCtx) gsapCtx.revert();
    };
  }, [frameUrls]);

  // Recalculate ScrollTrigger scroll distance whenever the route changes
  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 420);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#05020d]"
    />
  );
};

export default ImageSequenceBackground;
