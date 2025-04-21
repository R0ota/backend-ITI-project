const router = require("express").Router();
const { authMiddleware } = require("../middleware/authentication");
const joiMiddleWare = require("../middleware/joiMiddleware");
const {
  createDesignCategorySchema,
  updateDesignCategorySchema,
} = require("../validations/designCategoryValidation");

const {
  createDesignCategory,
  getAllDesignCategories,
  deleteDesignCategory,
  getDesignCategoryById,
  updateDesignCategory,
} = require("../controllers/designCategoryController");

router
  .route("/")
  .post(
    authMiddleware,
    joiMiddleWare(createDesignCategorySchema),
    createDesignCategory
  )
  .get(getAllDesignCategories);

router
  .route("/:id")
  .delete(authMiddleware, deleteDesignCategory)
  .get(getDesignCategoryById)
  .patch(authMiddleware, joiMiddleWare(updateDesignCategorySchema), updateDesignCategory);

module.exports = router;
