export interface Product {
  id: string;
  slug: string;
  brand: 'MDV' | 'AMSTON' | 'HUNBERG' | 'DAHATSU';
  series: string;
  model: string;
  name: string;
  shortName: string;
  originalName?: string;
  compressorType: 'Inverter' | 'On-Off';
  itemType: 'product' | 'series';
  area: number | null;
  areaMin: number | null;
  areaMax: number | null;
  seriesAreaRange: string | null;
  areaNote: string | null;
  price: number | null;
  priceFrom: boolean;
  installationPrice: number | null;
  priceWithInstallation: number | null;
  priceType: 'equipment' | 'equipment_from' | 'with_installation' | 'unknown';
  description: string | null;
  shortDescription: string | null;
  image: string;
  gallery: string[];
  features: string[];
  specifications: Record<string, string>;
  isPopular: boolean;
  isFeatured: boolean;
  isHit?: boolean;
  category?: 'economy' | 'standard' | 'premium';
  badge: string | null;
  available: boolean;
  wifi: boolean | null;
  energyClass: string | null;
  noiseLevel: string | null;
  coolingCapacity: string | null;
  heatingCapacity: string | null;
  warranty: string | null;
  sourceUrl: string;
  missingData: string[];
}

export interface BrandInfo {
  id: string;
  slug: string;
  name: 'MDV' | 'AMSTON' | 'HUNBERG' | 'DAHATSU';
  logo: string;
  shortDescription: string;
  description: string;
  order: number;
  features: string[];
  warrantyYears: number;
}

export interface CityData {
  slug: string;
  name: string;
  nameGenitive: string;
  namePrepositional: string;
  title: string;
  description: string;
  phone: string;
  mobilePhone: string;
  address: string | null;
  workHours: string;
  deliveryTerms: string;
  features: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface LeadSubmission {
  name: string;
  phone: string;
  area?: string;
  comment?: string;
  productName?: string;
  serviceType?: string;
  city?: string;
  source?: string;
}
