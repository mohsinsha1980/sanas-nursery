import mongoose from "mongoose";
import { HOME_FIELDS } from "../lib/constants.js";
const { Schema } = mongoose;

const fieldSchema = {
  small: { type: String, required: true },
  smallColor: { type: String, required: true },
  large: { type: String, required: true },
  largeColor: { type: String, required: true },
  link: {
    label: { type: String, required: true },
    address: { type: String, required: true },
    color: { type: String, required: true },
  },
  picture: { type: String, required: true },
};

const cards = {
  [HOME_FIELDS.CARDS.C1]: { type: fieldSchema, required: false },
  [HOME_FIELDS.CARDS.C2]: { type: fieldSchema, required: false },
};

const gallery = {
  [HOME_FIELDS.GALLERY.G1]: {
    type: String,
    required: true,
  },
  [HOME_FIELDS.GALLERY.G2]: {
    type: String,
    required: true,
  },
  [HOME_FIELDS.GALLERY.G3]: {
    type: String,
    required: true,
  },
};

const videos = {
  [HOME_FIELDS.VIDEOS.V1]: { type: String, required: true },
  [HOME_FIELDS.VIDEOS.V2]: { type: String, required: true },
};

const HomeSchema = new Schema(
  {
    greenChoices: [
      {
        type: Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],
    cards: {
      type: cards,
    },
    gallery: {
      type: gallery,
    },
    videos: {
      type: videos,
      required: false,
    },
  },

  {
    collection: "Home",
    timestamps: true,
  }
);

const Home = mongoose.model("Home", HomeSchema);

export default Home;
