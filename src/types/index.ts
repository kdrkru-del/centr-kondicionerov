export interface Product {
  id: string;
  slug: string;
  brand: 'MDV' | 'AMSTON' | 'HUNBERG' | 'DAHATSU';
  name: string;
  model: string;
  series: string;
  description: string;
  image: string;
  gallery: string[];
  price: number; // цена оборудования
  installationPrice: number; // цена стандартного монтажа
  totalPrice: number; // цена «под ключ»
  areaMin: number;
  areaMax: number;
  compressorType: 'Inverter' | 'On-Off';
  coolingCapacity: string; // кВт
  heatingCapacity: string; // кВт
  noiseLevel: string; // дБ
  energyClass: string;
  wifi: boolean;
  warranty: string;
  isPopular?: boolean;
  isHit?: boolean;
  isFeatured?: boolean;
  category: 'economy' | 'standard' | 'premium';
  features: string[];
  specifications: Record<string, string>;
}

export interface BrandInfo {
  id: string;
  name: string;
  slug: string;
  country: string;
  tagline: string;
  description: string;
  warrantyYears: number;
  highlight: string;
  features: string[];
  logo: string;
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
  address: string;
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
