import express from "express";
import Favorite from "../repository/Favorite";
import Logger from "../utils/logger";
import validateParams from '../middlewares/favorite/profile-id.validator';
export const router = express.Router();

router.get("/api/favorites", async (req, res) => {
  try {
    const favorite = await Favorite.getAll();
    res.json({
      favorite
    });

  } catch (err) {
    Logger.error(req.path);
    res.status(500).send({
      error: "Server Error"
    });
  }
});

router.get("/api/favorites/:profile_id", validateParams, async (req, res) => {
  try {
    const {
      profile_id
    } = req.params;

    const data = await Favorite.find({
      profile_id
    });
    res.json(data);

  } catch (err) {
    Logger.error(req.path);
    res.status(500).send({
      error: "Server Error"
    });
  }
});