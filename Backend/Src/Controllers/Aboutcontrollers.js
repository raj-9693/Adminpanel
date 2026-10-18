const AboutDeta = require("../models/AboutSchema");

// POST: about page ka data pehli baar save karo
const PostDeta = async (req, res) => {
  const data = req.body;

  // About ke naye schema ke hisaab se check
  if (
    !data.hero?.title ||
    !Array.isArray(data.story?.stats) ||
    data.story.stats.length === 0 ||
    !Array.isArray(data.numbers?.items) ||
    data.numbers.items.length === 0 ||
    !Array.isArray(data.process?.items) ||
    data.process.items.length === 0 ||
        !Array.isArray(data.process?.items) ||
    data.process.items.length === 0 ||
    !Array.isArray(data.artists?.items) ||
    data.artists.items.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "hero.title, story.stats, numbers.items and process.items are required",
    });
  }

  try {
    // About ka sirf ek hi document hona chahiye
    const exists = await AboutDeta.findOne();
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "About data already exists. Use PUT to update.",
      });
    }

    // Poora body seedha do, baaki validation schema karega
    const Deta = await AboutDeta.create(data);

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
    // find() list deta hai, findOne() ek object (aboutDefaults jaisa)
    const Deta = await AboutDeta.findOne();

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Sucessful send",
      aboutdeta: Deta,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: admin panel se update
const UpdateDeta = async (req, res) => {
  try {
    const Deta = await AboutDeta.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Updated Sucessfull",
      aboutdeta: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { PostDeta, GetDeta, UpdateDeta };