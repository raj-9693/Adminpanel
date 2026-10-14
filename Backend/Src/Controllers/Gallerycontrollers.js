const galleryDeta = require("../models/GallerySchema");

// POST: gallery ka data pehli baar save karo
const PostDeta = async (req, res) => {
  const data = req.body;

  // Gallery ke naye schema ke hisaab se check
  if (
    !data.intro?.title ||
    !data.filters?.allLabel ||
    !Array.isArray(data.filters?.categories) ||
    data.filters.categories.length === 0 ||
    !Array.isArray(data.items) ||
    data.items.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "intro.title, filters.allLabel, filters.categories and items are required",
    });
  }

  try {
    // Gallery ka sirf ek hi document hona chahiye
    const exists = await galleryDeta.findOne();
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Gallery data already exists. Use PUT to update.",
      });
    }

    // Poora body seedha do, baaki validation schema karega
    const Deta = await galleryDeta.create(data);

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
    // find() list deta hai, findOne() ek object (galleryDefaults jaisa)
    const Deta = await galleryDeta.findOne();

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Sends Sucessfull",
      Gallery: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: admin panel se update
const UpdateDeta = async (req, res) => {
  try {
    const Deta = await galleryDeta.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Updated Sucessfull",
      Gallery: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { PostDeta, GetDeta, UpdateDeta };
