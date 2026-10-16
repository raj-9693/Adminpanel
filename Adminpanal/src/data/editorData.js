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
   Admin me alag page: Website → Bottom (key "bottom"). Ek jagah edit karo to
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
    blurb: 'Bridal beauty, lovingly crafted for the moments that become family stories.',
    linksTitle: 'Quick links',
    links: [
      { id: 'f1', label: 'Services' },
      { id: 'f2', label: 'Gallery' },
      { id: 'f3', label: 'Bride reviews' },
      { id: 'f4', label: 'Book a consultation' },
    ],
    visitTitle: 'Find us',
    address: 'Mehrauli, New Delhi\nBy appointment only',
    email: 'hello@saanjhbeauty.in',
    phone: '+91 98765 43210',
    followTitle: 'Stay close',
    followText: 'Follow the latest Saanjh brides and quiet beauty rituals.',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
    copyright: '© 2026 Saanjh Bridal Beauty. All rights reserved.',
    madeWith: 'Made with care for every celebration.',
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

/* ---------------------------- SERVICES ---------------------------- */
export const servicesDefaults = {
  hero: {
    eyebrow: 'The Saanjh bridal menu',
    title: 'Beauty plans for every beautiful chapter.',
    text: 'Choose the artistry that meets your celebration. Every Saanjh booking begins with a thoughtful conversation about your vision, rituals and personal glow.',
  },
  packages: {
    note: 'Final pricing is shaped by your event date, city, ceremony timing and bridal party needs. A custom quote follows your consultation.',
    items: [
      { id: 'p1', image: img('pkg1', 600, 450), imageName: '', eyebrow: 'For the main ceremony', title: 'Bridal Makeup', price: '₹18,000', priceNote: 'onwards',
        features: 'Personal beauty consultation\nHD or airbrush complexion\nHair styling & dupatta setting\nTouch-up kit', button: 'Book This', popular: false },
      { id: 'p2', image: img('pkg2', 600, 450), imageName: '', eyebrow: 'For hands that tell a story', title: 'Bridal Mehndi', price: '₹7,500', priceNote: 'onwards',
        features: 'Custom bridal design\nPremium natural henna\nBoth hands & feet\nAftercare guidance', button: 'Book This', popular: false },
      { id: 'p3', image: img('pkg3', 600, 450), imageName: '', eyebrow: 'The complete Saanjh edit', title: 'Combo Package', price: '₹32,000', priceNote: 'onwards',
        features: 'Bridal makeup & hair\nBridal mehndi design\nOne pre-wedding look\nPriority date support', button: 'Book This', popular: true },
      { id: 'p4', image: img('pkg4', 600, 450), imageName: '', eyebrow: 'For every celebration after', title: 'Party Makeup', price: '₹8,500', priceNote: 'onwards',
        features: 'Soft glam or festive makeup\nEvent-ready hair styling\nLashes included\n60-minute session', button: 'Book This', popular: false },
    ],
    badge: 'Most popular',
  },
  compare: {
    eyebrow: 'At a glance',
    title: 'Find your perfect Saanjh service.',
    note: 'All packages are thoughtfully tailored after a short consultation.',
    tableLabel: 'Included with your booking',
    priceRowLabel: 'Starting investment',
    rows: [
      { id: 'r1', label: 'Personal consultation', inc: { p1: true, p2: true, p3: true } },
      { id: 'r2', label: 'Makeup & hair styling', inc: { p1: true, p3: true, p4: true } },
      { id: 'r3', label: 'Bridal mehndi', inc: { p2: true, p3: true } },
      { id: 'r4', label: 'Pre-wedding event look', inc: { p3: true } },
      { id: 'r5', label: 'Touch-up kit', inc: { p1: true, p3: true } },
    ],
  },
  faq: {
    eyebrow: 'Before you book',
    title: 'A calm start to every beauty story.',
    text: 'The practical details, answered with care. For anything more personal, our bridal concierge is only a message away.',
    button: 'Ask about your date',
    items: [
      { id: 'q1', q: 'Can I book a bridal makeup trial?', a: 'Yes. Trials are available for bridal makeup bookings and are best scheduled 6–10 weeks before your celebration. We use the session to refine your skin finish, eye mood and hair direction.' },
      { id: 'q2', q: 'Do you travel for weddings?', a: 'Yes. We travel across India and beyond for destination weddings. Travel and stay are planned with you, with clarity on every detail.' },
      { id: 'q3', q: 'What advance payment secures my date?', a: 'A 30% advance secures your date. The balance is due before the wedding day, and we confirm everything in writing.' },
      { id: 'q4', q: 'Which products do you use?', a: 'We use trusted professional brands, chosen after your consultation to suit your skin, sensitivity and undertone.' },
    ],
  },
};

