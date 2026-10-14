const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    intro: {
      eyebrow: { type: String, required: true },
      title: { type: String, required: true },
      text: { type: String, required: true },
    },

    filters: {
      allLabel: { type: String, required: true },
      categories: [
        {
          _id: false,
          id: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
    },

    items: [
      {
        _id: false,
        id: { type: String, required: true },
        image: { type: String, default: "" },
        imageName: { type: String, default: "" },
        title: { type: String, required: true },
        category: { type: String, required: true }, // categories ki id, jaise 'c1'
        published: { type: Boolean, default: true },
        description: { type: String, default: "" },
        details: { type: String, default: "" },
      },
    ],

    // focus array nahi, ek single object hai
    focus: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      itemId: { type: String, default: "" }, // items ki id, jaise 'l1'
      detailsLabel: { type: String, default: "" },
      buttonText: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", GallerySchema);
module.exports = Gallery;