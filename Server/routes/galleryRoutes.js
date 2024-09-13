const router = require("express").Router();
const { mustLogin, allowedRoles } = require("../controllers/authControllers");
const {
  getGalleryImageByTitleNumber,
  getAllGalleryImages,
  createNewGalleryImage,
  createSeveralGallryImages,
  updateImageUrl,
  deleteImgaeFromGallery,
  deleteAllImagesFromGallery,
} = require("../controllers/galleryController");

// base api: /gallery'

// get All images
router.get("/", getAllGalleryImages);
// get specific image
router.get("/:title", getGalleryImageByTitleNumber);
// post one image to MongoeDB
router.post("/", mustLogin, allowedRoles(["admin"]), createNewGalleryImage);
// post all images from "gallery" folder of Cloudinary to MongoDB
router.post(
  "/arrayOfImages",
  mustLogin,
  allowedRoles(["admin"]),
  createSeveralGallryImages
);
// update one image to MongoeDB
router.put("/:title", mustLogin, allowedRoles(["admin"]), updateImageUrl);
// delete specific image
router.delete(
  "/:title",
  mustLogin,
  allowedRoles(["admin"]),
  deleteImgaeFromGallery
);
// delete all images from gallery
router.delete(
  "/delete/all",
  mustLogin,
  allowedRoles(["admin"]),
  deleteAllImagesFromGallery
);

module.exports = router;
