import type { NextConfig } from "next";

const isGhPages = process.env.DEPLOY_TARGET === 'gh-pages';

const nextConfig: NextConfig = {
  ...(isGhPages
    ? {
        output: 'export',
        basePath: '/centr-kondicionerov',
        images: {
          unoptimized: true,
        },
      }
    : {}),
  async redirects() {
    return [
      // 1. Old website brand URLs -> Canonical brand routes in /catalog
      {
        source: '/mdv',
        destination: '/catalog/mdv',
        permanent: true,
      },
      {
        source: '/amston',
        destination: '/catalog/amston',
        permanent: true,
      },
      {
        source: '/hunberg',
        destination: '/catalog/hunberg',
        permanent: true,
      },
      {
        source: '/dahatsu',
        destination: '/catalog/dahatsu',
        permanent: true,
      },

      // 2. Old sitemap section URLs -> Canonical pages / anchors
      {
        source: '/katalogh',
        destination: '/catalog',
        permanent: true,
      },
      {
        source: '/kontakty',
        destination: '/#contacts',
        permanent: true,
      },
      {
        source: '/uslughi',
        destination: '/installation',
        permanent: true,
      },
      {
        source: '/aktsii',
        destination: '/catalog',
        permanent: true,
      },
      {
        source: '/o_kompanii',
        destination: '/#warranty',
        permanent: true,
      },
      {
        source: '/novosti',
        destination: '/catalog',
        permanent: true,
      },
      {
        source: '/mdvprom',
        destination: '/catalog/mdv',
        permanent: true,
      },

      // 3. SEO consolidation: /vladivostok -> canonical root /
      {
        source: '/vladivostok',
        destination: '/',
        permanent: true,
      },

      // 4. Previous nested brand URL structure -> Direct /catalog/:brand
      {
        source: '/catalog/brand/:brand',
        destination: '/catalog/:brand',
        permanent: true,
      },

      // 5. Old MDV slugs from prior iterations -> Canonical brand catalog /catalog/mdv
      {
        source: '/catalog/mdv-classic-inverter',
        destination: '/catalog/mdv',
        permanent: true,
      },
      {
        source: '/catalog/mdv-infini-nordic-heat-pump-09',
        destination: '/catalog/mdv',
        permanent: true,
      },
      {
        source: '/catalog/mdv-aurora-07',
        destination: '/catalog/mdv',
        permanent: true,
      },
      {
        source: '/catalog/mdv-infini-uv-pro',
        destination: '/catalog/mdv',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
