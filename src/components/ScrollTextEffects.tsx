import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits plain text nodes inside an element into wrapped word spans while preserving
 * child elements like <br /> and highlighted <span> tags.
 */
function wrapWordsInElement(el: HTMLElement): HTMLElement[] {
  if (el.dataset.gsapSplit === 'true') {
    return Array.from(el.querySelectorAll<HTMLElement>('.gsap-scroll-word'));
  }

  const wordEls: HTMLElement[] = [];
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? '';
      if (!text.trim()) return;

      const frag = document.createDocumentFragment();
      const tokens = text.split(/(\s+)/);
      for (const token of tokens) {
        if (!token) continue;
        if (/^\s+$/.test(token)) {
          frag.appendChild(document.createTextNode(token));
        } else {
          const outer = document.createElement('span');
          outer.className = 'inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]';

          const inner = document.createElement('span');
          inner.className = 'gsap-scroll-word inline-block will-change-transform';
          inner.textContent = token;

          outer.appendChild(inner);
          frag.appendChild(outer);
          wordEls.push(inner);
        }
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes);
      for (const child of children) {
        walk(child);
      }
    }
  };

  walk(el);
  el.dataset.gsapSplit = 'true';
  return wordEls;
}

/**
 * ScrollTextEffects Component
 * Mounts inside the active route container in Layout.tsx and applies GSAP ScrollTrigger
 * text animations (`split-words`, `reveal`, `hero-parallax`) across all pages.
 */
const ScrollTextEffects: React.FC = () => {
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let ctx: gsap.Context | null = null;

    // Wait for Framer Motion page-enter transition (~360ms) so DOM positions are settled
    const timer = window.setTimeout(() => {
      ctx = gsap.context(() => {
        // 1. Word-by-word kinetic scroll reveal for section headings
        const splitEls = document.querySelectorAll<HTMLElement>('[data-scroll-text="split-words"]');
        splitEls.forEach((el) => {
          const words = wrapWordsInElement(el);
          if (words.length === 0) return;

          gsap.fromTo(
            words,
            { yPercent: 115, opacity: 0, rotateX: -20 },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.75,
              stagger: 0.055,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // 2. Smooth blur + upward reveal on scroll for paragraphs and subheadings
        const revealEls = document.querySelectorAll<HTMLElement>('[data-scroll-text="reveal"]');
        revealEls.forEach((el, idx) => {
          gsap.fromTo(
            el,
            {
              y: 26,
              opacity: 0,
              filter: 'blur(6px)',
            },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              delay: (idx % 2) * 0.06,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // 3. Scroll-scrubbed subtle parallax drift on hero text containers
        const heroEls = document.querySelectorAll<HTMLElement>('[data-scroll-text="hero-parallax"]');
        heroEls.forEach((el) => {
          gsap.to(el, {
            y: -42,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top+=80',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        });

        ScrollTrigger.refresh();
      });
    }, 380);

    return () => {
      window.clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return null;
};

export default ScrollTextEffects;
