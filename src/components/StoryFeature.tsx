import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../assets/Logo-white-selecto.png';
import painters from '../assets/story/story-painters.jpg';
import dealers from '../assets/story/story-dealers.jpg';
import homes from '../assets/story/story-homes.jpg';
import finish from '../assets/story/story-finish.jpg';
import lab from '../assets/story/story-lab.jpg';
import CoverageFilm from './CoverageFilm';

const slides = [
  { src: homes, title: 'Colour across the street', caption: 'Houses finished in coats that stay even in the sun.' },
  { src: painters, title: 'Painters trust the first coat', caption: 'A finish that hides the old surface without a second hiding coat.' },
  { src: dealers, title: 'Dealers recommend it', caption: 'Counters and colour fans, where the name is asked for by the job.' },
  { src: finish, title: 'A dense, even film', caption: 'The wall takes colour in one pass and keeps a smooth face.' },
  { src: lab, title: 'Checked before it leaves', caption: 'Sample panels reviewed so the tin matches the wall.' },
];

const notes = [
  {
    role: 'Painter, Punjab',
    text: 'The first coat already covers. I do not come back just to hide the colour underneath.',
  },
  {
    role: 'Paint dealer, Sargodha',
    text: 'When a customer wants a finish that looks complete, this is the tin I put on the counter.',
  },
];

type StoryFeatureProps = {
  titleAs?: 'h1' | 'h2';
};

const StoryFeature: React.FC<StoryFeatureProps> = ({ titleAs = 'h2' }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const Title = titleAs;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  const goTo = (next: number) => setIndex((next + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-3xl px-4 pb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Since 1996</p>
        <Title className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          A finish painters put their name to
        </Title>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
          Selecto has made paint in Sargodha since 1996. The work settled on one standard: a coat with enough hiding power to cover what is underneath, and a colour that still looks honest years later. That is why painters and dealers across Pakistan recommend it when the job has to look finished.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8" aria-label="Selecto story">
        <div
          className="relative h-[42vh] min-h-[260px] max-h-[460px] overflow-hidden rounded-2xl bg-gray-900 shadow-lg"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchStart === null) return;
            const delta = event.changedTouches[0].clientX - touchStart;
            if (delta > 50) goTo(index - 1);
            if (delta < -50) goTo(index + 1);
            setTouchStart(null);
          }}
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pb-4 pt-20">
            <img src={logo} alt="Selecto Paints" className="mb-2 h-9 w-auto drop-shadow md:h-11" />
            <h3 className="text-lg font-bold text-white md:text-xl">{slide.title}</h3>
            <p className="mt-1 max-w-xl text-sm text-white/90">{slide.caption}</p>
            <div className="pointer-events-auto mt-3 flex justify-center gap-2">
              {slides.map((item, itemIndex) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={itemIndex === index ? 'true' : undefined}
                  onClick={() => goTo(itemIndex)}
                  className={`h-2 rounded-full transition-all ${
                    itemIndex === index ? 'w-7 bg-white' : 'w-2 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-8">
        <h3 className="text-center text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
          How the quality earned its place
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
          Early batches were made for local walls. Over the years the formulas were tightened for hiding power, washability, and colour that does not fade at the first season of sun. Each batch is mixed and checked before it leaves the plant, so the shade in the tin is the shade on the wall.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
          Painters noticed it on the job: one coat was enough to quiet a patched wall or an old colour. Dealers noticed it at the counter, because customers came back for the same name. That is the recommendation Selecto carries now — not a slogan, but the people who apply it and the people who sell it.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {notes.map((note) => (
            <blockquote key={note.role} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
              <p className="text-sm leading-relaxed text-gray-700">“{note.text}”</p>
              <footer className="mt-2 text-xs font-semibold uppercase tracking-wide text-blue-700">{note.role}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <h3 className="text-center text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
          One coat on the test chart
        </h3>
        <p className="mx-auto mt-2 mb-5 max-w-xl text-center text-sm leading-relaxed text-gray-600">
          Hiding power is checked on paper printed with black and white lines. A thin paint leaves those lines showing. A Selecto coat covers the difference in a single pass.
        </p>
        <CoverageFilm />
      </section>
    </div>
  );
};

export default StoryFeature;
