import React, { useState } from 'react';
import StoryFeature from '../components/StoryFeature';
import kitchenSage from '../assets/inspiration/kitchen-sage.jpg';
import kitchenTerracotta from '../assets/inspiration/kitchen-terracotta.jpg';
import kitchenNavy from '../assets/inspiration/kitchen-navy.jpg';
import kitchenCream from '../assets/inspiration/kitchen-cream.jpg';
import bedroomBlue from '../assets/inspiration/bedroom-dusty-blue.jpg';
import bedroomForest from '../assets/inspiration/bedroom-forest.jpg';
import bedroomBlush from '../assets/inspiration/bedroom-blush.jpg';
import bedroomBeige from '../assets/inspiration/bedroom-beige.jpg';
import officeCharcoal from '../assets/inspiration/office-charcoal.jpg';
import officeOlive from '../assets/inspiration/office-olive.jpg';
import officeGray from '../assets/inspiration/office-gray.jpg';
import officeTeal from '../assets/inspiration/office-teal.jpg';
import livingTerracotta from '../assets/inspiration/living-terracotta.jpg';
import livingSage from '../assets/inspiration/living-sage.jpg';
import livingMustard from '../assets/inspiration/living-mustard.jpg';
import livingGreige from '../assets/inspiration/living-greige.jpg';
import kidsYellow from '../assets/inspiration/kids-yellow.jpg';
import kidsSky from '../assets/inspiration/kids-sky.jpg';
import kidsLavender from '../assets/inspiration/kids-lavender.jpg';
import kidsCoral from '../assets/inspiration/kids-coral.jpg';
import exteriorBlue from '../assets/inspiration/exterior-blue.jpg';
import exteriorSand from '../assets/inspiration/exterior-sand.jpg';
import exteriorSage from '../assets/inspiration/exterior-sage.jpg';
import exteriorCharcoal from '../assets/inspiration/exterior-charcoal.jpg';

type Inspiration = {
  src: string;
  style: string;
  color: string;
};

const categories = ['Kitchen', 'Bedroom', 'Office', 'Living Room', 'Kids Area', 'Exterior'];

const inspirationImages: Record<string, Inspiration[]> = {
  Kitchen: [
    { src: kitchenSage, style: 'Modern', color: 'Sage green' },
    { src: kitchenTerracotta, style: 'Traditional', color: 'Terracotta' },
    { src: kitchenNavy, style: 'Contemporary', color: 'Navy blue' },
    { src: kitchenCream, style: 'Farmhouse', color: 'Soft cream' },
  ],
  Bedroom: [
    { src: bedroomBlue, style: 'Calm', color: 'Dusty blue' },
    { src: bedroomForest, style: 'Moody', color: 'Forest green' },
    { src: bedroomBlush, style: 'Airy', color: 'Blush pink' },
    { src: bedroomBeige, style: 'Warm', color: 'Sandy beige' },
  ],
  Office: [
    { src: officeCharcoal, style: 'Minimal', color: 'Charcoal' },
    { src: officeOlive, style: 'Botanical', color: 'Olive green' },
    { src: officeGray, style: 'Modern', color: 'Light gray' },
    { src: officeTeal, style: 'Creative', color: 'Deep teal' },
  ],
  'Living Room': [
    { src: livingTerracotta, style: 'Mid-century', color: 'Terracotta' },
    { src: livingSage, style: 'Scandinavian', color: 'Sage green' },
    { src: livingMustard, style: 'Bold', color: 'Mustard yellow' },
    { src: livingGreige, style: 'Classic', color: 'Pale greige' },
  ],
  'Kids Area': [
    { src: kidsYellow, style: 'Playful', color: 'Sunny yellow' },
    { src: kidsSky, style: 'Light', color: 'Sky blue' },
    { src: kidsLavender, style: 'Quiet', color: 'Soft lavender' },
    { src: kidsCoral, style: 'Cheerful', color: 'Coral' },
  ],
  Exterior: [
    { src: exteriorBlue, style: 'Coastal', color: 'Coastal blue' },
    { src: exteriorSand, style: 'Mediterranean', color: 'Warm sand' },
    { src: exteriorSage, style: 'Garden', color: 'Sage green' },
    { src: exteriorCharcoal, style: 'Modern', color: 'Charcoal' },
  ],
};

const InspirationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Kitchen');
  const images = inspirationImages[selectedCategory];

  return (
    <div className="pt-28">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center tracking-tight">Get Inspired</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Wall colors and styles for every room.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {images.map((image) => (
            <article key={image.style} className="overflow-hidden rounded-xl bg-white shadow-md">
              <img
                src={image.src}
                alt={`${selectedCategory} painted ${image.color}, ${image.style} style`}
                className="h-52 w-full object-cover"
              />
              <div className="px-3 py-3 text-center">
                <h2 className="text-sm font-semibold text-gray-900">{image.style}</h2>
                <p className="text-xs text-gray-500">{image.color}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <StoryFeature />
    </div>
  );
};

export default InspirationPage;
