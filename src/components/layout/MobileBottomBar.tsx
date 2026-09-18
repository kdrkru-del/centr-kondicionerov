'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenQuiz?: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenQuiz }) => {
  const pathname = usePathname();

  // On individual product/series pages under /catalog/[slug], ProductStickyBar is used instead
  if (pathname && pathname.startsWith('/catalog/') && pathname !== '/catalog') {
    const slug = pathname.replace('/catalog/', '').split('/')[0]?.toLowerCase();
    const isBrand = ['mdv', 'amston', 'dahatsu', 'hunberg'].includes(slug);
    if (!isBrand) {
      return null;
    }
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-3 py-2 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-3 gap-2">
        {/* Call button */}
        <a
          href="tel:+74232761161"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 transition min-h-[48px]"
        >
          <Phone className="w-5 h-5 text-blue-600 mb-0.5" />
          <span className="text-[11px] font-semibold">Позвонить</span>
        </a>

        {/* WhatsApp message */}
        <a
          href="https://wa.me/79147061161"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-800 transition min-h-[48px]"
        >
          <MessageSquare className="w-5 h-5 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        {/* Pick up / Quiz button */}
        <button
          onClick={onOpenQuiz}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white transition min-h-[48px] shadow-sm shadow-blue-500/30"
        >
          <Sparkles className="w-5 h-5 text-white mb-0.5" />
          <span className="text-[11px] font-bold">Подобрать</span>
        </button>
      </div>
    </div>
  );
};
