const router = require("express").Router();
const uploadFile = require("../middleware/multer");
const { authMiddleware } = require("../middleware/authentication");
const joiMiddleWare = require("../middleware/joiMiddleware");
const {
  createSubCategorySchema,
  updateSubCategorySchema,
} = require("../validations/subCategoryValidation");
const {
  createSubCategory,
  getAllSubCategories,
  deleteSubCategory,
  getOneSubCategory,
  updateSubCategory,
} = require("../controllers/subCategoryController");

router
  .route("/")
  .post(
    authMiddleware,
    joiMiddleWare(createSubCategorySchema),
    createSubCategory
  )
  .get(getAllSubCategories);

router
  .route("/:id")
  .delete(authMiddleware, deleteSubCategory)
  .get(getOneSubCategory)
  .patch(
    authMiddleware,
    joiMiddleWare(updateSubCategorySchema),
    updateSubCategory
  );

module.exports = router;
