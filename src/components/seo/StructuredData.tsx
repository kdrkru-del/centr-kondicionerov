import React from 'react';
import { Product } from '@/types';
import { FAQ_ITEMS } from '@/data/faq';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type?: 'localBusiness' | 'product' | 'faq' | 'breadcrumbs';
  product?: Product;
  breadcrumbs?: BreadcrumbItem[];
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type = 'localBusiness', product, breadcrumbs }) => {
  if (type === 'breadcrumbs' && breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `https://кондиционеры-владивосток.рф${crumb.url}`
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    );
  }

  if (type === 'product' && product) {
    // If it's a series, render CollectionPage, NOT a fake Product Offer
    if (product.itemType === 'series') {
      const seriesSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: product.name,
        description: product.description || product.name,
        url: `https://кондиционеры-владивосток.рф/catalog/${product.slug}`,
        brand: {
          '@type': 'Brand',
          name: product.brand
        }
      };

      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }}
        />
      );
    }

    const productSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: `https://кондиционеры-владивосток.рф${product.image}`,
      description: product.description || product.name,
      brand: {
        '@type': 'Brand',
        name: product.brand
      }
    };

    if (product.price) {
      productSchema.offers = {
        '@type': 'Offer',
        url: `https://кондиционеры-владивосток.рф/catalog/${product.slug}`,
        priceCurrency: 'RUB',
        price: product.price,
        description: product.priceFrom ? 'Цена оборудования от указанной суммы' : 'Цена оборудования',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition'
      };
    } else if (product.priceWithInstallation) {
      productSchema.offers = {
        '@type': 'Offer',
        url: `https://кондиционеры-владивосток.рф/catalog/${product.slug}`,
        priceCurrency: 'RUB',
        price: product.priceWithInstallation,
        description: 'Комплексная цена с профессиональным монтажом под ключ',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition'
      };
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    );
  }

  if (type === 'faq') {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    );
  }

  // Default: LocalBusiness (only confirmed data from original business)
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Центр Кондиционеров',
    telephone: '+7 (4232) 76-11-61',
    email: 'centrkondicionerov@gmail.com',
    areaServed: [
      { '@type': 'City', name: 'Владивосток' },
      { '@type': 'City', name: 'Артём' },
      { '@type': 'City', name: 'Уссурийск' }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
    />
  );
};
