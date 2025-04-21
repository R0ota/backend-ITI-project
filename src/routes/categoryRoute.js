const router = require("express").Router();
const uploadFile = require("../middleware/multer");
const { authMiddleware } = require("../middleware/authentication");
const joiMiddleWare = require("../middleware/joiMiddleware");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validations/categoryValidation");

const {
  createCategory,
  getAllCategories,
  deleteCategory,
  getCategoryById,
  updateCategory,
} = require("../controllers/categoryController");

router
  .route("/")
  .post(
    authMiddleware,
    uploadFile.single("image"),
    joiMiddleWare(createCategorySchema),
    createCategory
  )
  .get(getAllCategories);

router
  .route("/:id")
  .delete(authMiddleware, deleteCategory)
  .get(getCategoryById)
  .patch(
    authMiddleware,
    uploadFile.single("image"),
    joiMiddleWare(updateCategorySchema),
    updateCategory
  );

module.exports = router;
