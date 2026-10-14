// =====================================================================
// Saanjh — editor ka DEFAULT content (home, gallery, shared bottom).
// Backend na ho ya pehli baar load ho to yahi data dikhta hai.
// Images abhi placeholder (picsum) hain — editor me replace ho jaati hain.
// =====================================================================
const img = (seed, w = 700, h = 900) => `https://picsum.photos/seed/saanjh-${seed}/${w}/${h}`;

export const SITE_NAV = ['Home', 'Gallery', 'Services', 'Reviews', 'About', 'Booking', 'Contact'];

/* ----------------------------- HOME ----------------------------- */
export const homeDefaults = {
  hero: {
    eyebrow: 'Bridal beauty by appointment',
    title: 'Your wedding glow, lovingly crafted.',
    subtitle:
      'Thoughtful bridal artistry for every ceremony, every photograph and every quiet moment you will remember. Saanjh creates a look that feels like you.',
    primaryCta: 'Book your date',
    secondaryCta: 'View looks',
    image: img('hero', 800, 1000),
    imageName: '',
    badge: 'Soft-rosed bridal look',
  },
  stats: {
    items: [
      { id: 's1', value: '650+', label: 'Brides celebrated' },
      { id: 's2', value: '12 yrs', label: 'Of artistry' },
      { id: 's3', value: '4.9/5', label: 'Client rating' },
    ],
  },
  basics: {
    eyebrow: 'The Saanjh basics',
    title: 'A look that feels entirely yours.',
    linkText: 'Explore all rituals',
    items: [
      { id: 'b1', icon: 'sparkles', title: 'Bridal artistry', desc: 'Skin-first makeup and hair, shaped around your outfit and your ceremony light.', price: 'From ₹18,000' },
      { id: 'b2', icon: 'flower', title: 'Mehendi & Haldi', desc: 'Fresh, playful looks for the mornings that fill the house with laughter.', price: 'From ₹8,000' },
      { id: 'b3', icon: 'heartHandshake', title: 'Engagement glow', desc: 'A soft, camera-ready look for the day you say yes in front of everyone.', price: 'From ₹12,000' },
      { id: 'b4', icon: 'users', title: 'Bride tribe', desc: 'Mothers, sisters and best friends, styled with the same care as you.', price: 'From ₹5,000' },
    ],
  },
  glimpse: {
    eyebrow: 'Real radiance, real moments',
    title: 'A little glimpse of forever.',
    buttonText: 'See more of Saanjh brides',
    items: [
      { id: 'g1', image: img('glimpse1', 600, 800), imageName: '', name: 'Aarna', caption: 'Mehendi blessing' },
      { id: 'g2', image: img('glimpse2', 600, 800), imageName: '', name: 'Ira', caption: 'Temple ceremony' },
      { id: 'g3', image: img('glimpse3', 600, 800), imageName: '', name: 'Meher', caption: 'The reception glow' },
    ],
  },
  reviews: {
    eyebrow: 'Notes from our brides',
    title: 'Love notes, preserved.',
    items: [
      { id: 'r1', quote: 'I felt like myself, only softer and more luminous. Every detail was held through the final dance.', name: 'Naina Shah', meta: 'Jaipur wedding · March 2025' },
      { id: 'r2', quote: 'Saanjh heard my vision before I could say it. The morning felt calm, considered and so special.', name: 'Rhea Malhotra', meta: 'Udaipur wedding · January 2025' },
      { id: 'r3', quote: 'The photographs glow because I did. I would choose this gentle, gifted team again and again.', name: 'Ananya Rao', meta: 'Delhi wedding · December 2024' },
    ],
  },
  promises: {
    items: [
      { id: 'p1', icon: 'heart', title: 'Yes, amplified', text: 'Your features, enhanced. Never covered up.' },
      { id: 'p2', icon: 'sparkles', title: 'Sensational artistry', text: 'Precise, long-lasting work that photographs beautifully.' },
      { id: 'p3', icon: 'clock', title: 'Calm mornings', text: 'A quiet, unhurried schedule on your wedding day.' },
      { id: 'p4', icon: 'pin', title: 'Where you are', text: 'Studio visits, or we travel to your venue.' },
    ],
  },
};

