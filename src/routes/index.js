const express = require("express");

const router = express.Router();

const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const productRouter = require("./productRoutes");
const cartRouter = require("./cartRoute");
const orderRouter = require("./orderRoute");
const categoryRouter = require("./categoryRoute");
const subCategoryRouter = require("./subCategoryRoute");
const designRouter = require("./designRoute");
const designCategoryRouter = require("./designCategoryRoute");
const wishlistRouter = require("./wishListRoute");
const designedProductRouter = require("./designedProductRoute");

const { authMiddleware } = require("../middleware/authentication");

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/sub-category", subCategoryRouter);
router.use("/products", productRouter);
router.use("/design", designRouter);
router.use("/design-category", designCategoryRouter);
router.use("/wishlist", wishlistRouter);
router.use("/cart", cartRouter);
router.use("/designed-product", designedProductRouter);
router.use(authMiddleware);
router.use("/user", userRouter);
router.use("/orders", orderRouter);

module.exports = router;
