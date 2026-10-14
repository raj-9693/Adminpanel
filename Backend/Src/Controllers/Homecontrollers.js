
const HomeContent = require("../models/HomeSchema");

// POST: home page ka data pehli baar save karo
const PostDeta = async (req, res) => {
  const data = req.body;

  // Ab fields nested hain, isliye hero.title aur arrays check karte hain
  if (
    !data.hero ||
    !data.hero.title ||
    !Array.isArray(data.stats?.items) ||
    data.stats.items.length === 0 ||
    !Array.isArray(data.reviews?.items) ||
    data.reviews.items.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "hero.title, stats.items and reviews.items are required",
    });
  }

  try {
    // Home page ka sirf ek hi document hona chahiye
    const exists = await HomeContent.findOne();
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Home data already exists. Use PUT to update.",
      });
    }

    // Schema khud baaki validation karega (required, trim, default)
    const Deta = await HomeContent.create(data);

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
    const Deta = await HomeContent.findOne();
    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    return res.status(200).json({ success: true, Deta: Deta });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: admin panel se update
const UpdateDeta = async (req, res) => {
  try {
    const Deta = await HomeContent.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    return res.status(200).json({
      success: true,
      message: "Deta Updated Sucessfull",
      Deta: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { PostDeta, GetDeta, UpdateDeta };