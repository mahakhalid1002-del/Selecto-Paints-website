import React, { useEffect, useRef, useState } from 'react';
import facade from '../assets/scroll/white-facade.jpg';
import facadeMask from '../assets/scroll/facade-mask.png';

const STICKY_TOP = 96;

const ScrollPaint: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotion = () => {
      setReduced(motion.matches);
      if (motion.matches) setProgress(1);
    };
    applyMotion();
    motion.addEventListener('change', applyMotion);

    let frame = 0;
    const update = () => {
      if (motion.matches) return;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        if (!section) return;
        const start = section.offsetTop - STICKY_TOP;
        const end = section.offsetTop + section.offsetHeight - window.innerHeight;
        const next = end <= start ? 1 : (window.scrollY - start) / (end - start);
        setProgress(Math.min(1, Math.max(0, next)));
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      motion.removeEventListener('change', applyMotion);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const painted = Math.round(progress * 100);

  return (
    <section
      ref={sectionRef}
      className={reduced ? 'bg-white py-12 md:py-14' : 'relative h-[180vh] bg-white'}
      aria-label="Paint reveal"
    >
      <div className={reduced ? 'container mx-auto max-w-5xl px-4 md:px-8' : 'sticky top-24 container mx-auto max-w-5xl px-4 py-6 md:top-28 md:px-8'}>
        <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight">
          Watch the colour go on
        </h2>
        <p className="mt-2 mb-6 text-center text-sm text-gray-600">
          Scroll and the white facade takes a fresh coat, the way colour goes on at the site.
        </p>

        <div className="scroll-paint">
          <img
            src={facade}
            alt="A white building facade receiving a coat of colour"
            className="scroll-paint__base"
          />
          <div
            className="scroll-paint__coat"
            style={{
              clipPath: `inset(0 0 ${100 - painted}% 0)`,
              WebkitMaskImage: `url(${facadeMask})`,
              maskImage: `url(${facadeMask})`,
            }}
          />
          <div className="scroll-paint__roller" style={{ top: `${painted}%` }} aria-hidden="true">
            <span className="scroll-paint__wet" />
            <svg className="scroll-paint__tool" viewBox="0 0 92 40" fill="none">
              <rect x="6" y="8" width="50" height="16" rx="5" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
              <path d="M10 12h42" stroke="#cbd5e1" strokeWidth="2" />
              <rect x="56" y="13" width="16" height="6" rx="2" fill="#334155" />
              <rect x="70" y="6" width="5" height="28" rx="2" fill="#0f172a" />
              <path d="M78 10c6 2 10 8 10 14" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollPaint;
