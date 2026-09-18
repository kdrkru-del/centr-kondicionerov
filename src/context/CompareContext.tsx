'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '@/data/products';

interface CompareContextType {
  compareSlugs: string[];
  compareCount: number;
  maxCompareCount: number;
  addToCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  toggleCompare: (slug: string) => void;
  isInCompare: (slug: string) => boolean;
  clearCompare: () => void;
  isBarVisible: boolean;
  setIsBarVisible: (val: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = 'centr_compare';
const MAX_COMPARE = 3;

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [isBarVisible, setIsBarVisible] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Keep only existing products that are itemType === 'product'
          const valid = parsed.filter((slug: string) => {
            const prod = PRODUCTS.find((p) => p.slug === slug);
            return prod && prod.itemType === 'product';
          }).slice(0, MAX_COMPARE);
          setCompareSlugs(valid);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveToStorage = (slugs: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // Ignore
    }
  };

  const addToCompare = (slug: string): boolean => {
    const prod = PRODUCTS.find((p) => p.slug === slug);
    if (!prod || prod.itemType !== 'product') return false;
    if (compareSlugs.includes(slug)) return true;
    if (compareSlugs.length >= MAX_COMPARE) return false;

    const next = [...compareSlugs, slug];
    setCompareSlugs(next);
    setIsBarVisible(true);
    saveToStorage(next);
    return true;
  };

  const removeFromCompare = (slug: string) => {
    const next = compareSlugs.filter((s) => s !== slug);
    setCompareSlugs(next);
    saveToStorage(next);
  };

  const toggleCompare = (slug: string) => {
    if (compareSlugs.includes(slug)) {
      removeFromCompare(slug);
    } else {
      addToCompare(slug);
    }
  };

  const isInCompare = (slug: string) => {
    return compareSlugs.includes(slug);
  };

  const clearCompare = () => {
    setCompareSlugs([]);
    saveToStorage([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareSlugs,
        compareCount: compareSlugs.length,
        maxCompareCount: MAX_COMPARE,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        isBarVisible,
        setIsBarVisible
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
