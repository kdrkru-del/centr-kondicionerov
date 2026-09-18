import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { StructuredData } from '@/components/seo/StructuredData';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';

export const metadata: Metadata = {
  metadataBase: new URL('https://кондиционеры-владивосток.рф'),
  title: 'Кондиционеры с установкой во Владивостоке под ключ | Центр кондиционеров',
  description: 'Продажа и профессиональная установка сплит-систем во Владивостоке, Артёме и Уссурийске. Гарантия до 4 лет, аккуратный монтаж, оплата после выполнения. Проверенные бренды MDV, Amston, Dahatsu, Hunberg.',
  keywords: [
    'кондиционеры владивосток',
    'установка кондиционеров владивосток',
    'монтаж кондиционеров владивосток',
    'сплит система владивосток купить с установкой',
    'кондиционер с монтажом владивосток',
    'кондиционеры артём',
    'кондиционеры уссурийск',
    'mdv владивосток',
    'amston кондиционер',
    'dahatsu legend'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Кондиционеры с установкой во Владивостоке под ключ | Центр кондиционеров',
    description: 'Продажа и установка климатической техники во Владивостоке. Гарантия до 4 лет, оплата после монтажа.',
    url: 'https://кондиционеры-владивосток.рф',
    siteName: 'Центр Кондиционеров',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/images/hero/air-conditioner-hero.png',
        width: 1200,
        height: 630,
        alt: 'Центр кондиционеров - продажа и установка во Владивостоке'
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <StructuredData type="localBusiness" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
        <YandexMetrika />
      </body>
    </html>
  );
}
