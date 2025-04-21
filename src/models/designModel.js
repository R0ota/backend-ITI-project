const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    tags: [{ type: String }],
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "DesignCategory" },
  },
  { timestamps: true }
);

const Design = mongoose.model("Design", designSchema);
module.exports = Design;
