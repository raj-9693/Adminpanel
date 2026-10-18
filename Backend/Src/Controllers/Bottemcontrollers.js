const BottomDeta = require("../models/BottemSchema");

// POST: bottom (CTA + footer) ka data pehli baar save karo
const PostDeta = async (req, res) => {
  const data = req.body;

  // Bottom ke schema ke hisaab se check
  if (
    !data.cta?.title ||
    !data.footer?.brand ||
    !Array.isArray(data.footer?.links) ||
    data.footer.links.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "cta.title, footer.brand and footer.links are required",
    });
  }

  try {
    // Bottom ka sirf ek hi document hona chahiye
    const exists = await BottomDeta.findOne();
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Bottom data already exists. Use PUT to update.",
      });
    }

    // Poora body seedha do, baaki validation schema karega
    const Deta = await BottomDeta.create(data);

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
    const Deta = await BottomDeta.findOne();

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Sends Sucessfull",
      Bottom: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: admin panel se update
const UpdateDeta = async (req, res) => {
  try {
    const Deta = await BottomDeta.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Updated Sucessfull",
      Bottom: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { PostDeta, GetDeta, UpdateDeta };