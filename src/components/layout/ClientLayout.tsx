'use client';

import React from 'react';
import { ModalProvider, useModal } from '@/components/providers/ModalProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';

import { FavoritesProvider } from '@/context/FavoritesContext';
import { CompareProvider } from '@/context/CompareContext';
import { FloatingCompareBar } from '@/components/catalog/FloatingCompareBar';

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openModal } = useModal();

  const handleOpenQuiz = () => {
    const el = document.getElementById('quiz');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      openModal(undefined, 'Нижняя мобильная панель');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onOpenModal={(prod, src) => openModal(prod, src)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCompareBar />
      <MobileBottomBar onOpenQuiz={handleOpenQuiz} />
    </div>
  );
};

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <FavoritesProvider>
      <CompareProvider>
        <ModalProvider>
          <LayoutContent>{children}</LayoutContent>
        </ModalProvider>
      </CompareProvider>
    </FavoritesProvider>
  );
};
