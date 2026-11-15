import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../assets/Logo-white-selecto.png';
import manufacturing from '../assets/slider/paint-manufacturing.jpg';
import buildings from '../assets/slider/colorful-buildings.jpg';
import interior from '../assets/slider/interior-colors.jpg';
import mixing from '../assets/slider/color-mixing.jpg';
import coating from '../assets/slider/exterior-coating.jpg';

const slides = [
  {
    src: manufacturing,
    title: 'Paint Manufacturing',
    caption: 'Precision mixing and production in every Selecto batch.',
  },
  {
    src: buildings,
    title: 'Building Colors',
    caption: 'Facades finished in lasting, distinctive color.',
  },
  {
    src: interior,
    title: 'Interior Finishes',
    caption: 'Rich wall color for homes and living spaces.',
  },
  {
    src: mixing,
    title: 'Color Selection',
    caption: 'From the can to the shade that fits the room.',
  },
  {
    src: coating,
    title: 'Exterior Coating',
    caption: 'Protection and color for every building.',
  },
];

const HomeSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, [paused]);

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  const onTouchEnd = (clientX: number) => {
    if (touchStart === null) return;
    const delta = clientX - touchStart;
    if (delta > 50) goTo(index - 1);
    if (delta < -50) goTo(index + 1);
    setTouchStart(null);
  };

  const slide = slides[index];

  return (
    <section className="bg-white py-12 md:py-14" aria-labelledby="home-slider-heading">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h2 id="home-slider-heading" className="text-2xl md:text-3xl font-bold text-center tracking-tight mb-6">
          Selecto Paints in Action
        </h2>

        <div
          className="relative h-[52vh] min-h-[320px] max-h-[520px] overflow-hidden rounded-2xl bg-gray-900 shadow-lg"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) => onTouchEnd(event.changedTouches[0].clientX)}
        >
          {slides.map((item, itemIndex) => (
            <img
              key={item.title}
              src={item.src}
              alt={item.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                itemIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 pb-5 pt-24 md:px-8 md:pb-6">
            <img
              src={logo}
              alt="Selecto Paints"
              className="mb-2 h-10 w-auto drop-shadow-lg md:h-12"
            />
            <h3 className="text-xl font-bold text-white md:text-2xl">{slide.title}</h3>
            <p className="mt-1 max-w-xl text-white/90">{slide.caption}</p>
            <div className="pointer-events-auto mt-4 flex justify-center gap-2">
              {slides.map((item, itemIndex) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={itemIndex === index ? 'true' : undefined}
                  onClick={() => goTo(itemIndex)}
                  className={`h-2.5 rounded-full transition-all ${
                    itemIndex === index ? 'w-8 bg-white' : 'w-2.5 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white md:left-5"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white md:right-5"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeSlider;
