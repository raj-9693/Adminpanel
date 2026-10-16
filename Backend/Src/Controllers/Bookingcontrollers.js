const BookingDeta = require("../../Src/models/BookingSchema");

// POST: booking page ka text-data pehli baar save karo
const PostDeta = async (req, res) => {
  const data = req.body;

  // Naye schema ke hisaab se check
  if (
    !data.hero?.title ||
    !Array.isArray(data.steps) ||
    data.steps.length === 0 ||
    !Array.isArray(data.services) ||
    data.services.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "hero.title, steps and services are required",
    });
  }

  try {
    // Booking page ka sirf ek hi document hona chahiye
    const exists = await BookingDeta.findOne();
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Booking data already exists. Use PUT to update.",
      });
    }

    // Poora body seedha do, baaki validation schema karega
    const Deta = await BookingDeta.create(data);

    return res.status(201).json({
      success: true,
      message: "Deta Post Sucessfull",
      Deta: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET: frontend ke liye data
const GetDeta = async (req, res) => {
  try {
    // find() list deta hai, findOne() seedha ek object
    const Deta = await BookingDeta.findOne();

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Sends Sucessfull",
      Booking: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: admin panel se update
const UpdateDeta = async (req, res) => {
  try {
    const Deta = await BookingDeta.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Updated Sucessfull",
      Booking: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { PostDeta, GetDeta, UpdateDeta };