import {
  Favorite as favoriteModel
} from "../models/Favorite";
import Logger from "../utils/logger";

export default class Favorite {

  static async removeAll() {
    try {
      await favoriteModel.deleteMany();
      Logger.log("All Favorites is cleaned at: " + new Date());
      return true;
    } catch (e) {
      Logger.error("Repository:Favorite:removeAll()");
      return false;
    }
  }

  static async getAll() {
    try {
      return favoriteModel.find().select('favorites profile_id name createdAt updatedAt').lean();
    } catch (e) {
      Logger.error("Repository:Favorite:getAll()");
      throw Error(e.message);
    }
  }

  static async find({
    profile_id
  }) {

    try {
      return favoriteModel.find({
        profile_id
      }).select('favorites profile_id name createdAt updatedAt').lean();
    } catch (e) {
      Logger.error("Repository:Favorite:find()");
      throw Error(e.message);
    }
  }

  static async create({
    profile_id,
    name,
    favorites,
  }) {
    try {
      return favoriteModel.create({
        profile_id,
        name,
        favorites
      });

    } catch (e) {
      Logger.error("Repository:Favorite:create()");
      throw Error(e.message);
    }
  }



}