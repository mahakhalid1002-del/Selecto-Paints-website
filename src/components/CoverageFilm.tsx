import React, { useEffect, useRef, useState } from 'react';

const DURATION = 5600;

const CoverageFilm: React.FC = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const started = useRef(false);

  const play = () => {
    setProgress(0);
    setPlaying(true);
  };

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    const node = frameRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setPlaying(true);
        }
      },
      { threshold: 0.55 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const next = Math.min(1, (now - start) / DURATION);
      setProgress(next);
      if (next < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setPlaying(false);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const covered = progress >= 1;
  const percent = Math.round(progress * 100);

  return (
    <div ref={frameRef} className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 text-xs text-white/80">
        <span>Hiding power · one coat</span>
        <span>{covered ? '0:06' : `0:0${Math.min(5, Math.floor(progress * 6))}`}</span>
      </div>

      <div className="relative aspect-video overflow-hidden bg-[#f7f7f5]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #111111 0 22px, #f7f7f5 22px 44px), repeating-linear-gradient(0deg, transparent 0 18px, rgba(17,17,17,0.55) 18px 20px)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${percent}%`,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.45), transparent 18%), #f3efe4',
          }}
        />
        {playing && percent < 100 && (
          <div className="absolute inset-y-0" style={{ left: `${percent}%` }} aria-hidden="true">
            <span className="absolute inset-y-0 -left-px w-1 bg-slate-800/70" />
            <svg className="absolute right-0 top-6 h-9 w-20 -translate-y-1/2 translate-x-1 drop-shadow" viewBox="0 0 92 40" fill="none">
              <rect x="6" y="8" width="50" height="16" rx="5" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
              <rect x="56" y="13" width="16" height="6" rx="2" fill="#334155" />
              <rect x="70" y="6" width="5" height="28" rx="2" fill="#0f172a" />
            </svg>
          </div>
        )}

        {!playing && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 flex items-center justify-center bg-slate-900/25"
          >
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow">
              {covered ? 'Play again' : 'Play'}
            </span>
          </button>
        )}
      </div>

      <div className="h-1 bg-white/15">
        <div className="h-full bg-blue-400" style={{ width: `${percent}%` }} />
      </div>
      <p className="px-4 py-3 text-center text-sm text-white/80">
        One coat on black-and-white testing paper. The lines disappear as the film goes on.
      </p>
    </div>
  );
};

export default CoverageFilm;
