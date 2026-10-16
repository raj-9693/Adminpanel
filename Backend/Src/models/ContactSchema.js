const mongoose = require("mongoose");
const { Schema } = mongoose;

// Ye sirf contact PAGE ke text ka schema hai (labels, links, form ke naam).
// Jo enquiry user form bhar ke bhejega, uska schema alag banega.
const ContactSchema = new Schema(
  {
    hero: {
      eyebrow: { type: String, default: "" },
      title: { type: String, required: true }, // \n se nayi line aati hai
      text: { type: String, default: "" },
    },

    reach: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      items: [
        {
          _id: false,
          id: { type: String, required: true },
          icon: { type: String, default: "phone" },
          label: { type: String, required: true, trim: true },
          value: { type: String, default: "" }, // \n se nayi line aa sakti hai
          note: { type: String, default: "" },
          href: { type: String, default: "" }, // tel:, https:// link, ya khali
          arrow: { type: Boolean, default: false },
        },
      ],
    },

    map: {
      pinLabel: { type: String, default: "" },
      pinPlace: { type: String, default: "" },
      title: { type: String, default: "" },
      text: { type: String, default: "" },
      button: { type: String, default: "" },
      url: { type: String, default: "" },
    },

    form: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      note: { type: String, default: "" },
      nameLabel: { type: String, default: "" },
      namePh: { type: String, default: "" }, // Ph = placeholder
      phoneLabel: { type: String, default: "" },
      phonePh: { type: String, default: "" },
      dateLabel: { type: String, default: "" },
      datePh: { type: String, default: "" },
      lookingLabel: { type: String, default: "" },
      options: [
        {
          _id: false,
          id: { type: String, required: true },
          label: { type: String, required: true, trim: true },
        },
      ],
      messageLabel: { type: String, default: "" },
      messagePh: { type: String, default: "" },
      privacy: { type: String, default: "" },
      button: { type: String, default: "" },
    },

    quick: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      button: { type: String, default: "" },
      href: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const ContactContent = mongoose.model("ContactContent", ContactSchema);
module.exports = ContactContent;