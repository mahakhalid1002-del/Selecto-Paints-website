import { Product } from '../types';
import stainGuard from '../assets/products/pack-stain-guard.jpg';
import weatherProof from '../assets/products/pack-weather-proof.jpg';
import wallEmulsion from '../assets/products/pack-wall-emulsion.jpg';
import interiorPrimer from '../assets/products/pack-interior-primer.jpg';
import wallFilling from '../assets/products/pack-wall-filling.jpg';
import syntheticEnamel from '../assets/products/pack-synthetic-enamel.jpg';
import syntheticVarnish from '../assets/products/pack-synthetic-varnish.jpg';
import aluminium from '../assets/products/pack-aluminium.jpg';
import redOxide from '../assets/products/pack-red-oxide.jpg';
import undercoat from '../assets/products/pack-undercoat.jpg';
import metallic from '../assets/products/pack-metallic.jpg';
import wallSealer from '../assets/products/pack-wall-sealer.jpg';
import wallTexture from '../assets/products/bucket-wall-texture.jpg';
import sheeshaPutty from '../assets/products/bucket-sheesha-putty.jpg';
import exteriorPrimer from '../assets/products/pack-exterior-primer.jpg';
import exteriorFilling from '../assets/products/pack-exterior-filling.jpg';
import ncThinner from '../assets/products/can-nc-thinner.jpg';
import woodGloss from '../assets/products/pack-wood-gloss.jpg';
import woodMatt from '../assets/products/can-wood-matt.jpg';
import woodSealer from '../assets/products/can-wood-sealer.jpg';
import goldWeather from '../assets/products/pack-gold-weather.jpg';
import goldSilk from '../assets/products/pack-gold-silk.jpg';
import goldPrimer from '../assets/products/pack-gold-primer.jpg';
import goldFiller from '../assets/products/bucket-gold-filler.jpg';
import projectEmulsion from '../assets/products/bucket-project-emulsion.jpg';

