import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { COMPANY_CONFIG } from '@/config/company';

// In-memory rate limiting for Node.js / Docker production runtime
const rateLimitMap = new Map<string, { count: number; firstSeen: number; lastSeen: number }>();
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// Periodically clean stale records
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now - value.lastSeen > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS).unref?.();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      productName,
      source,
      sourcePage,
      itemType,
      brand,
      series,
      model,
      price,
      priceWithInstallation,
      quizData,
      area,
      city,
      website,
    } = body;

    // Honeypot bot protection
    if (website && String(website).trim().length > 0) {
      console.warn('[SPAM BLOCKED]: Honeypot field was filled');
      // Return 200 OK so bots think they succeeded and stop retrying
      return NextResponse.json({ success: true, message: 'Заявка принята' });
    }

    // Validate phone
    const cleanDigits = (phone || '').replace(/\D/g, '');
    if (!phone || cleanDigits.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Некорректный номер телефона (не менее 10 цифр)' },
        { status: 400 }
      );
    }

    // Rate limiting key: IP address + phone digits
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const clientIp = forwardedFor.split(',')[0].trim() || 'unknown';
    const rateLimitKey = `${clientIp}_${cleanDigits}`;

    const now = Date.now();
    const record = rateLimitMap.get(rateLimitKey);

    if (record) {
      // Cooldown check: at least 10 seconds between requests
      if (now - record.lastSeen < 10 * 1000) {
        return NextResponse.json(
          { success: false, message: 'Пожалуйста, подождите несколько секунд перед следующей отправкой.' },
          { status: 429 }
        );
      }

      if (now - record.firstSeen < RATE_LIMIT_WINDOW_MS) {
        if (record.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            {
              success: false,
              message: 'Превышен лимит отправки заявок. Пожалуйста, подождите или позвоните нам по телефону.',
            },
            { status: 429 }
          );
        }
        record.count += 1;
        record.lastSeen = now;
      } else {
        rateLimitMap.set(rateLimitKey, { count: 1, firstSeen: now, lastSeen: now });
      }
    } else {
      rateLimitMap.set(rateLimitKey, { count: 1, firstSeen: now, lastSeen: now });
    }

    const leadName = (name || '').trim() || 'Не указано';
    const recipientEmail = process.env.LEAD_TO_EMAIL || COMPANY_CONFIG.email;
    const siteUrl = 'https://центр-кондиционеров.рф';
    const pageUrl = sourcePage ? `${siteUrl}${sourcePage}` : siteUrl;

    const formattedPrice = price
      ? `${new Intl.NumberFormat('ru-RU').format(price)} ₽`
      : null;

    const formattedPriceWithInstall = priceWithInstallation
      ? `${new Intl.NumberFormat('ru-RU').format(priceWithInstallation)} ₽`
      : null;

    // Subject
    let subject = 'Новая заявка — Центр Кондиционеров';
    if (productName && productName !== 'Подбор сплит-системы') {
      subject = `Новая заявка — ${productName}`;
    }

    // HTML Email template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #0b1f33; margin-top: 0; border-bottom: 2px solid #2b8cff; padding-bottom: 10px;">
          Новая заявка с сайта «Центр Кондиционеров»
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 140px;">Телефон:</td>
            <td style="padding: 10px 0; font-size: 18px; font-weight: bold; color: #0b1f33;">
              <a href="tel:${phone}" style="color: #2b8cff; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Имя клиента:</td>
            <td style="padding: 8px 0; font-size: 15px; color: #1e293b; font-weight: 600;">${leadName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Источник заявки:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #1e293b;">${source || 'Сайт'}</td>
          </tr>
          ${productName ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Товар / Модель:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #1e293b; font-weight: bold;">${productName}</td>
          </tr>
          ` : ''}
          ${brand ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Бренд:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #1e293b;">${brand}</td>
          </tr>
          ` : ''}
          ${series ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Серия:</td>
            <td style="padding: 8px 0; font-size: 14px; color: #1e293b;">${series}</td>
          </tr>
          ` : ''}
          ${formattedPrice ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Цена оборудования:</td>
            <td style="padding: 8px 0; font-size: 15px; color: #0b1f33; font-weight: bold;">${formattedPrice}</td>
          </tr>
          ` : ''}
          ${formattedPriceWithInstall ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Цена с установкой:</td>
            <td style="padding: 8px 0; font-size: 16px; color: #2b8cff; font-weight: bold;">${formattedPriceWithInstall}</td>
          </tr>
          ` : ''}
          ${area ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Площадь (контекст):</td>
            <td style="padding: 8px 0; font-size: 14px; color: #1e293b;">${area}</td>
          </tr>
          ` : ''}
          ${city ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Город (контекст):</td>
            <td style="padding: 8px 0; font-size: 14px; color: #1e293b;">${city}</td>
          </tr>
          ` : ''}
          ${quizData ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Параметры подбора:</td>
            <td style="padding: 8px 0; font-size: 13px; color: #1e293b; background: #f8fafc; padding: 6px; border-radius: 6px;">
              ${JSON.stringify(quizData, null, 2)}
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Страница отправки:</td>
            <td style="padding: 8px 0; font-size: 13px; color: #2b8cff;">
              <a href="${pageUrl}" style="color: #2b8cff;">${pageUrl}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Дата и время:</td>
            <td style="padding: 8px 0; font-size: 13px; color: #64748b;">${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Vladivostok' })} (Владивосток)</td>
          </tr>
        </table>
      </div>
    `;

    const textContent = `
Новая заявка с сайта «Центр Кондиционеров»
------------------------------------------
Телефон: ${phone}
Имя: ${leadName}
Источник: ${source || 'Сайт'}
${productName ? `Товар: ${productName}\n` : ''}${brand ? `Бренд: ${brand}\n` : ''}${formattedPrice ? `Цена: ${formattedPrice}\n` : ''}${formattedPriceWithInstall ? `С установкой: ${formattedPriceWithInstall}\n` : ''}Страница: ${pageUrl}
Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Vladivostok' })}
    `.trim();

    // Check SMTP configuration
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      // In dev or when SMTP is not configured yet: log and throw error so form doesn't falsely claim success
      console.warn('[SMTP WARNING]: SMTP_USER or SMTP_PASS environment variables are missing.');
      console.log('[LEAD DATA LOGGED]:', { phone, leadName, source, productName });

      return NextResponse.json(
        {
          success: false,
          error: 'SMTP_NOT_CONFIGURED',
          message: 'Сервис отправки писем ожидает настройки SMTP на сервере.'
        },
        { status: 503 }
      );
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT || '465');
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Центр Кондиционеров" <${smtpUser}>`,
      to: recipientEmail,
      subject,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена на электронную почту компании'
    });
  } catch (error: any) {
    console.error('Lead processing error:', error?.message || error);
    return NextResponse.json(
      { success: false, message: 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.' },
      { status: 500 }
    );
  }
}
