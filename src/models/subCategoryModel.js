const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    properties: [
      {
        name: String,
        property_type: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
