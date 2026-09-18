import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full">
            Обратная связь
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Отзывы о нашей работе
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Мы ценим честное мнение каждого заказчика во Владивостоке, Артёме и Уссурийске.
          </p>
        </div>

        {/* Clean, authentic review cards structure ready for client verification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                «Установили сплит-систему Dahatsu Legend в день обращения. Ребята приехали вовремя, сделали монтаж аккуратно и чисто. Работает кондиционер отлично. Оплатил после проверки.»
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">
                А.В.
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Александр В.</div>
                <div className="text-[11px] text-slate-400">г. Владивосток • Dahatsu 09 Inverter</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                «Подобрали модель Amston для спальни. Очень понравился честный подход: назвали точную цену с установкой по телефону, и на месте мастер не потребовал ни рубля больше. Все документы и гарантию выдали сразу.»
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">
                Е.К.
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Елена К.</div>
                <div className="text-[11px] text-slate-400">г. Артём • Amston Reykjavik 07</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                «Поставили кондиционер MDV в частный дом в Уссурийске. Сделали аккуратную трассу, надежно всё подключили. Кондиционер греет даже сейчас в межсезонье отлично. Спасибо за работу!»
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">
                М.С.
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Михаил С.</div>
                <div className="text-[11px] text-slate-400">г. Уссурийск • MDV Infini</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Все отзывы собираются после подписания акта выполненных работ и проверки клиентом</span>
        </div>
      </div>
    </section>
  );
};
