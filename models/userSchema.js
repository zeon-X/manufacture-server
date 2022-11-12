const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    profile_pic: {
      type: String,
    },
    education: {
      type: Array,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    address: {
      type: String,
    },
    socialLinks: [
      {
        key: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    review: [
      {
        rating: {
          type: Number,
        },
        text: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
