import { COMPANY_CONFIG } from '@/config/company';

export interface LeadSubmissionPayload {
  name?: string;
  phone: string;
  productName?: string;
  productId?: string;
  slug?: string;
  itemType?: string;
  brand?: string;
  series?: string;
  model?: string;
  price?: number | null;
  priceWithInstallation?: number | null;
  area?: string;
  city?: string;
  quizData?: Record<string, any>;
  source?: string;
  sourcePage?: string;
  comment?: string;
  website?: string; // honeypot antispam field
}

export interface LeadSubmissionResult {
  ok: boolean;
  message?: string;
  error?: string;
}

export const RECIPIENT_EMAIL = COMPANY_CONFIG.email; // centrkondicionerov@gmail.com
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

/**
 * Universal lead submitter for static GitHub Pages and Next.js.
 * Directly transmits customer leads to the company email (centrkondicionerov@gmail.com).
 */
export async function sendLead(payload: LeadSubmissionPayload): Promise<LeadSubmissionResult> {
  const {
    name,
    phone,
    productName,
    brand,
    series,
    model,
    price,
    priceWithInstallation,
    area,
    city,
    quizData,
    source,
    sourcePage,
    comment,
    website,
  } = payload;

  const cleanDigits = (phone || '').replace(/\D/g, '');
  if (!phone || cleanDigits.length < 10) {
    return {
      ok: false,
      error: 'Пожалуйста, укажите корректный номер телефона (не менее 10 цифр)',
    };
  }

  // Honeypot bot protection
  const honeypot = website ? String(website).trim() : '';

  const dateTimeStr =
    new Date().toLocaleString('ru-RU', {
      timeZone: 'Asia/Vladivostok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' (Владивосток)';

  const formattedPrice = price
    ? `${new Intl.NumberFormat('ru-RU').format(price)} ₽`
    : undefined;

  const formattedPriceWithInstall = priceWithInstallation
    ? `${new Intl.NumberFormat('ru-RU').format(priceWithInstallation)} ₽`
    : undefined;

  let subject = 'Новая заявка — Центр Кондиционеров';
  if (productName && productName !== 'Подбор сплит-системы') {
    subject = `Новая заявка: ${productName} — Центр Кондиционеров`;
  }

  const resolvedUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : sourcePage
      ? `https://центр-кондиционеров.рф${sourcePage}`
      : 'https://центр-кондиционеров.рф';

  const body: Record<string, string> = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
  };

  if (honeypot) {
    body._honey = honeypot;
  }

  body['Телефон'] = phone.trim();
  if (name && name.trim()) body['Имя клиента'] = name.trim();
  if (productName) body['Товар / Запрос'] = productName;
  if (brand) body['Бренд'] = brand;
  if (series) body['Серия'] = series;
  if (model) body['Модель'] = model;
  if (formattedPrice) body['Цена оборудования'] = formattedPrice;
  if (formattedPriceWithInstall) body['Цена с монтажом'] = formattedPriceWithInstall;
  if (area) body['Площадь помещения'] = area;
  if (city) body['Город'] = city;
  if (quizData) body['Параметры подбора'] = JSON.stringify(quizData);
  if (comment && comment.trim()) body['Комментарий'] = comment.trim();
  if (source) body['Источник формы'] = source;
  body['Страница отправки'] = resolvedUrl;
  body['Дата и время'] = dateTimeStr;

  // 1. Try sending directly to FormSubmit (works on static GitHub Pages)
  try {
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    const isSuccess = res.ok && (data.success === 'true' || data.success === true || data.message);

    if (isSuccess) {
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(101376260, 'reachGoal', 'lead_submit');
      }
      return {
        ok: true,
        message: 'Спасибо! Ваша заявка успешно принята. Мы свяжемся с вами в течение 10 минут.',
      };
    }
  } catch (err) {
    console.warn('FormSubmit direct fetch failed, attempting local /api/lead fallback...', err);
  }

  // 2. Fallback to /api/lead (if running in Node.js / Docker / local server)
  try {
    const apiRes = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (apiRes.ok) {
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(101376260, 'reachGoal', 'lead_submit');
      }
      return {
        ok: true,
        message: 'Спасибо! Ваша заявка успешно принята. Мы свяжемся с вами в течение 10 минут.',
      };
    }
  } catch (err) {
    console.error('All lead submit methods failed', err);
  }

  return {
    ok: false,
    error: 'Не удалось отправить заявку через форму. Пожалуйста, позвоните нам напрямую: +7 (4232) 76-11-61.',
  };
}
