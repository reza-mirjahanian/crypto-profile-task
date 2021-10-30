import mongoose from "mongoose";

const {
  Schema
} = mongoose;

const schema = new Schema({
  name: String,
  nickname: {
    type: String,
    index: true,
    unique: true
  }, //assume like username is unique
  email: {
    type: String,
    index: true,
    unique: true
  },
  capital: Number, // use decimal
  divisa: String, // currency
  prefered_cryptocurrency: String, //maybe enum or list
});

export const Profile = mongoose.model("Profile", schema);