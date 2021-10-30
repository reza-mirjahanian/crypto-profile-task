import express from "express";
import {
  SERVER_PORT,
  SERVER_URL,
  CORS_ORIGINS
} from "./config";

import cors from "cors";
import bodyParser from "body-parser";
import {
  router as favoriteRouter
} from "./routes/favorite.router";
import {
  router as profileRouter
} from "./routes/profile.router";
import {
  router as simulatorRouter
} from "./routes/simulator.router";
import DB from './models';
import Logger from "./utils/logger";

DB.connect().then(() => {
  Logger.log('DB Connected!');
});


const app = express();
app.use(cors({
  origin: CORS_ORIGINS
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(favoriteRouter);
app.use(profileRouter);
app.use(simulatorRouter);

app.listen(SERVER_PORT, () =>
  console.log(`✅  Ready on  ${SERVER_URL}:${SERVER_PORT}`)
);


//Caught other errors
process
    .on('unhandledRejection', (reason, p) => {
      console.error('Unhandled Rejection at Promise', {
        reason,
        p
      });
    })
    .on('uncaughtException', err => {
      console.error('Uncaught Exception thrown', {
        err
      });
    });
