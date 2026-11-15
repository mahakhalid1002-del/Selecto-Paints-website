import React from 'react';
import { Factory, Layers, BadgeCheck } from 'lucide-react';
import ceoImg from '../assets/ceo.png';
import sinceImg from '../assets/about/fact-since-1996.jpg';
import surfacesImg from '../assets/about/fact-every-surface.jpg';
import careImg from '../assets/about/fact-made-with-care.jpg';
import FAQ from '../components/FAQ';

const facts = [
  {
    label: 'Since 1996',
    text: 'From a local works to a full range of finishes.',
    image: sinceImg,
    alt: 'Paint mixing tanks and tins in the Selecto plant',
    icon: Factory,
  },
  {
    label: 'Every surface',
    text: 'Interior, exterior, wood, and metal.',
    image: surfacesImg,
    alt: 'Painted walls, a wooden door, and a metal railing',
    icon: Layers,
  },
  {
    label: 'Made with care',
    text: 'Checked batches and lower-impact formulas.',
    image: careImg,
    alt: 'Open tins of paint beside colour swatches',
    icon: BadgeCheck,
  },
];

const AboutPage = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-white to-blue-50 pt-28">
      <div className="pointer-events-none absolute -left-20 top-16 h-72 w-72 rounded-full bg-blue-300/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-72 h-64 w-64 rounded-full bg-amber-200/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 left-1/3 h-56 w-56 rounded-full bg-teal-200/60 blur-3xl" />

      <section className="relative mx-auto max-w-2xl px-4 pb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Our story</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">About Selecto Paints</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
          Selecto makes paint that protects a surface and keeps the colour honest for years. The work is simple: a dependable finish, mixed and checked before it leaves the plant.
        </p>
      </section>

      <section className="relative mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-3">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <article
              key={fact.label}
              className="overflow-hidden rounded-2xl border border-white/70 bg-white/55 shadow-lg shadow-blue-900/10 backdrop-blur-xl"
            >
              <div className="relative h-40">
                <img src={fact.image} alt={fact.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/25 text-white shadow-md backdrop-blur-md">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="px-4 py-4 text-center">
                <h2 className="text-sm font-semibold text-gray-900">{fact.label}</h2>
                <p className="mt-1 text-sm text-gray-600">{fact.text}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="relative mx-auto mt-8 max-w-3xl px-4">
        <div className="rounded-2xl border border-white/70 bg-white/60 p-5 shadow-lg shadow-blue-900/5 backdrop-blur-xl md:p-6">
          <h2 className="text-lg font-semibold text-gray-900">Our mission</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">
            The aim is to give people colour they can live with, and a coating that stands up to weather, washing, and time. Quality, a lighter footprint, and a clear answer when someone asks for advice are the standards the team works to.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 md:text-base">
            The range covers rooms, outside walls, woodwork, and metal. Each batch is made in controlled conditions so the colour in the tin matches the colour on the wall.
          </p>
        </div>
      </section>

      <section className="relative mx-auto mt-6 max-w-3xl px-4 pb-2">
        <div className="rounded-2xl border border-white/70 bg-gradient-to-br from-white/75 to-sky-50/70 p-5 shadow-lg shadow-blue-900/10 backdrop-blur-xl md:p-6">
          <div className="flex items-center gap-4">
            <img
              src={ceoImg}
              alt="Khawaja Umer Farooq Sikka"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-white/80"
            />
            <div>
              <h2 className="text-base font-semibold text-gray-900">Khawaja Umer Farooq Sikka</h2>
              <p className="text-sm text-blue-700">Chief Executive Officer</p>
            </div>
          </div>
          <blockquote className="mt-4 border-l-2 border-blue-400 pl-3 text-sm leading-relaxed text-gray-700 md:text-base">
            For more than three decades, Selecto has stayed with one idea: colour that lasts, made with care for the people who use it and for the places it covers. Thank you for trusting us with your walls.
          </blockquote>
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default AboutPage;
