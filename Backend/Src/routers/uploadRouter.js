const express = require("express");
const multer = require("multer");
const { UploadImage } = require("../../Src/Controllers/uploadController");

const router = express.Router();

// Image disk pe nahi, memory mein rakhte hain (max 5MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// "image" wahi key hai jo Postman/frontend ke form-data mein likhte hain
router.post("/upload", upload.single("image"), UploadImage);

module.exports = router;