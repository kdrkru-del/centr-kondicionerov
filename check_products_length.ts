import { PRODUCTS } from './src/data/products';
console.log('PRODUCTS.length =', PRODUCTS.length);
PRODUCTS.forEach((p, i) => {
  console.log(`${i + 1}. [${p.id}] ${p.name} | brand=${p.brand} | price=${p.price} | priceWithInstall=${p.priceWithInstallation} | badge=${p.badge}`);
});