export const products: Product[] = [
  {
    id: 'stain-guard',
    name: 'Premium Stain Guard',
    tagline: 'A finish that resists stains.',
    description: 'Interior and exterior emulsion that keeps everyday marks from settling into the colour.',
    series: 'premium',
    imageUrl: stainGuard,
    packs: [
      { quantity: 'Drum 16 L', price: 26230 },
      { quantity: 'Gallon 4 L', price: 6558 },
      { quantity: 'Quarter 1 L', price: 1742 },
    ],
  },
  {
    id: 'weather-proof',
    name: 'Premium Weather Proof',
    tagline: 'Built for the weather.',
    description: 'Exterior coating for walls that take sun and rain.',
    series: 'premium',
    imageUrl: weatherProof,
    packs: [
      { quantity: 'Drum 16 L', price: 18224 },
      { quantity: 'Gallon 4 L', price: 4640 },
      { quantity: 'Quarter 1 L', price: 1311 },
    ],
  },
  {
    id: 'wall-emulsion',
    name: 'Premium Wall Emulsion',
    tagline: 'Colour for walls and ceilings.',
    description: 'Smooth interior emulsion for rooms and ceilings.',
    series: 'premium',
    imageUrl: wallEmulsion,
    packs: [
      { quantity: 'Drum 14.56 L', price: 8138 },
      { quantity: 'Gallon 3.64 L', price: 2118 },
      { quantity: 'Quarter 0.91 L', price: 615 },
    ],
  },
  {
    id: 'interior-primer',
    name: 'Premium Interior Primer (Water Base)',
    tagline: 'The first coat inside.',
    description: 'Water-based primer for interior walls before the finish.',
    series: 'premium',
    imageUrl: interiorPrimer,
    packs: [
      { quantity: 'Drum 14.56 L', price: 11356 },
      { quantity: 'Gallon 3.64 L', price: 2905 },
    ],
  },
  {
    id: 'wall-filling',
    name: 'Premium Wall Filling',
    tagline: 'Fills the gaps first.',
    description: 'Paste filler for cracks and uneven interior walls.',
    series: 'premium',
    imageUrl: wallFilling,
    packs: [
      { quantity: 'Drum 20 KG', price: 4316 },
      { quantity: 'Gallon 5 KG', price: 1326 },
    ],
  },
  {
    id: 'synthetic-enamel',
    name: 'Premium Synthetic Enamel',
    tagline: 'A hard gloss finish.',
    description: 'Gloss enamel for wood and metal.',
    series: 'premium',
    imageUrl: syntheticEnamel,
    packs: [
      { quantity: 'Drum 14.56 L', price: 18910 },
      { quantity: 'Gallon 3.64 L', price: 4812 },
      { quantity: 'Quarter 0.91 L', price: 1230 },
      { quantity: 'Tinlet 0.25 L', price: 392 },
    ],
  },
  {
    id: 'synthetic-varnish',
    name: 'Premium Synthetic Varnish',
    tagline: 'A clear coat for wood.',
    description: 'Clear varnish that leaves the grain visible.',
    series: 'premium',
    imageUrl: syntheticVarnish,
    packs: [
      { quantity: 'Gallon 3 L', price: 3503 },
      { quantity: 'Quarter 0.75 L', price: 938 },
      { quantity: 'Tinlet 0.25 L', price: 387 },
    ],
  },
  {
    id: 'aluminium-finish',
    name: 'Premium Aluminium Finish',
    tagline: 'A metallic silver coat.',
    description: 'Aluminium finish for metal surfaces.',
    series: 'premium',
    imageUrl: aluminium,
    packs: [
      { quantity: 'Gallon 3.64 L', price: 5348 },
      { quantity: 'Quarter 0.91 L', price: 1426 },
      { quantity: 'Tinlet 0.25 L', price: 477 },
    ],
  },
  {
    id: 'red-oxide-primer',
    name: 'Premium Red Oxide Primer',
    tagline: 'Primer for iron and steel.',
    description: 'Red oxide primer that protects metal before the enamel.',
    series: 'premium',
    imageUrl: redOxide,
    packs: [
      { quantity: 'Gallon 3.64 L', price: 3556 },
      { quantity: 'Quarter 0.91 L', price: 954 },
    ],
  },
  {
    id: 'synthetic-undercoat',
    name: 'Premium Synthetic Under Coat',
    tagline: 'The coat under the enamel.',
    description: 'Undercoat used beneath synthetic enamel.',
    series: 'premium',
    imageUrl: undercoat,
    packs: [
      { quantity: 'Gallon 3.64 L', price: 4171 },
      { quantity: 'Quarter 0.91 L', price: 1134 },
    ],
  },
  {
    id: 'synthetic-metallic',
    name: 'Premium Synthetic Metallic & Toner',
    tagline: 'Metallic colour for enamel.',
    description: 'Metallic toner for tinting synthetic enamel.',
    series: 'premium',
    imageUrl: metallic,
    packs: [
      { quantity: 'Gallon 3.64 L', price: 4918 },
      { quantity: 'Quarter 0.91 L', price: 1288 },
      { quantity: 'Tinlet 0.25 L', price: 398 },
    ],
  },
  {
    id: 'wall-sealer-primer',
    name: 'Premium Wall Sealer Primer',
    tagline: 'Seals a thirsty wall.',
    description: 'Sealer primer for porous walls before the finish coat.',
    series: 'premium',
    imageUrl: wallSealer,
    packs: [
      { quantity: 'Drum 14.56 L', price: 19340 },
      { quantity: 'Gallon 3.64 L', price: 4918 },
      { quantity: 'Quarter 0.91 L', price: 1341 },
    ],
  },
  {
    id: 'wall-texture',
    name: 'Premium Wall Texture',
    tagline: 'A textured wall finish.',
    description: 'Textured coating for feature walls.',
    series: 'premium',
    imageUrl: wallTexture,
    packs: [{ quantity: 'Drum 20 KG', price: 5700 }],
  },
  {
    id: 'sheesha-putty',
    name: 'Premium Sheesha Wall Putty',
    tagline: 'A smooth base for colour.',
    description: 'Fine putty for a level interior wall.',
    series: 'premium',
    imageUrl: sheeshaPutty,
    packs: [{ quantity: 'Drum 20 KG', price: 6600 }],
  },
  {
    id: 'exterior-primer',
    name: 'Premium Exterior Primer (Water Base)',
    tagline: 'Primer for outside walls.',
    description: 'Water-based primer for exterior masonry.',
    series: 'premium',
    imageUrl: exteriorPrimer,
    packs: [
      { quantity: 'Drum 16 L', price: 13500 },
      { quantity: 'Gallon 4 L', price: 3480 },
    ],
  },
  {
    id: 'exterior-filling',
    name: 'Premium Exterior Filling',
    tagline: 'Filler for outside walls.',
    description: 'Filler for cracks and joints on exterior walls.',
    series: 'premium',
    imageUrl: exteriorFilling,
    packs: [
      { quantity: 'Drum 20 KG', price: 7111 },
      { quantity: 'Gallon 5 KG', price: 2169 },
    ],
  },
  {
    id: 'nc-thinner',
    name: 'Premium N.C. Thinner',
    tagline: 'Thinner for the wood range.',
    description: 'Thinner for the wood lacquer and sealer.',
    series: 'wood',
    imageUrl: ncThinner,
    packs: [
      { quantity: 'Gallon 3.64 L', price: 4060 },
      { quantity: 'Quarter 0.91 L', price: 1128 },
    ],
  },
  {
    id: 'wood-gloss-lacquer',
    name: 'Premium Wood Gloss Lacquer',
    tagline: 'A gloss coat on wood.',
    description: 'Gloss lacquer for wooden surfaces.',
    series: 'wood',
    imageUrl: woodGloss,
    packs: [
      { quantity: 'Gallon 3.64 L', price: 6943 },
      { quantity: 'Quarter 0.91 L', price: 1897 },
    ],
  },
  {
    id: 'wood-matt-lacquer',
    name: 'Premium Wood Matt Lacquer',
    tagline: 'A matt coat on wood.',
    description: 'Matt lacquer for wooden surfaces.',
    series: 'wood',
    imageUrl: woodMatt,
    packs: [
      { quantity: 'Gallon 3.64 L', price: 6943 },
      { quantity: 'Quarter 0.91 L', price: 1897 },
    ],
  },
  {
    id: 'wood-sealer',
    name: 'Premium Wood Sealer',
    tagline: 'Seals the wood first.',
    description: 'Sealer for wood before the lacquer.',
    series: 'wood',
    imageUrl: woodSealer,
    packs: [
      { quantity: 'Gallon 3.64 L', price: 6630 },
      { quantity: 'Quarter 0.91 L', price: 1838 },
    ],
  },
  {
    id: 'gold-weather-emulsion',
    name: 'Gold Weather Emulsion',
    tagline: 'Exterior colour for the weather.',
    description: 'Gold series emulsion for exterior walls.',
    series: 'gold',
    imageUrl: goldWeather,
    packs: [
      { quantity: 'Drum 16 L', price: 14640 },
      { quantity: 'Gallon 4 L', price: 3918 },
      { quantity: 'Quarter 1 L', price: 987 },
    ],
  },
  {
    id: 'gold-silk-touch',
    name: 'Gold Silk Touch Emulsion',
    tagline: 'A soft sheen for interiors.',
    description: 'Gold series emulsion with a smooth sheen for interior walls.',
    series: 'gold',
    imageUrl: goldSilk,
    packs: [
      { quantity: 'Drum 14.56 L', price: 7225 },
      { quantity: 'Gallon 3.64 L', price: 1984 },
      { quantity: 'Quarter 0.91 L', price: 558 },
    ],
  },
  {
    id: 'gold-wall-primer',
    name: 'Gold Wall Primer (Water Base)',
    tagline: 'Primer before the gold finish.',
    description: 'Water-based primer for interior walls.',
    series: 'gold',
    imageUrl: goldPrimer,
    packs: [
      { quantity: 'Drum 14.56 L', price: 6690 },
      { quantity: 'Gallon 3.64 L', price: 1730 },
    ],
  },
  {
    id: 'gold-interior-filler',
    name: 'Gold Interior Wall Filler',
    tagline: 'Fills interior walls first.',
    description: 'Filler for cracks and uneven interior walls.',
    series: 'gold',
    imageUrl: goldFiller,
    packs: [
      { quantity: 'Drum 20 KG', price: 3860 },
      { quantity: 'Gallon 5 KG', price: 1075 },
    ],
  },
  {
    id: 'gold-acrylic-primer',
    name: 'Gold Acrylic Primer (Exterior/Interior)',
    tagline: 'Primer for inside and outside.',
    description: 'Acrylic primer for exterior and interior walls.',
    series: 'gold',
    imageUrl: projectEmulsion,
    packs: [{ quantity: 'Drum 6 L', price: 10085 },
            { quantity: 'Gallon 4L', price: 2773 },
    ],
  },
];

export const getPremiumProducts = () => products.filter((product) => product.series === 'premium');
export const getWoodProducts = () => products.filter((product) => product.series === 'wood');
export const getGoldProducts = () => products.filter((product) => product.series === 'gold');
