const Product = require("../models/Product");
const schemas = require("../schemas/productSchema");

// -------------------------------------------------------------
//  GET ALL PRODUCTS
// -------------------------------------------------------------

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    // return all products
    return res.status(200).json({
      success: true,
      data: allProducts,
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
//  GET A SPECIFIC PRODUCT
// -------------------------------------------------------------

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const found = await Product.findById(id);
    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    return res.status(404).json({
      success: false,
      message: `Product with ID '${id}' not found`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid format for product ID",
    });
  }
};

// -------------------------------------------------------------
//  CREATE\POST ONE PRODUCT TO MONGODB
// -------------------------------------------------------------

const createNewProduct = async (req, res) => {
  // Validate the request's body using Joi
  const { error, value } = schemas.createNewProduct.validate(req.body);
  // Check if there are Joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }
  try {
    // Get the next unique bizNumber
    const bizNumber = await Product.getNextBizNumber();
    // Create a new Product instance with the bizNumber
    const newProduct = new Product({
      ...value, // Copy all the validated fields
      bizNumber, // Add the generated bizNumber
    });

    // Save the product to MongoDB
    const savedProduct = await newProduct.save();

    // Success! Return a response
    return res.status(201).json({
      success: true,
      created: savedProduct,
    });
  } catch (err) {
    // Handle error
    return res.status(500).json({
      success: false,
      message: `Error saving the product: ${err.message}`,
    });
  }
};

// -------------------------------------------------------------
//  UPDATE\EDIT PRODUCT BY ADMIN
// -------------------------------------------------------------

const updateProduct = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.updateProduct.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // get the id from url
  const { id } = req.params;
  try {
    const updated = await Product.findByIdAndUpdate(id, value, { new: true });
    // if the product was not found
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} was not found.`,
      });
    }
    // if the product was found and updated
    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error updating product with ID ${id}.`,
    });
  }
};

// -------------------------------------------------------------
//  DELETE PRODUCT BY ADMIN
// -------------------------------------------------------------

const deleteProduct = async (req, res) => {
  // get the id from url
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);

    // if the product was not found
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Product with ID '${id}' not found`,
      });
    }

    // if the product was found and deleted
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error deleting product with ID ${id}.`,
    });
  }
};

// -------------------------------------------------------------
//  DELETE ALL PRODUCTS BY ADMIN
// -------------------------------------------------------------

const deleteAllProducts = async (req, res) => {
  try {
    // Delete all products from the collection
    const deleteAll = await Product.deleteMany({});

    if (deleteAll.deletedCount === 0) {
      // If no images were found to delete
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    // If images were found and deleted
    return res.status(200).json({
      success: true,
      message: `All ${deleteAll.deletedCount} products found and deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting products",
    });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
