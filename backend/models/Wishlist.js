import mongoose from "mongoose";
const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    plantId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    collection: "Wishlist",
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
export default Wishlist;
