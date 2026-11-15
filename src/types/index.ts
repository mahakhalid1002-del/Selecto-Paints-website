export interface ProductPack {
  quantity: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  series: 'premium' | 'gold' | 'wood';
  imageUrl: string;
  packs?: ProductPack[];
}