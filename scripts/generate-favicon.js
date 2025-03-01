const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 色を設定（金色）
const bgColor = { r: 197, g: 165, b: 114, alpha: 1 };
const textColor = { r: 255, g: 255, b: 255, alpha: 1 };

async function generateFavicon() {
  console.log('ファビコンを生成しています...');

  // 32x32のSVGを生成
  const svgBuffer = Buffer.from(`
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold" fill="rgb(${textColor.r}, ${textColor.g}, ${textColor.b})">P</text>
    </svg>
  `);

  // 画像を生成
  const faviconPath = path.join(__dirname, '../public/favicon.ico');
  const faviconPngPath = path.join(__dirname, '../public/favicon.png');

  // PNG形式の画像も生成
  await sharp(svgBuffer).png().toFile(faviconPngPath);

  // ICO形式の画像を生成
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFormat('png')
    .toBuffer()
    .then((data) => {
      fs.writeFileSync(faviconPath, data);
      console.log(`ファビコンを生成しました: ${faviconPath}`);
    });
}

generateFavicon().catch(console.error);
