'use client';

import React, { useEffect } from 'react';

export const METRIKA_ID = 101376260;

declare global {
  interface Window {
    ym?: (
      id: number,
      action: string,
      target?: string | Record<string, unknown> | ((clientId: string) => void),
      params?: Record<string, unknown>
    ) => void;
    __ANTIFRAUD_COUNTER_ID?: number;
    __ANTIFRAUD_IS_BOT?: boolean;
    CROAgent?: {
      isClickbot?: () => boolean;
      getState?: () => Record<string, unknown>;
      flush?: () => void;
    };
  }
}

/**
 * Считывает системный ClientID Яндекс.Метрики (_ym_uid) текущего посетителя
 */
export function getMetrikaClientId(): string {
  if (typeof document === 'undefined') return '';
  try {
    const match = document.cookie.match(/(?:^|;\s*)_ym_uid=([^;]*)/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]).trim();
    }
  } catch {
    // ignore
  }
  try {
    const fromStorage = window.localStorage.getItem('_ym_uid');
    if (fromStorage) {
      return fromStorage.replace(/"/g, '').trim();
    }
  } catch {
    // ignore
  }
  return '';
}

/**
 * Безопасная отправка целей в Яндекс.Метрику с защитой от ботов (Goal-Poisoning Shield)
 */
export const reachGoal = (targetName: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;

  try {
    // Если визит распознан как бот — блокируем отправку коммерческой цели в Метрику,
    // чтобы автостратегии Яндекс.Директа не обучались на ботах
    const isBot = Boolean(window.CROAgent?.isClickbot?.() || window.__ANTIFRAUD_IS_BOT);
    if (isBot && targetName !== 'bot_detected') {
      console.warn('[Metrika Shield] Заблокирована цель от бота:', targetName);
      window.ym(METRIKA_ID, 'userParams', { is_clickbot: 'yes', blocked_goal: targetName });
      return;
    }

    window.ym(METRIKA_ID, 'reachGoal', targetName, params);
  } catch (err) {
    console.warn('Failed to reachGoal in Metrika:', err);
  }
};

export const YandexMetrika: React.FC = () => {
  useEffect(() => {
    let scrolled50 = false;
    let scrolled75 = false;
    let formStarted = false;

    // 1. Автоматический трекинг кликов по контактам (звонки, WhatsApp, Telegram)
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href') || '';

      if (href.startsWith('tel:')) {
        reachGoal('phone_click', { href });
        reachGoal('click_phone', { phone: href.replace('tel:', '') });
      } else if (href.includes('wa.me') || href.includes('whatsapp')) {
        reachGoal('whatsapp_click', { href });
        reachGoal('click_whatsapp');
      } else if (href.includes('t.me') || href.includes('telegram')) {
        reachGoal('telegram_click', { href });
        reachGoal('click_telegram');
      }
    };

    // 2. Детекция начала заполнения любой формы на сайте (фокус на поле)
    const handleFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!el || !['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return;
      if (!formStarted) {
        formStarted = true;
        reachGoal('form_start', {
          field: el.getAttribute('name') || el.getAttribute('placeholder') || el.tagName
        });
      }
    };

    // 3. Скролл-аналитика: 50% и 75% глубины экрана
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 1);
      const winHeight = window.innerHeight || 1;
      const pct = Math.min(100, Math.round(((scrollTop + winHeight) / docHeight) * 100));

      if (pct >= 50 && !scrolled50) {
        scrolled50 = true;
        reachGoal('scroll_50');
      }
      if (pct >= 75 && !scrolled75) {
        scrolled75 = true;
        reachGoal('scroll_75');
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('focusin', handleFocusIn);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}", "ym");

            ym(${METRIKA_ID}, "init", {
              ssr: true,
              webvisor: true,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              ecommerce: "dataLayer"
            });
          `,
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};