/* ---------------------------- REVIEWS ----------------------------- */
export const reviewsDefaults = {
  hero: {
    eyebrow: 'Notes from our brides',
    title: 'A thousand little moments, held with love.',
    intro: 'Every Saanjh morning begins with a conversation—and ends with a bride who feels beautifully, unmistakably herself.',
  },
  summary: {
    auto: true,
    average: 4.9,
    total: 200,
    distribution: { 5: 188, 4: 12, 3: 0, 2: 0, 1: 0 },
    text: 'Across intimate ceremonies, grand celebrations, and every ritual in between.',
    note: 'Based on verified client feedback collected after the wedding day.',
  },
  testimonialsSection: {
    eyebrow: 'In their own words',
    title: 'The glow was always personal.',
    note: 'Thoughtful notes from brides who trusted us with the beginning of their forever.',
  },
  testimonials: [
    { id: 't1', name: 'Naina Shah', meta: 'Jaipur wedding · March 2025', rating: 5, published: true, featured: true,
      quote: 'I felt like myself, only softer and more luminous. Every detail held through the final dance.', image: img('naina', 700, 525), imageName: '' },
    { id: 't2', name: 'Rhea Malhotra', meta: 'Udaipur wedding · January 2025', rating: 5, published: true, featured: true,
      quote: 'Saanjh heard my vision before I could say it. The morning felt calm, considered, and so special.', image: '', imageName: '' },
    { id: 't3', name: 'Ananya Rao', meta: 'Delhi wedding · December 2024', rating: 5, published: true, featured: true,
      quote: 'The photographs glow because I did. I would choose this gentle, gifted team again and again.', image: '', imageName: '' },
  ],
  messagesSection: {
    eyebrow: 'Little messages, kept forever',
    title: 'The sweetest kind of proof.',
    text: 'Some of our favourite notes arrive after the music fades—full of joy, relief, and a little happy disbelief.',
  },
  messages: [
    { id: 'm1', name: 'Tanya Kapoor', time: '11:42 AM', published: true, text: 'Saanjh, I cannot stop looking at the photos. My skin looked like skin—just the happiest version of it. Thank you for keeping me so calm. 🤍' },
    { id: 'm2', name: 'Meher Arora', time: '8:18 PM', published: true, text: 'The haldi look lasted through all the hugs, tears and dancing. You understood exactly what I wanted. Still floating! ✨' },
    { id: 'm3', name: 'Ishita Bansal', time: '10:06 PM', published: true, text: 'Mumma said I looked like myself on my most beautiful day. That is everything I hoped for. Sending you the biggest hug! 🌸' },
  ],
  values: [
    { id: 'v1', icon: 'heartHandshake', title: 'You, amplified', text: 'Your features, your rituals, your glow.' },
    { id: 'v2', icon: 'palette', title: 'Intentional artistry', text: 'Every detail planned around your vision.' },
    { id: 'v3', icon: 'clock', title: 'Calm mornings', text: 'A considered rhythm for your wedding day.' },
    { id: 'v4', icon: 'pin', title: 'Where you are', text: 'Studio and destination bookings across India.' },
  ],
};

