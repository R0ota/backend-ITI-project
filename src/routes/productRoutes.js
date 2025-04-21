const router = require("express").Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authentication");
const uploadFile = require("../middleware/multer");

const joiMiddleware = require("../middleware/joiMiddleware");
const {
  createProductShcema,
  updateProductShcema,
} = require("../validations/productValidation");

router
  .route("/")
  .get(getProducts)
  .post(
    authMiddleware,
    adminMiddleware,
    uploadFile.single("image"),
    joiMiddleware(createProductShcema),
    createProduct
  );

router
  .route("/:id")
  .get(getProductById)
  .patch(
    authMiddleware,
    adminMiddleware,
    uploadFile.single("image"),
    joiMiddleware(updateProductShcema),
    updateProduct
  )
  .delete(authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
