const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// function to get all the addresses on Cloudinary folder
async function getAllImagesInFolder(folderName) {
  let allImages = [];
  let nextCursor = null;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: `${folderName}/`,
      max_results: 500,
      next_cursor: nextCursor,
    });

    allImages = allImages.concat(
      result.resources.map((resource) => resource.secure_url)
    );
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return allImages;
}

module.exports = {
  cloudinary,
  getAllImagesInFolder,
};
