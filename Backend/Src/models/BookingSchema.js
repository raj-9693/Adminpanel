const mongoose = require("mongoose");
const { Schema } = mongoose;

// Ye sirf booking PAGE ke text ka schema hai (labels, steps, services).
// Customers ki asli bookings aur calendar ki "held" dates ka schema alag banega.
const BookingContentSchema = new Schema(
  {
    hero: {
      crumb: { type: String, default: "" },
      eyebrow: { type: String, default: "" },
      title: { type: String, required: true }, // \n se nayi line aati hai
      text: { type: String, default: "" },
    },

    steps: [
      {
        _id: false,
        id: { type: String, required: true },
        tab: { type: String, required: true, trim: true },
        title: { type: String, default: "" },
        text: { type: String, default: "" },
        button: { type: String, default: "" }, // aakhri step mein button nahi hai
      },
    ],

    services: [
      {
        _id: false,
        id: { type: String, required: true },
        icon: { type: String, default: "sparkles" },
        title: { type: String, required: true, trim: true },
        desc: { type: String, default: "" },
        price: { type: String, default: "" }, // "From ₹18,000" text hai
      },
    ],

    event: {
      dateLabel: { type: String, default: "" },
      calendarNote: { type: String, default: "" },
      venueLabel: { type: String, default: "" },
      venuePh: { type: String, default: "" }, // Ph = placeholder
      guestsLabel: { type: String, default: "" },
      guestsPh: { type: String, default: "" },
      trialTitle: { type: String, default: "" },
      trialText: { type: String, default: "" },
    },

    you: {
      nameLabel: { type: String, default: "" },
      namePh: { type: String, default: "" },
      phoneLabel: { type: String, default: "" },
      phonePh: { type: String, default: "" },
      notesLabel: { type: String, default: "" },
      notesPh: { type: String, default: "" },
    },

    summary: {
      title: { type: String, default: "" },
      status: { type: String, default: "" },
      serviceLabel: { type: String, default: "" },
      dateLabel: { type: String, default: "" },
      celebrationLabel: { type: String, default: "" },
      venueFallback: { type: String, default: "" },
      note: { type: String, default: "" },
      button: { type: String, default: "" },
      privacy: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const BookingContent = mongoose.model("BookingContent", BookingContentSchema);
module.exports = BookingContent;