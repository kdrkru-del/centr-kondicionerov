import React from 'react';
import { Shield, Clock, CreditCard, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '@/config/company';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: Shield,
      title: COMPANY_CONFIG.warrantyText,
      subtitle: 'На монтаж и оборудование',
    },
    {
      icon: Clock,
      title: 'Выезд в день обращения',
      subtitle: COMPANY_CONFIG.workingHours.full,
    },
    {
      icon: CreditCard,
      title: COMPANY_CONFIG.paymentTerms,
      subtitle: 'Любая форма оплаты',
    },
    {
      icon: MapPin,
      title: COMPANY_CONFIG.citiesListText,
      subtitle: 'Приморский край',
    },
  ];

  return (
    <section className="border-y border-slate-100 bg-slate-50/60 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start space-x-3 p-2 sm:p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
