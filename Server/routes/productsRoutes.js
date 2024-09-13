const router = require("express").Router();
const { mustLogin, allowedRoles } = require("../controllers/authControllers");
const {
  getAllProducts,
  getProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} = require("../controllers/productController");

// base api: /products'

// get All products
router.get("/", getAllProducts);
// get specific product
router.get("/:id", getProduct);
// post one product to MongoeDB
router.post("/", mustLogin, allowedRoles(["admin"]), createNewProduct);
// update one product to MongoeDB
router.put("/:id", mustLogin, allowedRoles(["admin"]), updateProduct);
// delete specific product
router.delete("/:id", mustLogin, allowedRoles(["admin"]), deleteProduct);
// delete all products from "products" folder
router.delete(
  "/delete/all",
  mustLogin,
  allowedRoles(["admin"]),
  deleteAllProducts
);

module.exports = router;
