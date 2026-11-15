import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PremiumWallEmulsion from '../assets/shadecards/premium-wall-emulsion.pdf';
import PremiumSyntheticEnamel from '../assets/shadecards/premium-synthetic-enamel.pdf';
import PremiumWeatherProof from '../assets/shadecards/premium-weather-proof.pdf';
import GoldSilkTouch from '../assets/shadecards/gold-silk-touch.pdf';
import GoldWeather from '../assets/shadecards/gold-weather-emulsion.pdf';
import PremiumStainGuard from '../assets/shadecards/premium-stain-guard.pdf';
import ShadeCardViewer from '../components/ShadeCardViewer';

const shadeCards = [
  { name: 'Premium Wall Emulsion', pdf: PremiumWallEmulsion },
  { name: 'Premium Synthetic Enamel', pdf: PremiumSyntheticEnamel },
  { name: 'Premium Weather Proof', pdf: PremiumWeatherProof },
  { name: 'Premium Stain Guard', pdf: PremiumStainGuard },
  { name: 'Gold Silk Touch Emulsion', pdf: GoldSilkTouch },
  { name: 'Gold Weather Emulsion', pdf: GoldWeather },
];

const PalettesPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-white to-blue-50 pt-28 pb-12">
      <div className="pointer-events-none absolute -left-16 top-16 h-72 w-72 rounded-full bg-blue-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-64 h-64 w-64 rounded-full bg-amber-200/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-1/3 h-56 w-56 rounded-full bg-teal-200/60 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Colour range</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Paint Palettes</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
            Open a shade card and turn the pages. Each page is fitted to the screen, so the colours stay readable.
          </p>
        </div>

        <div className="space-y-3">
          {shadeCards.map((card, index) => {
            const open = openIndex === index;
            return (
              <article
                key={card.name}
                className={`rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-xl transition ${
                  open
                    ? 'border-white/80 bg-white/70 shadow-blue-900/10'
                    : 'border-white/70 bg-white/45 shadow-blue-900/5 hover:bg-white/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <h2 className="text-sm font-semibold text-gray-900 md:text-base">{card.name}</h2>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-blue-700 transition ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && <ShadeCardViewer src={card.pdf} name={card.name} />}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PalettesPage;
