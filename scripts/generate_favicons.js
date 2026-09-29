const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// The exact brand mark used in Header.tsx:
// <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0062D2] flex items-center justify-center ...">
//   <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
//     <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
//   </svg>
// </div>

// We also note public/images/logo.svg has:
// <rect x="2" y="6" width="36" height="36" rx="10" fill="#2B8CFF"/> with waves.
// But the prompt specifically states:
// "На сайте в Header уже используется фирменный логотип «Центр Кондиционеров».
// Нужно взять именно графический знак из этого логотипа — синюю иконку слева от текста — и использовать её как favicon сайта."

// Let's create an SVG that centers this exact symbol inside the #0062D2 rounded-square container.
// In 48x48:
// rounded rect: x=2, y=2, width=44, height=44, rx=11, fill="#0062D2"
// icon viewBox is 24x24. If centered in 48x48, translate(12, 12).
// Stroke width = 2.2 * 1.1 = ~2.4 for crisp visibility even at 16x16.

const svgContent = `<svg width="512" height="512" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="44" height="44" rx="11" fill="#0062D2"/>
  <g transform="translate(12, 12)">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

async function run() {
  const svgBuffer = Buffer.from(svgContent);

  // 1. Save icon.svg in public and src/app
  fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgContent);
  fs.writeFileSync(path.join(__dirname, '../src/app/icon.svg'), svgContent);

  // 2. Generate PNGs: 16x16, 32x32, 48x48, 180x180 (apple-icon), 192x192, 512x512
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();

  // Save apple-touch-icon
  fs.writeFileSync(path.join(__dirname, '../src/app/apple-icon.png'), png180);
  fs.writeFileSync(path.join(__dirname, '../public/apple-touch-icon.png'), png180);

  // Save icon.png
  fs.writeFileSync(path.join(__dirname, '../src/app/icon.png'), png512);
  fs.writeFileSync(path.join(__dirname, '../public/icon-192.png'), png192);
  fs.writeFileSync(path.join(__dirname, '../public/icon-512.png'), png512);

  // 3. Build a multi-size ICO file containing 16x16, 32x32, 48x48
  // Standard ICO format header:
  // 2 bytes: 0 (reserved)
  // 2 bytes: 1 (icon type)
  // 2 bytes: number of images (3)
  // Each entry (16 bytes):
  // 1 byte: width (0 for 256)
  // 1 byte: height (0 for 256)
  // 1 byte: colors (0 if >= 8bpp)
  // 1 byte: reserved (0)
  // 2 bytes: color planes (1)
  // 2 bytes: bits per pixel (32)
  // 4 bytes: size of image data in bytes
  // 4 bytes: offset of image data from beginning of file

  const images = [
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 }
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  const entriesCount = images.length;
  let offset = headerSize + dirEntrySize * entriesCount;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(entriesCount, 4); // count

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...dirEntries,
    ...images.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);

  console.log('Favicons generated successfully!');
}

run().catch(console.error);
