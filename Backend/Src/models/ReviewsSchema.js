const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewsSchema = new Schema(
  {
    hero: {
      eyebrow: { type: String, default: "" },
      title: { type: String, required: true },
      intro: { type: String, default: "" },
    },

    summary: {
      auto: { type: Boolean, default: true }, // true = rating testimonials se automatic nikalna
      average: { type: Number, default: 0, min: 0, max: 5 },
      total: { type: Number, default: 0, min: 0 },
      distribution: {
        5: { type: Number, default: 0, min: 0 },
        4: { type: Number, default: 0, min: 0 },
        3: { type: Number, default: 0, min: 0 },
        2: { type: Number, default: 0, min: 0 },
        1: { type: Number, default: 0, min: 0 },
      },
      text: { type: String, default: "" },
      note: { type: String, default: "" },
    },

    testimonialsSection: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      note: { type: String, default: "" },
    },

    testimonials: [
      {
        _id: false,
        id: { type: String, required: true },
        name: { type: String, required: true, trim: true },
        meta: { type: String, default: "" },
        rating: { type: Number, default: 5, min: 1, max: 5 },
        published: { type: Boolean, default: true },
        featured: { type: Boolean, default: false },
        quote: { type: String, required: true },
        image: { type: String, default: "" },
        imageName: { type: String, default: "" },
      },
    ],

    messagesSection: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      text: { type: String, default: "" },
    },

    messages: [
      {
        _id: false,
        id: { type: String, required: true },
        name: { type: String, required: true, trim: true },
        time: { type: String, default: "" }, // "11:42 AM" text hai
        published: { type: Boolean, default: true },
        text: { type: String, required: true },
      },
    ],

    values: [
      {
        _id: false,
        id: { type: String, required: true },
        icon: { type: String, default: "heart" },
        title: { type: String, required: true, trim: true },
        text: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reviews", ReviewsSchema);
module.exports = Reviews;