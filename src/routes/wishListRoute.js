const router = require("express").Router();
const uploadFile = require("../middleware/multer");
const { authMiddleware } = require("../middleware/authentication");
const {
  toggleItemToWishList,
  getWishList,
} = require("../controllers/wishlistController");

router.use(authMiddleware);

router.patch(
  "/:id",
  toggleItemToWishList
);
router.get("/", getWishList);

module.exports = router;