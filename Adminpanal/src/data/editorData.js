export const editorMeta = {
  eyebrow: 'Website',
  title: 'Home page editor',
  lastPublished: 'Last published 18 min ago',
  userInitials: 'AK',
  sectionsTitle: 'Page sections',
  sectionsSub: 'Shape the welcome your brides receive.',
  previewTitle: 'Live preview',
};

export const sectionList = [
  { id: 'hero', title: 'Hero', subtitle: 'Opening message & image', icon: 'sparkle' },
  { id: 'stats', title: 'Stats', subtitle: 'Studio proof points', icon: 'chart' },
  { id: 'services', title: 'Services strip', subtitle: 'Featured bridal rituals', icon: 'layers' },
  { id: 'gallery', title: 'Gallery strip', subtitle: 'Featured celebration images', icon: 'image' },
  { id: 'reviews', title: 'Reviews strip', subtitle: 'Brides’ notes of love', icon: 'chat' },
  { id: 'values', title: 'Values', subtitle: 'The Saanjh promise', icon: 'heart' },
];

export const siteNav = ['Our story', 'Services', 'Brides'];

export const initialContent = {
  hero: {
    eyebrow: 'Bridal beauty, thoughtfully held',
    headline: 'Beauty that feels like you, at your most celebrated.',
    subtext: 'A personal bridal ritual, shaped around your light, your stories, and the people you love.',
    cta: 'Begin your bridal story',
    image: { name: 'Courtyard bridal portrait', url: '' },
    cardTitle: 'Held with care',
    cardText: 'Your beauty, your pace.',
  },
  stats: {
    items: [
      { value: '430+', label: 'Brides celebrated' },
      { value: '12 years', label: 'Of thoughtful artistry' },
      { value: '4.9/5', label: 'From our brides' },
    ],
  },
  services: {
    heading: 'Featured bridal rituals',
    items: [
      { title: 'Bridal HD', desc: 'Camera-ready skin and a look that lasts from rituals to reception.', price: 'From ₹45,000' },
      { title: 'Bridal Trial', desc: 'A relaxed session to find your look before the big day.', price: 'From ₹8,000' },
      { title: 'Bride + Family', desc: 'Everyone who matters, styled with the same care.', price: 'From ₹60,000' },
    ],
  },
  gallery: {
    heading: 'Celebrations we have held',
    images: [],
  },
  reviews: {
    heading: 'Brides’ notes of love',
    items: [
      { name: 'Ira Bansal', quote: 'I felt like myself, only calmer and more radiant. The team thought of everything.', rating: 5 },
      { name: 'Kavya Mehta', quote: 'The trial made me so relaxed. On the wedding morning, nothing felt rushed.', rating: 5 },
      { name: 'Tanya Bedi', quote: 'My whole family was looked after. Truly the most graceful studio.', rating: 5 },
    ],
  },
  values: {
    heading: 'The Saanjh promise',
    items: [
      { title: 'Held with care', text: 'Every bride is listened to before a single brush is lifted.' },
      { title: 'Your pace', text: 'No rush, no pressure, just time that is truly yours.' },
      { title: 'Precisely managed', text: 'Timings, teams and details coordinated so you can simply enjoy.' },
    ],
  },
};
