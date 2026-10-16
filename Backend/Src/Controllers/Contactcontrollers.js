const contactDeta = require("../../Src/models/ContactSchema");

// POST: contact page ka text-data pehli baar save karo
const PostDeta = async (req, res) => {
  const data = req.body;

  // Naye schema ke hisaab se check
  if (
    !data.hero?.title ||
    !Array.isArray(data.reach?.items) ||
    data.reach.items.length === 0 ||
    !Array.isArray(data.form?.options) ||
    data.form.options.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "hero.title, reach.items and form.options are required",
    });
  }

  try {
    // Contact page ka sirf ek hi document hona chahiye
    const exists = await contactDeta.findOne();
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Contact data already exists. Use PUT to update.",
      });
    }

    // Poora body seedha do, baaki validation schema karega
    const Deta = await contactDeta.create(data);

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
    const Deta = await contactDeta.findOne();

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Sends Sucessfull",
      Contact: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: admin panel se update
const UpdateDeta = async (req, res) => {
  try {
    const Deta = await contactDeta.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!Deta) {
      return res.status(404).json({ success: false, message: "No data found" });
    }

    return res.status(200).json({
      success: true,
      message: "Deta Updated Sucessfull",
      Contact: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { PostDeta, GetDeta, UpdateDeta };