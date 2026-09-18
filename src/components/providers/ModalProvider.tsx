'use client';

import React, { createContext, useContext, useState } from 'react';
import { ModalLeadForm } from '@/components/ui/ModalLeadForm';

export interface ModalProductData {
  id?: string;
  slug?: string;
  itemType?: 'product' | 'series';
  brand?: string;
  series?: string;
  model?: string;
  name?: string;
  price?: number | null;
  priceFrom?: boolean;
  priceWithInstallation?: number | null;
  image?: string;
  sourcePage?: string;
}

interface ModalContextType {
  openModal: (productName?: string, source?: string, productData?: ModalProductData | null) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [source, setSource] = useState('Сайт');
  const [productData, setProductData] = useState<ModalProductData | null>(null);

  const openModal = (prod?: string, src?: string, prodData?: ModalProductData | null) => {
    setProductName(prod || '');
    setSource(src || 'Кнопка на сайте');
    setProductData(prodData || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProductData(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalLeadForm
        isOpen={isOpen}
        onClose={closeModal}
        productName={productName}
        source={source}
        productData={productData}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
