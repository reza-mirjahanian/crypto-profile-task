import mongoose from "mongoose";

const {
  Schema
} = mongoose;

const schema = new Schema({
  profile_id: {
    type: mongoose.Types.ObjectId,
    index: true
  },
  dateRecorded: Date,
  cryptocurrency: String,
  euros: Number,
  price: Number, //Use decimal
  quantity: Number,
  name: String,
  start_date: Date,
  check_date: Date,
  divisa: String,
  Crypto_price_start: Number,
  Crypto_price_check: Number,
}, {
  timestamps: true,
});

export const Simulator = mongoose.model("Simulator", schema);