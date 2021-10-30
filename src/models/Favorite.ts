import mongoose from "mongoose";

const {
  Schema
} = mongoose;

const schema = new Schema({
  profile_id: {
    type: mongoose.Types.ObjectId,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  favorites: [String]
}, {
  timestamps: true,
});

export const Favorite = mongoose.model("Favorite", schema);