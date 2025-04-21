const mongoose = require("mongoose");

const designCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const DesignCategory = mongoose.model("DesignCategory", designCategorySchema);
module.exports = DesignCategory;