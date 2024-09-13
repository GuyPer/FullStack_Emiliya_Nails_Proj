const mongoose = require("mongoose");
const { imageSchema } = require("./common");

// define a mongoose schema:
// this describes the shape of one 'product' in our products collection.
const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: imageSchema,
    price: Number,
    bizNumber: Number,
    user_id: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    likes: [mongoose.SchemaTypes.ObjectId],
  },
  {
    timestamps: true,
  }
);

productSchema.statics.getNextBizNumber = async function () {
  try {
    // Find the highest current bizNumber in the product collection
    const highestBizNumberDoc = await this.findOne()
      .sort({ bizNumber: -1 })
      .exec();

    // If no product is found or if bizNumber is not defined, return 1 as the next bizNumber
    if (
      !highestBizNumberDoc ||
      typeof highestBizNumberDoc.bizNumber !== "number"
    ) {
      return 1;
    }
    // If a valid bizNumber is found, return the next bizNumber
    const nextBizNumber = highestBizNumberDoc.bizNumber + 1;
    return nextBizNumber;
  } catch (err) {
    console.error("Error in getNextBizNumber:", err);
    throw err;
  }
};

// compile the schema into a model.
// we will use this model to access our product collection.
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
