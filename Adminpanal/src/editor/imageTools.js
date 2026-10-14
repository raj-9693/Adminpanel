// Upload ki hui photo ko chhota (max 1200px, JPEG) karke data-URL banata hai,
// taaki refresh ke baad bhi dikhe aur save payload halka rahe.
export function compressImage(file, maxSide = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      const r = Math.min(1, maxSide / Math.max(im.width, im.height));
      const c = document.createElement('canvas');
      c.width = Math.round(im.width * r);
      c.height = Math.round(im.height * r);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', quality));
    };
    im.onerror = () => { URL.revokeObjectURL(url); reject(new Error('bad-image')); };
    im.src = url;
  });
}

export const uid = () => `n${Math.random().toString(36).slice(2, 9)}`;
export const prettyName = (file) =>
  file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim().replace(/^./, (c) => c.toUpperCase());
