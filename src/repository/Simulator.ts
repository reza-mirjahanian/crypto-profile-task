import {
  Simulator as simulatorModel
} from "../models/Simulator";
import Logger from "../utils/logger";


export default class Simulator {

  static async removeAll() {
    try {
      await simulatorModel.deleteMany();
      Logger.log("All Simulators is cleaned at: " + new Date());
      return true;
    } catch (e) {
      Logger.error("Repository:Simulator:removeAll()");
      return false;
    }
  }

  static async getAll() {
    try {
      return simulatorModel.find().select('profile_id name start_date check_date cryptocurrency divisa Crypto_price_start Crypto_price_check dateRecorded euros price').lean();
    } catch (e) {
      Logger.error("Repository:Simulator:getAll()");
      throw Error(e.message);
    }

  }

  static async find({
    profile_id
  }) {
    try {
      return simulatorModel.find({
        profile_id
      }).lean();
    } catch (e) {
      Logger.error("Repository:Simulator:find()");
      throw Error(e.message);
    }
  }


  static async create({
    profile_id,
    name,
    start_date,
    check_date,
    cryptocurrency,
    divisa,
    Crypto_price_start,
    Crypto_price_check,
    dateRecorded,
    euros,
    price
  }) {
    try {
      return simulatorModel.create({
        profile_id,
        name,
        start_date,
        check_date,
        cryptocurrency,
        divisa,
        Crypto_price_start,
        Crypto_price_check,
        dateRecorded,
        euros,
        price
      });
    } catch (e) {
      Logger.error("Repository:Simulator:create()");
      throw Error(e.message);
    }

  }

}
