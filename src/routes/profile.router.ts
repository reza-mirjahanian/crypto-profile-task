import express from "express";
import Profile from "../repository/profile";
import validateParams from "../middlewares/profile/create-user.validator";

export const router = express.Router();

router.get("/api/profiles", async (req, res) => {
  const profile = await Profile.getAll();
  res.json({
    profile
  });
});

router.post("/api/profiles", validateParams, async (req, res) => {
  const {
    email,
    name,
    nickname
  } = req.body;
  const profile = await Profile.createUser(email, name, nickname);
  res.json(profile);
});