/* ---------------------------- GALLERY ---------------------------- */
export const galleryDefaults = {
  intro: {
    eyebrow: 'The Saanjh portfolio',
    title: 'A little glimpse of forever.',
    text: 'Explore the luminous details, soft rituals and personal beauty stories created for Saanjh brides across every celebration.',
  },
  filters: {
    allLabel: 'All looks',
    categories: [
      { id: 'c1', label: 'Bridal Makeup' },
      { id: 'c2', label: 'Bridal Mehendi' },
      { id: 'c3', label: 'Engagement Makeup' },
      { id: 'c4', label: 'Party Makeup' },
    ],
  },
  items: [
    { id: 'l1', image: img('look1'), imageName: '', title: 'Rhea’s palace vows', category: 'c1', published: true,
      description: 'Soft, warm gold lining and a luminous, skin-first base shaped for a palace ceremony and a long day of photographs.',
      details: 'Bridal makeup · Soft cooling · Organza setting' },
    { id: 'l2', image: img('look2'), imageName: '', title: 'The floral veil', category: 'c2', published: true,
      description: 'Delicate floral mehendi that frames the hands for the rituals, finished with a deep, long-lasting stain.',
      details: 'Bridal mehendi · Floral motifs · Natural henna' },
    { id: 'l3', image: img('look3'), imageName: '', title: 'Meher’s evening glow', category: 'c4', published: true,
      description: 'A glowing, glossy evening look with bold eyes, made to hold from the first toast to the last dance.',
      details: 'Party makeup · Bold eyes · Glossy finish' },
    { id: 'l4', image: img('look4'), imageName: '', title: 'Aarna’s mehendi morning', category: 'c2', published: true,
      description: 'Fine, intricate detailing on a quiet morning, with time for tea, laughter and photographs.',
      details: 'Bridal mehendi · Fine detailing · Arabic styling' },
    { id: 'l5', image: img('look5'), imageName: '', title: 'A sunlit celebration', category: 'c4', published: true,
      description: 'Fresh, sun-kissed colour for a daytime celebration with family close by.',
      details: 'Party makeup · Warm tones · Soft waves' },
    { id: 'l6', image: img('look6'), imageName: '', title: 'Blush & pearl', category: 'c1', published: true,
      description: 'A romantic blush palette with pearl details, made for a bride who wants a gentle, timeless look.',
      details: 'Bridal makeup · Blush tones · Pearl accents' },
    { id: 'l7', image: img('look7'), imageName: '', title: 'Wine & gold', category: 'c3', published: true,
      description: 'Deep wine lips with a touch of gold for an engagement look that feels celebratory and refined.',
      details: 'Engagement makeup · Wine lips · Gold shimmer' },
    { id: 'l8', image: img('look8'), imageName: '', title: 'Henna heirloom', category: 'c2', published: true,
      description: 'Traditional motifs, drawn slowly and with care, for hands that tell the family’s story.',
      details: 'Bridal mehendi · Traditional motifs · Deep stain' },
  ],
  focus: {
    eyebrow: 'In focus',
    title: 'A closer look at Rhea’s ceremony glow.',
    itemId: 'l1',
    detailsLabel: 'The Saanjh edit',
    buttonText: 'Book this look',
  },
};

/* ------------------- SHARED BOTTOM (CTA + FOOTER) -------------------
   Ye section Home aur Gallery (aur baaki pages) par same hai.
   Alag key ("bottom") me save hota hai, isliye ek jagah edit karo to
   sab pages par update ho jaata hai.                                   */
