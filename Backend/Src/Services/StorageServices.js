require("dotenv").config();
const ImageKitPkg = require("@imagekit/nodejs");
const ImageKit = ImageKitPkg.default || ImageKitPkg;

// ImageKit client sirf yahan ek baar banta hai, private key sirf backend mein
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Ek image upload karo. `file` multer ki file hai (req.file ya req.files ka item)
// `folder` se ImageKit mein alag-alag folder ban jaate hain (home, gallery, about...)
const uploadImage = async (file, folder = "/saanjh") => {
  const result = await client.files.upload({
    file: new File([file.buffer], file.originalname),
    fileName: file.originalname,
    folder,
  });

  return {
    url: result.url, // schema ke `image` field mein jaayega
    name: file.originalname, // schema ke `imageName` field mein jaayega
    fileId: result.fileId, // baad mein delete karne ke kaam aayega
  };
};

module.exports = { uploadImage };