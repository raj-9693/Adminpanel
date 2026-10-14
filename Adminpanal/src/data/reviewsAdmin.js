// DUMMY DATA — backend ban jaye to GET /admin/pages/reviews yahi shape dega.
const img = (seed) => `https://picsum.photos/seed/saanjh-${seed}/700/525`;

export const reviewsPageDummy = {
  status: "published",
  sectionOrder: ["hero", "summary", "testimonials", "messages", "values", "cta"],
  hero: {
    eyebrow: "Notes from our brides",
    title: "A thousand little moments, held with love.",
    intro: "Every Saanjh morning begins with a conversation—and ends with a bride who feels beautifully, unmistakably herself.",
  },
  summary: {
    auto: true,
    average: 4.9,
    total: 200,
    distribution: { 5: 188, 4: 12, 3: 0, 2: 0, 1: 0 },
    text: "Across every ritual, celebration and soft morning.",
    note: "Based on verified feedback after the wedding day.",
  },
  testimonialsSection: {
    eyebrow: "In their own words",
    title: "The glow was always personal.",
    note: "Thoughtful notes from brides who trusted us with the beginning of their forever.",
  },
  testimonials: [
    { id: "t1", name: "Naina Shah", meta: "Jaipur wedding · March 2025", rating: 5, published: true, featured: true,
      quote: "I felt like myself, only softer and more luminous. Every detail held through the final dance.",
      image: img("naina"), imageName: "naina-shah.jpg", imageSize: 2400000 },
    { id: "t2", name: "Rhea Malhotra", meta: "Udaipur wedding · January 2025", rating: 5, published: true, featured: true,
      quote: "Saanjh heard my vision before I could say it. The morning felt calm, considered, and so special.", image: "" },
    { id: "t3", name: "Ananya Rao", meta: "Delhi wedding · December 2024", rating: 5, published: true, featured: true,
      quote: "The photographs glow because I did. I would choose this gentle, gifted team again and again.", image: "" },
  ],
  messagesSection: {
    eyebrow: "Little messages, kept forever",
    title: "The sweetest kind of proof.",
    text: "Some of our favourite notes arrive after the music fades—full of joy, relief, and a little happy disbelief.",
  },
  messages: [
    { id: "m1", name: "Tanya Kapoor", time: "11:42 AM", published: true, text: "Saanjh, I cannot stop looking at the photos. My skin looked like skin—just the happiest version of it. Thank you for keeping me so calm. 🤍" },
    { id: "m2", name: "Meher Arora", time: "8:18 PM", published: true, text: "The haldi look lasted through all the hugs, tears and dancing. You understood exactly what I wanted. Still floating! ✨" },
    { id: "m3", name: "Ishita Bansal", time: "10:06 PM", published: true, text: "Mumma said I looked like myself on my most beautiful day. That is everything I hoped for. Sending you the biggest hug! 🌸" },
    { id: "m4", name: "Kavya Menon", time: "9:30 AM", published: true, text: "My mehndi is still so dark and the design is exactly what I imagined. Everyone keeps asking who made it! 🌿" },
    { id: "m5", name: "Sana Qureshi", time: "7:55 PM", published: true, text: "You made the whole morning feel unhurried. I actually enjoyed getting ready, which I never thought I would. Thank you! 💛" },
    { id: "m6", name: "Riya Desai", time: "12:20 PM", published: true, text: "My mum, aunts and I all looked like one beautiful story. Every moment of the Bride tribe booking was worth it. 🥹" },
  ],
  values: [
    { id: "v1", icon: "heartHandshake", title: "You, amplified", text: "Your features, your rituals, your glow." },
    { id: "v2", icon: "palette", title: "Intentional artistry", text: "Every detail planned around your vision." },
    { id: "v3", icon: "clock", title: "Calm mornings", text: "A considered rhythm for your wedding day." },
    { id: "v4", icon: "pin", title: "Where you are", text: "Studio and destination bookings across India." },
  ],
  cta: {
    eyebrow: "Your Saanjh begins here",
    title: "Let’s make space for\nyour most beautiful day.",
    text: "Our 2025–26 bridal calendar is open. Share your celebrations and we will create a personal beauty plan.",
    button: "Enquire for your date",
    tone: "dark",
  },
};
