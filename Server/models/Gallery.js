const mongoose = require('mongoose');
const {imageSchema } = require("./common");

const gallerySchema = new mongoose.Schema(
    {
        title: String,
        image: imageSchema,
    },
    {
        Timestamp:true,
    }
);

const Gallery = mongoose.model("Gallery", gallerySchema, "gallery");

module.exports = Gallery;