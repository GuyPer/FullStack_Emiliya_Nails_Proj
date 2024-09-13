const schemas = require("../schemas/gallerySchema");
const Gallery = require("../models/Gallery");
const { getAllImagesInFolder } = require("../utils/cloudinary");
const mongoose = require("mongoose");
const { getMaxTitleValue } = require("../utils/dbUtils");

// -------------------------------------------------------------
//  GET ALL GALLERY IMAGES
// -------------------------------------------------------------

const getAllGalleryImages = async (req, res) => {
  try {
    const allGalleryImages = await Gallery.find({});
    // return all gallery images
    return res.status(200).json({
      success: true,
      data: allGalleryImages,
    });
    // return an error message
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// -------------------------------------------------------------
//  GET SPECIFIC IMAGE FROM MONGODB
// -------------------------------------------------------------

const getGalleryImageByTitleNumber = async (req, res) => {
  const { title } = req.params;
  try {
    // find the gallery image that matches this title number
    const found = await Gallery.findOne({ title: title });
    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `image title '${title}' not found`,
    });
    // return an error message
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid format for image title",
    });
  }
};

// -------------------------------------------------------------
//  CREATE ONE SPECIFIC IMAGE TO MONGODB
// -------------------------------------------------------------

const createNewGalleryImage = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.createNewGalleryImage.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // create a new Gallery image instance
  const newGalleryImage = new Gallery(value);
  try {
    const saved = await newGalleryImage.save();
    // success ! return a response
    return res.status(201).json({
      success: true,
      created: saved,
    });
  } catch (err) {
    // error
    return res
      .status(500)
      .json({ success: false, message: `error saving the gallery image` });
  }
};

// -------------------------------------------------------------
//  CREATE/UPLOAD SEVERAL IMAGES FROM CLOUDINARY TO MONGODB
// -------------------------------------------------------------

const createSeveralGallryImages = async (req, res) => {
  try {
    // Find the highest value on the title field
    let currentMaxTitle = await getMaxTitleValue();
    // Getting all the images URLs from Cloudinary folder "gallery"
    const urls = await getAllImagesInFolder("gallery");
    // Prepare the images for uploading with validation
    const imagesToInsert = urls.map((url, index) => {
      currentMaxTitle++;
      const newImage = {
        title: currentMaxTitle.toString(),
        image: {
          url: url,
        },
      };
      // Validate each image object using Joi
      const { error, value } = schemas.createNewGalleryImage.validate(newImage);
      if (error) {
        // If validation fails, return an error message
        const errorsArray = error.details.map((err) => err.message);
        return res.status(400).json({ success: false, message: errorsArray });
      }
      return value; // Return the validated object
    });

    // Upload the validated images to MongoDB
    const savedImages = await Gallery.insertMany(imagesToInsert);
    return res.status(201).json({ success: true, created: savedImages });
  } catch (error) {
    console.error("Error saving images:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error saving images" });
  }
};

// -------------------------------------------------------------
//  UPDATE IMAGE URL ON MONGODB
// -------------------------------------------------------------

const updateImageUrl = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.updateGalleryImage.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // get the title from url
  const { title } = req.params;
  let updated;
  try {
    updated = await Gallery.findOne({ title: title }).updateOne(value).exec();
    // not found- return a response and stop execution
    if (!updated)
      return res.status(404).json({
        success: false,
        message: `image title ${title} was not found.`,
      });
    // found- return a response
    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `image title ${title} was not found.` });
  }
};

// -------------------------------------------------------------
//  DELETE ONE SPECIFIC IMAGE ON MONGODB
// -------------------------------------------------------------

const deleteImgaeFromGallery = async (req, res) => {
  // get the image from url
  const { title } = req.params;
  // try to handle errors
  try {
    const deleted = await Gallery.deleteOne({ title: title });
    if (!deleted) throw new Error();
    if (deleted.deletedCount === 0) {
      // if not found
      return res.status(404).json({
        success: false,
        message: `Image with title '${title}' not found`,
      });
    }
    // found & deleted
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `image  ${title} not found` });
  }
};

// -------------------------------------------------------------
//  DELETE ALL IMAGES ON MONGODB
// -------------------------------------------------------------

const deleteAllImagesFromGallery = async (req, res) => {
  try {
    // Delete all images in the Gallery collection
    const deleteAll = await Gallery.deleteMany({});

    if (deleteAll.deletedCount === 0) {
      // If no images were found to delete
      return res
        .status(404)
        .json({ success: false, message: "No images found" });
    }

    // If images were found and deleted
    return res.status(200).json({
      success: true,
      message: `All ${deleteAll.deletedCount} images found and deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting images",
    });
  }
};

module.exports = {
  getGalleryImageByTitleNumber,
  getAllGalleryImages,
  createNewGalleryImage,
  createSeveralGallryImages,
  updateImageUrl,
  deleteImgaeFromGallery,
  deleteAllImagesFromGallery,
};
