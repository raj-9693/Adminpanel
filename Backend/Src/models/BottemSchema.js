const mongoose = require("mongoose");
const { Schema } = mongoose;

const BottomSchema = new Schema(
  {
    cta: {
      eyebrow: { type: String, default: "" },
      title: { type: String, required: true },
      text: { type: String, default: "" },
      button: { type: String, default: "" },
    },

    footer: {
      brand: { type: String, required: true, trim: true },
      blurb: { type: String, default: "" },
      linksTitle: { type: String, default: "" },
      links: [
        {
          _id: false,
          id: { type: String, required: true },
          label: { type: String, required: true, trim: true },
        },
      ],
      visitTitle: { type: String, default: "" },
      address: { type: String, default: "" }, // \n se nayi line aati hai
      email: { type: String, default: "", trim: true, lowercase: true },
      phone: { type: String, default: "", trim: true },
      followTitle: { type: String, default: "" },
      followText: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
      copyright: { type: String, default: "" },
      madeWith: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Bottom = mongoose.model("Bottom", BottomSchema);
module.exports = Bottom;