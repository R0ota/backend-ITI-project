const router = require("express").Router();
const {
  getDesigns,
  getDesignById,
  createDesign,
  updateDesign,
  deleteDesign,
} = require("../controllers/designController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authentication");
const joiMiddleware = require("../middleware/joiMiddleware");
const {
  createDesignShcema,
  updateDesignShcema,
} = require("../validations/designValidation");
const uploadFile = require("../middleware/multer");

router
  .route("/")
  .get(getDesigns)
  .post(
    authMiddleware,
    adminMiddleware,
    uploadFile.single("image"),
    joiMiddleware(createDesignShcema),
    createDesign
  );

router
  .route("/:id")
  .get(getDesignById)
  .patch(
    authMiddleware,
    adminMiddleware,
    uploadFile.single("image"),
    joiMiddleware(updateDesignShcema),
    updateDesign
  )
  .delete(authMiddleware, adminMiddleware, deleteDesign);

module.exports = router;