/* ----------------------------- CONTACT ----------------------------- */
export const contactDefaults = {
  hero: {
    eyebrow: 'The Saanjh studio',
    title: 'Let’s hold space for\nyour beautiful day.',
    text: 'A question, a date, a vision still taking shape — write to us and we’ll find the most thoughtful way forward together.',
  },
  reach: {
    eyebrow: 'Reach us directly',
    title: 'A warm hello away.',
    items: [
      { id: 'c1', icon: 'phone', label: 'Studio line', value: '+91 98765 43210', note: '', href: 'tel:+919876543210', arrow: false },
      { id: 'c2', icon: 'whatsapp', label: 'WhatsApp', value: 'Begin a bridal conversation', note: '', href: 'https://wa.me/919876543210', arrow: true },
      { id: 'c3', icon: 'instagram', label: 'Instagram', value: '@saanjhbeauty', note: '', href: 'https://instagram.com/saanjhbeauty', arrow: true },
      { id: 'c4', icon: 'pin', label: 'Studio visits', value: 'Mehrauli, New Delhi\nBy appointment only', note: '', href: '', arrow: false },
      { id: 'c5', icon: 'clock', label: 'Working hours', value: 'Tue–Sun · 10am–7pm', note: 'Mondays reserved for our bridal kits', href: '', arrow: false },
    ],
  },
  map: {
    pinLabel: 'Saanjh Studio',
    pinPlace: 'Mehrauli, New Delhi',
    title: 'Find the studio',
    text: 'A quiet, sunlit space for your consultation.',
    button: 'Open map',
    url: 'https://maps.google.com/?q=Mehrauli+New+Delhi',
  },
  form: {
    eyebrow: 'Bridal enquiry',
    title: 'Tell us a little.',
    note: 'We usually reply within one working day.',
    nameLabel: 'Your name', namePh: 'Your full name',
    phoneLabel: 'Phone / WhatsApp', phonePh: '+91',
    dateLabel: 'Wedding date', datePh: 'DD / MM / YYYY',
    lookingLabel: 'I’m looking for',
    options: [
      { id: 'o1', label: 'Bridal Makeup' }, { id: 'o2', label: 'Bridal Mehndi' },
      { id: 'o3', label: 'Combo Package' }, { id: 'o4', label: 'Party Makeup' },
    ],
    messageLabel: 'Your celebration',
    messagePh: 'Venue, ceremonies, or anything you would love us to know…',
    privacy: 'By sending this note, you’re inviting Saanjh to contact you about your bridal enquiry.',
    button: 'Send enquiry',
  },
  quick: {
    eyebrow: 'Prefer a quick hello?',
    title: 'Your date is worth a conversation.',
    button: 'Chat on WhatsApp',
    href: 'https://wa.me/919876543210',
  },
};

/* ----------------------------- BOOKING ----------------------------- */
// Dhyan: calendar ki "held" dates aur customers ki bookings yahan se edit nahi hoti (wo Bookings/backend ka kaam hai).
export const bookingDefaults = {
  hero: {
    crumb: 'Booking',
    eyebrow: 'Reserve your Saanjh',
    title: 'Let’s hold space for\nyour beautiful day.',
    text: 'Tell us a little about your celebrations. This thoughtful three-step inquiry takes just a few minutes, and our bridal team will personally confirm availability.',
  },
  steps: [
    { id: 's1', tab: 'Your service', title: 'Choose the beauty story you need.', text: 'Select the primary service for your wedding date. You can add personal details in the next step.', button: 'Continue to event details' },
    { id: 's2', tab: 'Event details', title: 'The shape of your celebration.', text: '', button: 'Continue to your details' },
    { id: 's3', tab: 'About you', title: 'A few details, just for us.', text: '' },
  ],
  services: [
    { id: 'v1', icon: 'sparkles', title: 'Bridal Makeup', desc: 'Signature skin, hair and draping for your main ceremony.', price: 'From ₹18,000' },
    { id: 'v2', icon: 'flower', title: 'Bridal Mehndi', desc: 'Personal, intricate henna for you and your closest people.', price: 'From ₹8,000' },
    { id: 'v3', icon: 'heart', title: 'Combo Package', desc: 'Makeup and mehndi, held together in one considered plan.', price: 'From ₹24,000' },
    { id: 'v4', icon: 'users', title: 'Party Makeup', desc: 'Polished, celebratory beauty for family and festivities.', price: 'From ₹5,500' },
  ],
  event: {
    dateLabel: 'Wedding date',
    calendarNote: 'Grey dates are already held for another bride.',
    venueLabel: 'Venue / city', venuePh: 'e.g. The Leela Palace, Udaipur',
    guestsLabel: 'Mehndi guests', guestsPh: 'Around 35 guests',
    trialTitle: 'Add a trial session',
    trialText: 'A calm rehearsal before your wedding week.',
  },
  you: {
    nameLabel: 'Your full name', namePh: 'e.g. Ananya Mehra',
    phoneLabel: 'Phone / WhatsApp', phonePh: '+91 98 0000 0000',
    notesLabel: 'Anything you’d like us to know?',
    notesPh: 'Your ceremonies, skin preferences, inspiration, or a note for the team…',
  },
  summary: {
    title: 'Booking Summary',
    status: 'In progress',
    serviceLabel: 'Selected service',
    dateLabel: 'Wedding date',
    celebrationLabel: 'Celebration',
    venueFallback: 'Venue to be shared',
    note: 'Your date is not reserved until our team confirms it personally on WhatsApp.',
    button: 'Confirm on WhatsApp',
    privacy: 'Your details are only used to plan your Saanjh consultation.',
  },
};
