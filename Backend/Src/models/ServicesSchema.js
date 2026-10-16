const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServicesSchema = new Schema(
  {
    hero: {
      eyebrow: { type: String, default: "" },
      title: { type: String, required: true },
      text: { type: String, default: "" },
    },

    packages: {
      note: { type: String, default: "" },
      badge: { type: String, default: "" },
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          image: { type: String, default: "" },
          imageName: { type: String, default: "" },
          eyebrow: { type: String, default: "" },
          title: { type: String, required: true, trim: true },
          price: { type: String, default: "" }, // "₹18,000" text hai, isliye String
          priceNote: { type: String, default: "" },
          features: { type: String, default: "" }, // har feature nayi line (\n) mein
          button: { type: String, default: "Book This" },
          popular: { type: Boolean, default: false },
        },
      ],
    },

    compare: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      note: { type: String, default: "" },
      tableLabel: { type: String, default: "" },
      priceRowLabel: { type: String, default: "" },
      rows: [
        {
          _id: false,
          id: { type: String, required: true },
          label: { type: String, required: true, trim: true },
          // { p1: true, p3: true } jaisa object. Keys package ki id hoti hain, isliye Map use kiya
          inc: { type: Map, of: Boolean, default: {} },
        },
      ],
    },

    faq: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      text: { type: String, default: "" },
      button: { type: String, default: "" },
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          q: { type: String, required: true },
          a: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

const Services = mongoose.model("Services", ServicesSchema);
module.exports = Services;