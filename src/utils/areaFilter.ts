import { Product } from '@/types';

export interface AreaOption {
  key: string;
  label: string;
  sqm: number;
}

export const AREA_OPTIONS: AreaOption[] = [
  { key: 'under-20', label: 'до 20 м²', sqm: 20 },
  { key: 'under-25', label: 'до 25 м²', sqm: 25 },
  { key: 'under-35', label: 'до 35 м²', sqm: 35 },
  { key: 'under-50', label: 'до 50 м²', sqm: 50 },
  { key: 'under-70', label: 'до 70 м²', sqm: 70 },
  { key: 'over-70', label: 'от 70 м²', sqm: 71 },
];

export function filterProductsByArea(products: Product[], areaKey: string): Product[] {
  if (areaKey === 'all') return products;

  return products.filter((p) => {
    if (p.area === null) return false;
    if (areaKey === 'under-20') return p.area <= 20;
    if (areaKey === 'under-25') return p.area <= 25;
    if (areaKey === 'under-35') return p.area <= 35;
    if (areaKey === 'under-50') return p.area <= 50;
    if (areaKey === 'under-70') return p.area <= 70;
    if (areaKey === 'over-70') return p.area > 70;
    return true;
  });
}
