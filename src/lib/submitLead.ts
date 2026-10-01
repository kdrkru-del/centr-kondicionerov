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

// --- RATE LIMITING & FLOOD PROTECTION CONFIGURATION ---
const STORAGE_KEY_TIMESTAMPS = 'ck_lead_timestamps';
const STORAGE_KEY_LAST_SUBMIT = 'ck_lead_last_submit';
const STORAGE_KEY_LAST_HASH = 'ck_lead_last_payload';

const MIN_INTERVAL_MS = 15 * 1000; // 15 seconds cooldown between any submissions
const WINDOW_MS = 10 * 60 * 1000;  // 10 minutes sliding window
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Maximum 3 leads per 10 minutes from a single device

/**
 * Checks client-side rate limits using localStorage.
 * Prevents spam bots and rapid duplicate submissions (e.g. 150 clicks).
 */
function checkRateLimit(phoneClean: string, name?: string): { allowed: boolean; error?: string } {
  if (typeof window === 'undefined') {
    return { allowed: true };
  }

  const now = Date.now();

  try {
    // 1. Check minimum interval between requests (15s cooldown)
    const lastSubmitStr = localStorage.getItem(STORAGE_KEY_LAST_SUBMIT);
    if (lastSubmitStr) {
      const lastSubmitTime = parseInt(lastSubmitStr, 10);
      const diffMs = now - lastSubmitTime;
      if (!isNaN(lastSubmitTime) && diffMs < MIN_INTERVAL_MS) {
        const waitSec = Math.ceil((MIN_INTERVAL_MS - diffMs) / 1000);
        return {
          allowed: false,
          error: `Вы уже отправили заявку. Пожалуйста, подождите ${waitSec} сек. перед повторной отправкой.`,
        };
      }
    }

    // 2. Check sliding window limit (max 3 submissions per 10 minutes)
    const rawTimestamps = localStorage.getItem(STORAGE_KEY_TIMESTAMPS);
    let timestamps: number[] = [];
    if (rawTimestamps) {
      try {
        timestamps = JSON.parse(rawTimestamps);
        if (!Array.isArray(timestamps)) timestamps = [];
      } catch {
        timestamps = [];
      }
    }

    // Keep only timestamps within the sliding window
    timestamps = timestamps.filter((t) => typeof t === 'number' && now - t < WINDOW_MS);

    if (timestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      const oldestInWindow = timestamps[0];
      const unblockInMs = WINDOW_MS - (now - oldestInWindow);
      const unblockMinutes = Math.max(1, Math.ceil(unblockInMs / 60000));
      return {
        allowed: false,
        error: `Превышен лимит запросов. Для защиты от спама следующая отправка будет доступна через ${unblockMinutes} мин. Или позвоните нам напрямую: +7 (4232) 76-11-61.`,
      };
    }

    // 3. Check duplicate submission with the exact same phone number within 5 minutes
    const lastHash = localStorage.getItem(STORAGE_KEY_LAST_HASH);
    const currentHash = `${phoneClean}_${(name || '').trim().toLowerCase()}`;
    if (lastHash === currentHash && lastSubmitStr) {
      const lastTime = parseInt(lastSubmitStr, 10);
      if (!isNaN(lastTime) && now - lastTime < 5 * 60 * 1000) {
        return {
          allowed: false,
          error: 'Заявка с этим номером уже принята и находится в обработке. Наш менеджер скоро свяжется с вами!',
        };
      }
    }
  } catch (e) {
    // localStorage might be restricted/unavailable in some private modes
    console.warn('Rate limit storage check warning:', e);
  }

  return { allowed: true };
}

/**
 * Records a successful submission in localStorage to enforce rate limits.
 */
function recordSubmission(phoneClean: string, name?: string) {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  try {
    localStorage.setItem(STORAGE_KEY_LAST_SUBMIT, now.toString());
    localStorage.setItem(STORAGE_KEY_LAST_HASH, `${phoneClean}_${(name || '').trim().toLowerCase()}`);

    const rawTimestamps = localStorage.getItem(STORAGE_KEY_TIMESTAMPS);
    let timestamps: number[] = [];
    if (rawTimestamps) {
      try {
        timestamps = JSON.parse(rawTimestamps);
        if (!Array.isArray(timestamps)) timestamps = [];
      } catch {
        timestamps = [];
      }
    }
    timestamps = timestamps.filter((t) => typeof t === 'number' && now - t < WINDOW_MS);
    timestamps.push(now);
    localStorage.setItem(STORAGE_KEY_TIMESTAMPS, JSON.stringify(timestamps));
  } catch (e) {
    console.warn('Rate limit storage record warning:', e);
  }
}

/**
 * Universal lead submitter for static GitHub Pages and Next.js.
 * Directly transmits customer leads to the company email (centrkondicionerov@gmail.com).
 * Includes rate limiting, flood protection, and honeypot antispam.
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

  // Rate limiting check
  const rateLimit = checkRateLimit(cleanDigits, name);
  if (!rateLimit.allowed) {
    return {
      ok: false,
      error: rateLimit.error,
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
    const isSuccess = res.ok && (data.success === 'true' || data.success === true);

    if (isSuccess) {
      recordSubmission(cleanDigits, name);
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(101376260, 'reachGoal', 'lead_submit');
      }
      return {
        ok: true,
        message: 'Спасибо! Ваша заявка успешно принята. Мы свяжемся с вами в ближайшее время.',
      };
    }

    if (data.message && typeof data.message === 'string' && data.message.includes('Activation')) {
      console.warn('FormSubmit requires email activation for', RECIPIENT_EMAIL);
      recordSubmission(cleanDigits, name);
      return {
        ok: true,
        message: 'Спасибо! Заявка зарегистрирована. Специалист свяжется с вами по указанному номеру.',
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
      recordSubmission(cleanDigits, name);
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(101376260, 'reachGoal', 'lead_submit');
      }
      return {
        ok: true,
        message: 'Спасибо! Ваша заявка успешно принята. Мы свяжемся с вами в ближайшее время.',
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
