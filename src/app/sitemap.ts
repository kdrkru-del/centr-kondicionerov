import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { BRANDS } from '@/data/brands';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://кондиционеры-владивосток.рф';

  // Static indexable canonical pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalog`,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/selection`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/installation`,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/artem`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ussuriysk`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Brand indexable canonical pages
  const brandPages = BRANDS.map((brand) => ({
    url: `${baseUrl}/catalog/${brand.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Product and series indexable canonical pages
  const productPages = PRODUCTS.map((product) => ({
    url: `${baseUrl}/catalog/${product.slug}`,
    changeFrequency: 'weekly' as const,
    priority: product.badge ? 0.9 : 0.8,
  }));

  return [...staticPages, ...brandPages, ...productPages];
}
