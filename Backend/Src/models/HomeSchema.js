const mongoose = require('mongoose');
const { Schema } = mongoose;

// Main schema: poora home page ek hi document mein
const homeContentSchema = new Schema(
  {
    hero: {
      eyebrow: { type: String, default: '' },
      title: { type: String, required: true },
      subtitle: { type: String, default: '' },
      primaryCta: { type: String, default: 'Book your date' },
      secondaryCta: { type: String, default: 'View looks' },
      image: { type: String, default: '' },
      imageName: { type: String, default: '' },
      badge: { type: String, default: '' },
    },

    stats: {
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          value: { type: String, required: true, trim: true },
          label: { type: String, required: true, trim: true },
        },
      ],
    },

    basics: {
      eyebrow: { type: String, default: '' },
      title: { type: String, default: '' },
      linkText: { type: String, default: '' },
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          icon: { type: String, default: 'sparkles' },
          title: { type: String, required: true, trim: true },
          desc: { type: String, default: '' },
          price: { type: String, default: '' },
        },
      ],
    },

    glimpse: {
      eyebrow: { type: String, default: '' },
      title: { type: String, default: '' },
      buttonText: { type: String, default: '' },
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          image: { type: String, default: '' },
          imageName: { type: String, default: '' },
          name: { type: String, required: true, trim: true },
          caption: { type: String, default: '' },
        },
      ],
    },

    reviews: {
      eyebrow: { type: String, default: '' },
      title: { type: String, default: '' },
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          quote: { type: String, required: true },
          name: { type: String, required: true, trim: true },
          meta: { type: String, default: '' },
        },
      ],
    },

    promises: {
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          icon: { type: String, default: 'heart' },
          title: { type: String, required: true, trim: true },
          text: { type: String, default: '' },
        },
      ],
    },
  },
  { timestamps: true } // createdAt, updatedAt automatic
);

module.exports = mongoose.model('HomeContent', homeContentSchema);