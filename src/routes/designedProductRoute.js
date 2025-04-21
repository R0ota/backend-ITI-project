const router = require("express").Router();
const { authMiddleware } = require("../middleware/authentication");
const {
  createDesignedProduct,
  getAllDesignedProducts,
  getDesignedProductById,
  updateDesignedProduct,
  deleteDesignedProduct,
} = require("../controllers/designedProdcutController");
const {
  createDesignedProductSchema,
  updateDesignedProductSchema,
} = require("../validations/designedProductValidation");
const joiValidationMiddleware = require("../middleware/joiMiddleware");

router
  .route("/")
  .post(
    authMiddleware,
    joiValidationMiddleware(createDesignedProductSchema),
    createDesignedProduct
  )
  .get(getAllDesignedProducts);
router
  .route("/:id")
  .get(getDesignedProductById)
  .patch(
    authMiddleware,
    joiValidationMiddleware(updateDesignedProductSchema),
    updateDesignedProduct
  )
  .delete(authMiddleware, deleteDesignedProduct);

module.exports = router;
