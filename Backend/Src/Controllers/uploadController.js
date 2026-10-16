

const { uploadImage } = require("../Services/StorageServices");

// POST: sirf ek image leta hai, ImageKit pe upload karke URL wapas deta hai
const UploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image file is required" });
  }

  try {
    const img = await uploadImage(req.file, "/saanjh");

    return res.status(201).json({
      success: true,
      message: "Image uploaded",
      image: img.url, // ye URL Home ke JSON mein hero.image mein jaayega
      imageName: img.name,
      fileId: img.fileId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { UploadImage };