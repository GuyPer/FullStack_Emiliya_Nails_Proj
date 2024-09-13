// routes/upload.js
const express = require("express");
const router = express.Router();
const { uploadImages } = require("../controllers/uploadImageController");
const multer = require("../utils/multer");
const { mustLogin, allowedRoles } = require("../controllers/authControllers");

// base api: /upload'

// Use a single route and pass the folder name as a query parameter
router.post(
  "/:folder",
  mustLogin,
  allowedRoles(["admin"]),
  multer.array("images", 10),
  uploadImages
);

module.exports = router;
