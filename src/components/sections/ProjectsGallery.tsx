'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const ProjectsGallery: React.FC = () => {
  const projects = [
    {
      title: 'Установка Amston Reykjavik 09',
      location: 'г. Владивосток, ул. Русская',
      time: '2.5 часа',
      image: '/images/works/installation-1.jpg',
      badge: 'Чистый монтаж'
    },
    {
      title: 'Монтаж инвертора Dahatsu Legend 12',
      location: 'г. Владивосток, ул. Светланская',
      time: '3 часа',
      image: '/images/works/installation-2.jpg',
      badge: 'Скрытая трасса'
    },
    {
      title: 'Сплит-система MDV Classic Inverter',
      location: 'г. Артём, частный коттедж',
      time: '3 часа',
      image: '/images/works/installation-3.png',
      badge: 'Алмазное бурение'
    },
    {
      title: 'Hunberg AC-07NB в спальне',
      location: 'г. Уссурийск, новостройка',
      time: '2 часа',
      image: '/images/works/installation-4.png',
      badge: 'Без пыли'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Реальные объекты</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Наши установки
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
              Фотографии выполненных работ наших бригад во Владивостоке, Артёме и Уссурийске.
            </p>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Все работы выполнены по стандарту ГОСТ</span>
          </div>
        </div>

        {/* Gallery Grid (on mobile horizontal snap scroll, on desktop grid) */}
        <div className="flex overflow-x-auto pb-4 gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible no-scrollbar snap-x">
          {projects.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[280px] sm:min-w-0 snap-center bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group card-hover-elevation"
            >
              <div className="relative h-56 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold rounded-lg uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>Время установки: {item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
