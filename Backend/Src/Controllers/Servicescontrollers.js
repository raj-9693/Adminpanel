const ServicesDeta = require("../../Src/models/ServicesSchema");

// POST: services page ka data pehli baar save karo
const PostDeta = async (req, res) => {
  const data = req.body;

  if (
    !data.hero?.title ||
    !Array.isArray(data.packages?.items) ||
    data.packages.items.length === 0 ||
    !Array.isArray(data.compare?.rows) ||
    data.compare.rows.length === 0 ||
    !Array.isArray(data.faq?.items) ||
    data.faq.items.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "hero.title, packages.items, compare.rows and faq.items are required",
    });
  }

  try {
    // Services ka sirf ek hi document hona chahiye
    const exists = await ServicesDeta.findOne();
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Services data already exists. Use PUT to update.",
      });
    }

    const Deta = await ServicesDeta.create(data);

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
    const Deta = await ServicesDeta.findOne();
    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    return res.status(200).json({
      success: true,
      message: "Deta Sends Sucessfull",
      Services: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: admin panel se update
const UpdateDeta = async (req, res) => {
  try {
    const Deta = await ServicesDeta.findOneAndUpdate({}, req.body, {
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