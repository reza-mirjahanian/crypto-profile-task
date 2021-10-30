import {
  Profile as profileModel
} from "../models/Profile";
import Logger from "../utils/logger";

export default class Profile {

  static async removeAll() {
    try {
      await profileModel.deleteMany();
      Logger.log("All Profiles is cleaned at: " + new Date());
      return true;
    } catch (e) {
      Logger.error("Repository:Profile:removeAll()");
      return false;
    }
  }

  static async getAll() {
    try {
      return profileModel.find().select('_id name email nickname capital divisa prefered_cryptocurrency').lean();
    } catch (e) {
      Logger.error("Repository:Profile:getAll()");
      throw Error(e.message);
    }
  }


  static async createUser(email, name, nickname) {
    try {
      let profile = await profileModel.findOne({
        $or: [{
          email
        }, {
          nickname
        }],
      }).lean();

      if (!profile) {
        profile = (await profileModel.create({
          name,
          email,
          nickname
        })).toObject();
      }
      return profile;

    } catch (e) {
      Logger.error("Repository:Profile:createUser()");
      throw Error(e.message);
    }
  }

  static async create({
    name,
    email,
    nickname,
    capital,
    divisa,
    prefered_cryptocurrency
  }) {
    try {
      return profileModel.create({
        name,
        email,
        nickname,
        capital,
        divisa,
        prefered_cryptocurrency
      });

    } catch (e) {
      Logger.error("Repository:Profile:create()");
      throw Error(e.message);
    }

  }

}