'use strict';

import mongoose from "mongoose";
import {
  DBURL,
  NODE_ENV,
  DB_NAME
} from "../config";
const NAME_SUFFIX = (NODE_ENV === 'test') ? '_test' : ''

class Database {
  private connection;

  async connect() {
    try {
      const DB_URL = `${DBURL}/${DB_NAME}${NAME_SUFFIX}`;
      this.connection = await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log(`Connected to DB: "${DB_URL}"`);

    } catch (e) {
      console.error(e.message);
    }
  }
  async disconnect() {
    try {
      await mongoose.disconnect();

    } catch (e) {
      console.error(e.message);
    }
  }

  generateObjectId() {
    return mongoose.Types.ObjectId();
  }

  isValidObjectId(objectId) {
    return mongoose.isValidObjectId(objectId);
  }

}

export default new Database();