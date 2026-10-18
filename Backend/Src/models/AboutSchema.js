const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: { type: String, default: "" },
      title: { type: String, required: true },
      text: { type: String, default: "" },
    },

    story: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      image: { type: String, default: "" },
      imageName: { type: String, default: "" },
      quote: { type: String, default: "" },
      p1: { type: String, default: "" },
      p2: { type: String, default: "" },
      stats: [
        {
          _id: false,
          id: { type: String, required: true },
          value: { type: String, required: true, trim: true },
          label: { type: String, required: true, trim: true },
        },
      ],
      button: { type: String, default: "" },
    },

    numbers: {
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          value: { type: String, required: true, trim: true },
          label: { type: String, required: true, trim: true },
        },
      ],
    },

    process: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          title: { type: String, required: true, trim: true },
          text: { type: String, default: "" },
        },
      ],
    },

    artists: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      note: { type: String, default: "" },
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          image: { type: String, default: "" },
          imageName: { type: String, default: "" },
          years: { type: String, default: "" }, // "9 yrs" text hai
          role: { type: String, default: "" },
          name: { type: String, required: true, trim: true },
          bio: { type: String, default: "" },
          tags: { type: String, default: "" }, // "Bridal mehndi, Rajasthani" comma wali string
        },
      ],
    },

    travel: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      text: { type: String, default: "" },
      cities: [
        {
          _id: false,
          id: { type: String, required: true },
          label: { type: String, required: true, trim: true },
        },
      ],
    },

    kit: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      text: { type: String, default: "" },
      brands: [
        {
          _id: false,
          id: { type: String, required: true },
          label: { type: String, required: true, trim: true },
        },
      ],
      note: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const About = mongoose.model("About", AboutSchema);
module.exports = About;