export const bottomDefaults = {
  cta: {
    eyebrow: 'Your Saanjh begins here',
    title: 'Let’s make space for your most beautiful day.',
    text: 'Our 2026–27 bridal calendar is open. Share your date and we’ll create a plan around your ceremonies, your family and your favourite details.',
    button: 'Enquire for your date',
  },
  footer: {
    brand: 'Saanjh',
    blurb: 'Bridal beauty, lovingly crafted for the moments that deserve to be remembered.',
    linksTitle: 'Quick links',
    links: [
      { id: 'f1', label: 'Home' },
      { id: 'f2', label: 'Gallery' },
      { id: 'f3', label: 'Bridal services' },
      { id: 'f4', label: 'Book consultation' },
    ],
    visitTitle: 'Visit us',
    address: 'Mehrauli, New Delhi\nBy appointment only',
    email: 'hello@saanjhbeauty.in',
    phone: '+91 98765 43210',
    followTitle: 'Stay close',
    followText: 'Follow our latest bridal stories and beauty notes.',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
    copyright: '© 2026 Saanjh Bridal Beauty. All rights reserved.',
    madeWith: 'Made with care for Saanjh brides.',
  },
};

/* ----------------------------- ABOUT ----------------------------- */
export const aboutDefaults = {
  hero: {
    eyebrow: 'The hands behind the glow',
    title: 'Beauty that begins with listening.',
    text: 'Meet the artist behind Saanjh—a quiet presence for your wedding morning and a considered hand behind every luminous detail.',
  },
  story: {
    eyebrow: 'A note from Riya',
    title: 'A softer way to get ready.',
    image: img('about-riya', 800, 1000),
    imageName: '',
    quote: '“A bride should look like herself, remembered beautifully.”',
    p1: 'I began Saanjh with a simple belief: beauty on a wedding day should never feel like a costume. It should feel like recognition—your features, your rituals, your joy, brought gently into focus.',
    p2: 'For over twelve years, I have worked with brides across intimate home ceremonies and grand destination celebrations. Every look starts with a conversation, and every brushstroke has a reason.',
    stats: [
      { id: 'a1', value: '12 years', label: 'Bridal artistry' },
      { id: 'a2', value: '650+ brides', label: 'Loved looks' },
    ],
    button: 'Plan your Saanjh',
  },
  numbers: {
    items: [
      { id: 'n1', value: '4.9/5', label: 'Bride rating' },
      { id: 'n2', value: '18', label: 'Cities travelled' },
      { id: 'n3', value: '200+', label: 'Love notes' },
      { id: 'n4', value: '1:1', label: 'Personal attention' },
    ],
  },
  process: {
    eyebrow: 'From first hello to final touch',
    title: 'Our process, held with care.',
    items: [
      { id: 'st1', title: 'Consultation', text: 'We speak about your ceremonies, wardrobe, skin, references, and the feeling you want to carry.' },
      { id: 'st2', title: 'Your trial', text: 'A relaxed studio session to refine tones, texture, hair, and every personal finishing touch.' },
      { id: 'st3', title: 'Wedding day', text: 'A calm, beautifully paced morning where your look comes together without rush.' },
      { id: 'st4', title: 'Touch-ups', text: 'A final check before you step out, plus thoughtful guidance for effortless wear through celebration.' },
    ],
  },
  travel: {
    eyebrow: 'Where Saanjh travels',
    title: 'Near your people, wherever they gather.',
    text: 'Our studio is in New Delhi, with destination bridal bookings across India and beyond. Travel planning is always handled with clarity and care.',
    cities: [
      { id: 'ct1', label: 'Delhi NCR' }, { id: 'ct2', label: 'Jaipur' }, { id: 'ct3', label: 'Udaipur' },
      { id: 'ct4', label: 'Mumbai' }, { id: 'ct5', label: 'Goa' }, { id: 'ct6', label: 'Worldwide' },
    ],
  },
  kit: {
    eyebrow: 'Our kit, considered',
    title: 'Trusted by artists. Chosen for your skin.',
    text: 'We edit every kit around performance, comfort, and photography—not trends alone.',
    brands: [
      { id: 'br1', label: 'MAC Cosmetics' }, { id: 'br2', label: 'NARS' }, { id: 'br3', label: 'Charlotte Tilbury' },
      { id: 'br4', label: 'Dior Beauty' }, { id: 'br5', label: 'Huda Beauty' }, { id: 'br6', label: 'Bobbi Brown' },
    ],
    note: 'Every product is selected after your consultation, with sensitivity and undertone in mind.',
  },
};
