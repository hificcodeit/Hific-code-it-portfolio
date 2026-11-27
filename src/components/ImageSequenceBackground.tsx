import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Film, Play, Pause, RotateCcw, ArrowDownUp, X } from 'lucide-react';

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
    const vNorm = r / (rows - 1) - 0.5;

    for (let c = 0; c < cols; c++) {
      const uNorm = c / (cols - 1) - 0.5;

      const wx = uNorm * 2.2;
      const wz = vNorm * 1.8;
      const wave1 = Math.sin(wx * 3.1 + t) * 0.16;
      const wave2 = Math.cos(wz * 3.6 - t * 1.0) * 0.14;
      const wave3 = Math.sin((wx + wz) * 2.4 + t * 2.0) * 0.07;
      const wy = wave1 + wave2 + wave3 + 0.18;

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
 * 3D cosmic purple/pink/blue frame sequence across all pages, plus a toggleable Tester HUD.
 */
const ImageSequenceBackground: React.FC<ImageSequenceBackgroundProps> = ({ frameUrls }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { pathname } = useLocation();

  const frameCount = frameUrls?.length ?? DEFAULT_FRAME_COUNT;
  const [hudOpen, setHudOpen] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Refs shared with the tester HUD controls
  const drawRef = useRef<(() => void) | null>(null);
  const stateRef = useRef({
    scrollFrame: 0,
    ambientOffset: 0,
    manualFrame: null as number | null,
    mouseX: 0,
    mouseY: 0,
  });
  const loopTweenRef = useRef<gsap.core.Tween | null>(null);
  const autoScrollTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cancelled = false;
    let idleHandle: number | null = null;
    let resizeTimer: number | null = null;
    const frames: Array<HTMLCanvasElement | HTMLImageElement | null> = new Array(frameCount).fill(null);

    const state = stateRef.current;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getBufferDimensions = () => {
      const vw = Math.max(window.innerWidth, 320);
      const vh = Math.max(window.innerHeight, 320);
      const ratio = vw / vh;
      const bufW = Math.min(vw, MAX_BUFFER_WIDTH);
      const bufH = Math.min(Math.round(bufW / ratio), MAX_BUFFER_HEIGHT);
      return { bufW: Math.max(bufW, 320), bufH: Math.max(bufH, 240) };
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

      const activeRaw =
        state.manualFrame !== null
          ? state.manualFrame
          : state.scrollFrame + state.ambientOffset;
      const wrapped = ((Math.round(activeRaw) % frameCount) + frameCount) % frameCount;
      const frame = frames[wrapped] ?? frames[0];

      setCurrentFrame(wrapped);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      if (frame) {
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

    drawRef.current = drawCurrentFrame;

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

      createFrameAt(0);
      drawCurrentFrame();

      if (prefersReducedMotion) return;

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
            onUpdate: (self) => {
              setScrollPercent(Math.round(self.progress * 100));
            },
          },
          onUpdate: drawCurrentFrame,
        });

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
      drawRef.current = null;
      if (idleHandle !== null) window.cancelAnimationFrame(idleHandle);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      loopTweenRef.current?.kill();
      autoScrollTweenRef.current?.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (gsapCtx) gsapCtx.revert();
    };
  }, [frameUrls, frameCount]);

  // Recalculate ScrollTrigger scroll distance whenever the route changes
  useEffect(() => {
    stateRef.current.manualFrame = null;
    loopTweenRef.current?.kill();
    autoScrollTweenRef.current?.kill();
    setIsLooping(false);
    setIsAutoScrolling(false);
    setScrollPercent(0);

    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 420);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const handleScrubSlider = (value: number) => {
    loopTweenRef.current?.kill();
    setIsLooping(false);
    stateRef.current.manualFrame = value;
    drawRef.current?.();
  };

  const handleToggleLoop = () => {
    if (isLooping) {
      loopTweenRef.current?.kill();
      stateRef.current.manualFrame = null;
      setIsLooping(false);
      drawRef.current?.();
      return;
    }

    autoScrollTweenRef.current?.kill();
    setIsAutoScrolling(false);

    const startVal = stateRef.current.manualFrame ?? currentFrame;
    stateRef.current.manualFrame = startVal;
    setIsLooping(true);

    loopTweenRef.current = gsap.to(stateRef.current, {
      manualFrame: startVal + frameCount,
      duration: 3.6,
      repeat: -1,
      ease: 'none',
      onUpdate: () => drawRef.current?.(),
    });
  };

  const handleAutoScrollTest = () => {
    if (isAutoScrolling) {
      autoScrollTweenRef.current?.kill();
      setIsAutoScrolling(false);
      return;
    }

    loopTweenRef.current?.kill();
    setIsLooping(false);
    stateRef.current.manualFrame = null;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 10) {
      // Short pages without vertical scroll fall back to playing the sequence loop
      handleToggleLoop();
      return;
    }

    setIsAutoScrolling(true);
    const scrollObj = { y: window.scrollY };
    const targetY = window.scrollY > maxScroll * 0.5 ? 0 : maxScroll;

    autoScrollTweenRef.current = gsap.to(scrollObj, {
      y: targetY,
      duration: 4.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      },
      onComplete: () => {
        setIsAutoScrolling(false);
      },
    });
  };

  const handleReset = () => {
    loopTweenRef.current?.kill();
    autoScrollTweenRef.current?.kill();
    setIsLooping(false);
    setIsAutoScrolling(false);
    stateRef.current.manualFrame = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    drawRef.current?.();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#05020d]"
      />

      {/* Toggleable Scroll-Sequence Tester HUD */}
      <div className="fixed bottom-6 left-6 z-[200]">
        {!hudOpen ? (
          <button
            type="button"
            onClick={() => setHudOpen(true)}
            aria-label="Open Scroll Animation Tester"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-zinc-950/85 hover:bg-zinc-900/95 backdrop-blur-xl border border-purple-500/35 hover:border-purple-400/60 text-xs font-bold text-white shadow-xl shadow-purple-950/30 transition-all cursor-pointer"
          >
            <Film size={14} className="text-purple-400" />
            <span>Scroll FX</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 font-mono text-[11px]">
              {String(currentFrame + 1).padStart(2, '0')}/{frameCount}
            </span>
          </button>
        ) : (
          <div className="w-72 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border border-purple-500/35 p-4 shadow-2xl shadow-purple-950/40 text-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-white">
                <Film size={14} className="text-purple-400" />
                <span>Sequence Tester</span>
              </div>
              <button
                type="button"
                onClick={() => setHudOpen(false)}
                aria-label="Close Scroll Animation Tester"
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Frame & Scroll Readout */}
            <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5 font-mono">
              <span>
                Frame <strong className="text-purple-300">{String(currentFrame + 1).padStart(2, '0')}</strong> / {frameCount}
              </span>
              <span>
                Scroll <strong className="text-blue-300">{scrollPercent}%</strong>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-75"
                style={{ width: `${Math.round(((currentFrame + 1) / frameCount) * 100)}%` }}
              />
            </div>

            {/* Manual Frame Scrubber */}
            <label className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
              Scrub Frame
            </label>
            <input
              type="range"
              min={0}
              max={frameCount - 1}
              value={currentFrame}
              onChange={(e) => handleScrubSlider(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer mb-3"
            />

            {/* Controls */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleAutoScrollTest}
                className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl font-semibold border transition-all cursor-pointer ${
                  isAutoScrolling
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-zinc-900/80 text-zinc-200 border-zinc-800 hover:border-purple-500/40'
                }`}
              >
                <ArrowDownUp size={12} />
                <span>{isAutoScrolling ? 'Stop' : 'Scroll'}</span>
              </button>

              <button
                type="button"
                onClick={handleToggleLoop}
                className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl font-semibold border transition-all cursor-pointer ${
                  isLooping
                    ? 'bg-pink-600 text-white border-pink-400'
                    : 'bg-zinc-900/80 text-zinc-200 border-zinc-800 hover:border-pink-500/40'
                }`}
              >
                {isLooping ? <Pause size={12} /> : <Play size={12} />}
                <span>{isLooping ? 'Pause' : 'Loop'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-1 px-2 py-2 rounded-xl font-semibold bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageSequenceBackground;
