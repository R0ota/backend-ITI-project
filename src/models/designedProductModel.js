const mongoos = require("mongoose");

const designedProductSchema = new mongoos.Schema(
  {
    product: { type: mongoos.Schema.Types.ObjectId, ref: "Product" },
    design: { type: mongoos.Schema.Types.ObjectId, ref: "Design" },
    price: { type: Number, required: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
    quantity: { type: Number, default: 1, min: 1 },
    properties: [
      {
        name: String,
        property_type: String,
        property_value: [String],
      },
    ],
  },
  { timestamps: true }
);

const DesignedProduct = mongoos.model("DesignedProduct", designedProductSchema);
module.exports = DesignedProduct;
