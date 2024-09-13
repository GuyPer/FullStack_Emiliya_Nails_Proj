// controllers/imageController.js
const { cloudinary } = require("../utils/cloudinary");
const fs = require("fs");

// -------------------------------------------------------------
//  UPLOAD IMAGES FROM LOCAL FOLDER TO CLOUDINARY ACCOUNT
// -------------------------------------------------------------

const uploadImages = async (req, res) => {
  try {
    const folder = req.params.folder; // 'gallery' or 'products'
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: "No files uploaded." });
    }

    const urls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folder,
        width: 300,
        crop: "scale",
      });
      urls.push(result.secure_url);
      fs.unlinkSync(file.path);
    }

    res.status(200).json({
      success: true,
      urls,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unhandled server error",
    });
  }
};

module.exports = {
  uploadImages,
};
